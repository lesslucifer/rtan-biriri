import { useState, useEffect } from 'react';
import type { User } from 'firebase/auth';
import { authService } from '../services/authService';

interface UseAuthReturn {
  user: User | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<User>;
  signUpWithEmail: (email: string, password: string, displayName?: string) => Promise<User>;
  signInWithGoogle: () => Promise<User>;
  signInWithGitHub: () => Promise<User>;
  resetPassword: (email: string) => Promise<void>;
  updateUserProfile: (displayName?: string, photoURL?: string) => Promise<void>;
  changePassword: (currentPassword: string, newPassword: string) => Promise<void>;
  signOut: () => Promise<void>;
}

export function useAuth(): UseAuthReturn {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = authService.onAuthStateChange((currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const signInWithEmail = async (email: string, password: string): Promise<User> => {
    return authService.signInWithEmail(email, password);
  };

  const signUpWithEmail = async (email: string, password: string, displayName?: string): Promise<User> => {
    return authService.signUpWithEmail(email, password, displayName);
  };

  const signInWithGoogle = async (): Promise<User> => {
    return authService.signInWithGoogle();
  };

  const signInWithGitHub = async (): Promise<User> => {
    return authService.signInWithGitHub();
  };

  const resetPassword = async (email: string): Promise<void> => {
    return authService.resetPassword(email);
  };

  const updateUserProfile = async (displayName?: string, photoURL?: string): Promise<void> => {
    return authService.updateUserProfile(displayName, photoURL);
  };

  const changePassword = async (currentPassword: string, newPassword: string): Promise<void> => {
    return authService.changePassword(currentPassword, newPassword);
  };

  const signOut = async (): Promise<void> => {
    return authService.signOut();
  };

  return {
    user,
    loading,
    signInWithEmail,
    signUpWithEmail,
    signInWithGoogle,
    signInWithGitHub,
    resetPassword,
    updateUserProfile,
    changePassword,
    signOut
  };
}