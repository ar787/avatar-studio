import { FirebaseError } from 'firebase/app';

export type AuthFormErrors = {
  email?: string;
  password?: string;
};

export function mapFirebaseAuthError(error: unknown): AuthFormErrors | null {
  if (!(error instanceof FirebaseError)) return null;

  switch (error.code) {
    case 'auth/weak-password':
      return {
        password: 'Password must be at least 6 characters.',
      };
    case 'auth/email-already-in-use':
      return {
        email: 'This email is already registered.',
      };
    case 'auth/invalid-email':
      return {
        email: 'The email address is badly formatted.',
      };
    case 'auth/wrong-password':
      return {
        password: 'Invalid email or password',
      };
    case 'auth/user-not-found':
      return {
        email: 'Invalid email or password',
      };
    default:
      return null;
  }
}
