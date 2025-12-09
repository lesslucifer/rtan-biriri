import { db } from '../config/firebase';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  setDoc,
  query,
  where,
  Timestamp,
  type DocumentData,
  type QueryConstraint,
  type WhereFilterOp
} from 'firebase/firestore';

export interface FirestoreDocument {
  id?: string;
  createdAt?: Timestamp;
  updatedAt?: Timestamp;
}

export class FirebaseService {
  private collectionName: string;

  constructor(collectionName: string) {
    this.collectionName = collectionName;
  }

  async create(data: Omit<DocumentData, 'id'>): Promise<string> {
    try {
      const docRef = await addDoc(collection(db, this.collectionName), {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return docRef.id;
    } catch (error) {
      console.error('Error creating document:', error);
      throw error;
    }
  }

  async createWithId(id: string, data: Omit<DocumentData, 'id'>): Promise<string> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await setDoc(docRef, {
        ...data,
        createdAt: Timestamp.now(),
        updatedAt: Timestamp.now()
      });
      return id;
    } catch (error) {
      console.error('Error creating document with ID:', error);
      throw error;
    }
  }

  async getById(id: string): Promise<DocumentData | null> {
    try {
      const docRef = doc(db, this.collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() };
      }
      return null;
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }

  async getAll(constraints: QueryConstraint[] = []): Promise<DocumentData[]> {
    try {
      const q = query(collection(db, this.collectionName), ...constraints);
      const querySnapshot = await getDocs(q);

      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  async update(id: string, data: Partial<DocumentData>): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await updateDoc(docRef, {
        ...data,
        updatedAt: Timestamp.now()
      });
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const docRef = doc(db, this.collectionName, id);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }

  async query(conditions: { field: string; operator: WhereFilterOp; value: unknown }[]): Promise<DocumentData[]> {
    try {
      const constraints = conditions.map(condition =>
        where(condition.field, condition.operator, condition.value)
      );

      return this.getAll(constraints);
    } catch (error) {
      console.error('Error querying documents:', error);
      throw error;
    }
  }
}

const FBServices = new Map<string, FirebaseService>()

export const createFirebaseService = (collectionName: string): FirebaseService => {
  if (!FBServices.has(collectionName)) {
    FBServices.set(collectionName, new FirebaseService(collectionName));
  }

  return FBServices.get(collectionName)!;
};