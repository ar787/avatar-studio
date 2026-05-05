import type { UserCredential } from 'firebase/auth';
import type { UserProfile } from './userProfile';

export type AuthState = {
  setProfile: (newData: Partial<UserProfile>) => void;
  logOut: () => Promise<void>;
  signIn: (email: string, password: string) => Promise<UserCredential>;
  signUp: (email: string, password: string) => Promise<UserCredential>;
  signInWithGoogle: () => Promise<UserCredential>;
};
