import { createContext } from 'react';
import type { AuthState } from '@/types/auth';

export const AuthContext = createContext<AuthState>({
  currentUser: null,
  currentUserProfile: null,
  isAuthenticated: false,
  isInitialLoading: true,
  setProfileData: () => {
    throw new Error('setProfileData must be used within an AuthProvider');
  },
  logOut: () => {
    throw new Error('logOut must be used within an AuthProvider');
  },
  signIn: () => {
    throw new Error('signIn must be used within an AuthProvider');
  },
  signUp: () => {
    throw new Error('signUp must be used within an AuthProvider');
  },
});
