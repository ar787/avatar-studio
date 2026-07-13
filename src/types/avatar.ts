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

export type AdjustState = {
  brightness: number;
  contrast: number;
  saturation: number;
  hueRotation: number;
  vibrance: number;
  blur: number;
};

export type PresetType =
  | 'grayscale'
  | 'sepia'
  | 'vintage'
  | 'kodachrome'
  | 'brownie'
  | 'polaroid'
  | 'blackwhite'
  | 'invert';

export type GeneratedAvatarType = {
  id: string;
  url: string;
  name: string;
  prompt: string;
  extension: 'png';
  createdAt: Date;
  adjustments?: AdjustState;
  preset?: PresetType | null;
};
