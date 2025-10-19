import { auth } from '../config/firebase';
import type { User } from 'firebase/auth';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  sendPasswordResetEmail,
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider
} from 'firebase/auth';

export interface AuthUser extends User {
  role?: string;
}

export class AuthService {
  private static instance: AuthService;

  static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  async signInWithEmail(email: string, password: string): Promise<User> {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in with email:', error);
      throw error;
    }
  }

  async signUpWithEmail(email: string, password: string, displayName?: string): Promise<User> {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      if (displayName) {
        await updateProfile(userCredential.user, { displayName });
      }

      return userCredential.user;
    } catch (error) {
      console.error('Error signing up with email:', error);
      throw error;
    }
  }

  async signInWithGoogle(): Promise<User> {
    try {
      const provider = new GoogleAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in with Google:', error);
      throw error;
    }
  }

  async signInWithGitHub(): Promise<User> {
    try {
      const provider = new GithubAuthProvider();
      const userCredential = await signInWithPopup(auth, provider);
      return userCredential.user;
    } catch (error) {
      console.error('Error signing in with GitHub:', error);
      throw error;
    }
  }

  async resetPassword(email: string): Promise<void> {
    try {
      await sendPasswordResetEmail(auth, email);
    } catch (error) {
      console.error('Error sending password reset email:', error);
      throw error;
    }
  }

  async updateUserProfile(displayName?: string, photoURL?: string): Promise<void> {
    try {
      if (!auth.currentUser) {
        throw new Error('No user is currently signed in');
      }

      await updateProfile(auth.currentUser, {
        ...(displayName && { displayName }),
        ...(photoURL && { photoURL })
      });
    } catch (error) {
      console.error('Error updating user profile:', error);
      throw error;
    }
  }

  async changePassword(currentPassword: string, newPassword: string): Promise<void> {
    try {
      if (!auth.currentUser || !auth.currentUser.email) {
        throw new Error('No user is currently signed in');
      }

      const credential = EmailAuthProvider.credential(auth.currentUser.email, currentPassword);
      await reauthenticateWithCredential(auth.currentUser, credential);
      await updatePassword(auth.currentUser, newPassword);
    } catch (error) {
      console.error('Error changing password:', error);
      throw error;
    }
  }

  async signOut(): Promise<void> {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Error signing out:', error);
      throw error;
    }
  }

  getCurrentUser(): User | null {
    return auth.currentUser;
  }

  onAuthStateChange(callback: (user: User | null) => void): () => void {
    return onAuthStateChanged(auth, callback);
  }
}

export const authService = AuthService.getInstance();