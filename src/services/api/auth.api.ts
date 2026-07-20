import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import { auth, providers } from '../firebase';
import { tokenManager } from '@/utils/tokenManager';

export const signUpUser = async (email: string, password: string) => {
  const userCredential = await createUserWithEmailAndPassword(
    auth,
    email,
    password,
  );
  return userCredential;
};

export const signInUser = async (email: string, password: string) => {
  const userCredential = signInWithEmailAndPassword(auth, email, password);
  return userCredential;
};

export const signOutUser = async () => {
  await signOut(auth);
};

export const signInByGoogleAccount = () => {
  return signInWithPopup(auth, providers.google);
};

export const createUserDocument = async () => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/v1/auth', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};
