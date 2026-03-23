import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';

import type { AvatarType, GeneratedAvatarType } from '../types/avatar';
import { auth } from './firebase';
import { tokenManager } from '../utils/tokenManager';

export const getAvatars = async () => {
  const response = await fetch('/api/avatars');
  const result = await response.json();

  return result.data as AvatarType[];
};

export const getGeneratedAvatars = async () => {
  const token = await tokenManager.getToken();

  const response = await fetch('/api/avatars/generated-avatars', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();

  return result.data as GeneratedAvatarType[];
};

export const getAvatarDownloadBlob = async (path: string) => {
  const response = await fetch(`/api/avatars/download/${path}.jpeg`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? 'Download failed');
  }

  const result = await response.blob();
  return result;
};

export const generateAvatar = async (prompt: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/avatars/generate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};

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

export const createUserDocument = async () => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/auth/createUserDocument', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await response.json();
};

export const downloadAvatarFromLibrary = async (fileName: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch(
    `/api/avatars/download-from-library/${fileName}`,
    {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? 'Download failed');
  }

  const result = await response.blob();
  return result;
};

export const getUserProfile = async () => {
  const token = await tokenManager.getToken();
  const response = await fetch('api/user/getUserProfile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result;
};
