export { db, auth } from '../config/firebase';
export { FirebaseService, createFirebaseService } from '../services/firebaseService';
export { authService } from '../services/authService';
export { useFirebase } from '../hooks/useFirebase';
export { useAuth } from '../hooks/useAuth';
export type { FirestoreDocument } from '../services/firebaseService';
export type { AuthUser } from '../services/authService';