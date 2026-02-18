import type { AvatarType } from '../types/avatar';

export const getAvatars = async () => {
  const response = await fetch('/api/avatars');
  const result = await response.json();

  return result.data as AvatarType;
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
