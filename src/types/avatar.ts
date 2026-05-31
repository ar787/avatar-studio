import type { Timestamp } from 'firebase/firestore';

export type AvatarStyle =
  | 'anime'
  | 'simpsons'
  | 'soviet'
  | 'oilPainting'
  | 'none';

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
