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
  url: string;
  prompt: string;
  extension: string;
  createdAt: string;
};

export type GetAlbumApiReturn = {
  albumMetadata: Album;
  avatars: AlbumAvatar[];
};
