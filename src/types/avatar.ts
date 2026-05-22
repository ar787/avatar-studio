import type { Timestamp } from 'firebase/firestore';

type FirebaseStorageUrl = `https://firebasestorage.googleapis.com${string}`;

export type AvatarType = {
  categories?: string;
  createdAt: Timestamp;
  imageUrl: FirebaseStorageUrl;
  name: string;
};

export type GeneratedAvatarType = {
  id: string;
  url: string;
  name: string;
  prompt: string;
  extension: 'png';
  createdAt: Date;
};
