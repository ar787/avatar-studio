import type { User, UserCredential } from 'firebase/auth';

export type AuthState = {
  currentUser: User | null;
  isAuthenticated: boolean;
  isInitialLoading: boolean;
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
};
