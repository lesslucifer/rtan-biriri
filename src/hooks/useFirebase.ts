import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCallback, useEffect, useMemo } from 'react';
import { createFirebaseService } from '../services/firebaseService';
import { onSnapshot, collection, query, QueryConstraint } from 'firebase/firestore';
import { db } from '../config/firebase';
import type { DocumentData } from 'firebase/firestore';

export interface UseFirebaseRealtimeOptions {
  collectionName: string;
  constraints?: QueryConstraint[];
  enabled?: boolean;
  realTime?: boolean;
}

export interface UseFirebaseRealtimeReturn<T extends DocumentData> {
  data: T[];
  firstData?: T;
  isLoading: boolean;
  isError: boolean;
  error: Error | null;
  create: (data: Omit<T, 'id'>) => Promise<string>;
  createWithId: (id: string, data: Omit<T, 'id'>) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  upsert: (data: Partial<T>, defaultValue: T) => Promise<string>
  delete: (id: string) => Promise<void>;
  refetch: () => void;
}

export function useFirebase<T extends DocumentData = DocumentData>({
  collectionName,
  constraints = [],
  enabled = true,
}: UseFirebaseRealtimeOptions): UseFirebaseRealtimeReturn<T> {
  const queryClient = useQueryClient();
  const service = createFirebaseService(collectionName);

  const queryKey = useMemo(() =>
    ['firebase', collectionName, JSON.stringify(constraints)],
    [collectionName, constraints]
  );

  useEffect(() => {
    if (!enabled) return;

    const q = constraints.length > 0
      ? query(collection(db, collectionName), ...constraints)
      : collection(db, collectionName);

    const unsubscribe = onSnapshot(q, (snapshot) => {
        const data = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        } as unknown as T));
        queryClient.setQueryData(queryKey, data);
      },
      (error) => {
        console.error('Realtime listener error:', error);
      }
    );

    return () => unsubscribe();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [collectionName]);

  const { data, isLoading, isError, error, refetch } = useQuery<T[]>({
    queryKey,
    queryFn: async () => {
      const result = await service.getAll(constraints);
      return result as T[];
    },
    enabled: enabled,
    staleTime: Infinity,
    initialData: [],
    retry: 3,
  });

  const createMutation = useMutation<string, Error, Omit<T, 'id'>>({
    mutationFn: async (newData) => {
      return await service.create(newData);
    },
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<T[]>(queryKey);

      queryClient.setQueryData<T[]>(queryKey, (old) => [
        ...(old || []),
        { ...newData, id: 'temp-id' } as unknown as T,
      ]);

      return { previousData };
    },
    //@ts-expect-error: The context shouldn't be unknown
    onError: (_err, _newData, context: { previousData?: T[] }) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    }
  });

  const createWithIdMutation = useMutation<string, Error, { id: string; data: Omit<T, 'id'> }>({
    mutationFn: async ({ id, data }) => {
      return await service.createWithId(id, data);
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<T[]>(queryKey);

      queryClient.setQueryData<T[]>(queryKey, (old) => [
        ...(old || []),
        { ...data, id } as unknown as T,
      ]);

      return { previousData };
    },
    //@ts-expect-error: The context shouldn't be unknown
    onError: (_err, _variables, context: { previousData?: T[] }) => {
      if (context?.previousData) {
        queryClient.setQueryData(queryKey, context.previousData);
      }
    }
  });

  const updateMutation = useMutation<void, Error, { id: string; data: Partial<T> }>({
    mutationFn: async ({ id, data }) => {
      await service.update(id, data);
    },
    onMutate: async ({ id, data }) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<T[]>(queryKey);

      queryClient.setQueryData<T[]>(queryKey, (old) =>
        (old || []).map((item) =>
          (item as { id?: string }).id === id ? { ...item, ...data } : item
        )
      );

      return { previousData };
    }
  });

  const deleteMutation = useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await service.delete(id);
    },
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey });
      const previousData = queryClient.getQueryData<T[]>(queryKey);

      queryClient.setQueryData<T[]>(queryKey, (old) =>
        (old || []).filter((item) => (item as { id?: string }).id !== id)
      );

      return { previousData };
    }
  });

  const updateMutateAsync = updateMutation.mutateAsync
  const createMutateAsync = createMutation.mutateAsync
  const createWithIdMutateAsync = createWithIdMutation.mutateAsync

  const update = useCallback((id: string, data: Partial<T>) => updateMutateAsync({ id, data }), [updateMutateAsync])
  const createWithId = useCallback((id: string, data: Omit<T, 'id'>) => createWithIdMutateAsync({ id, data }), [createWithIdMutateAsync])
  const upsert = useCallback(async (data: Partial<T>, defaultValue: T) => {
    if (data.id) {
      await updateMutateAsync({ id: data.id, data })
      return data.id
    }
    else {
      return await createMutateAsync({
        ...defaultValue,
        ...data
      })
    }
  }, [createMutateAsync, updateMutateAsync])

  return {
    data,
    firstData: data?.length > 0 ? data[0] : undefined,
    isLoading,
    isError,
    error,
    create: createMutation.mutateAsync,
    createWithId,
    update,
    upsert,
    delete: deleteMutation.mutateAsync,
    refetch,
  };
}