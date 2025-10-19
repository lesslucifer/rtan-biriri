import { useState, useEffect, useCallback } from 'react';
import { createFirebaseService } from '../services/firebaseService';
import type { DocumentData, QueryConstraint } from 'firebase/firestore';

interface UseFirebaseOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  realTime?: boolean;
}

interface UseFirebaseReturn<T extends DocumentData> {
  data: T[];
  loading: boolean;
  error: string | null;
  create: (data: Omit<T, 'id'>) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  delete: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useFirebase<T extends DocumentData = DocumentData>({
  collectionName,
  constraints = []
}: UseFirebaseOptions): UseFirebaseReturn<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const service = createFirebaseService(collectionName);

  const fetchData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await service.getAll(constraints);
      setData(result as T[]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  }, [service, constraints]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const create = async (newData: Omit<T, 'id'>): Promise<string> => {
    try {
      const id = await service.create(newData);
      await fetchData();
      return id;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create document');
      throw err;
    }
  };

  const update = async (id: string, updatedData: Partial<T>): Promise<void> => {
    try {
      await service.update(id, updatedData);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update document');
      throw err;
    }
  };

  const deleteDoc = async (id: string): Promise<void> => {
    try {
      await service.delete(id);
      await fetchData();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete document');
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    create,
    update,
    delete: deleteDoc,
    refresh: fetchData
  };
}