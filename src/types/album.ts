import type { AdjustState, PresetType } from './avatar';

export type Album = {
  id: string;
  userId: string;
  name: string;
  description?: string;
  coverImageUrl?: string;
  avatarCount: number;
  createdAt: Date;
  updatedAt: Date;
};

export type AlbumAvatar = {
  id: string;
  avatarId: string;
  url: string;
  prompt: string;
  extension: string;
  createdAt: string;
  adjustments?: AdjustState;
  preset?: PresetType | null;
};

export type GetAlbumApiReturn = {
  albumMetadata: Album;
  avatars: AlbumAvatar[];
};
