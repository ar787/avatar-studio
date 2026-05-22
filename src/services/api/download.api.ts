import { tokenManager } from '@/utils/tokenManager';

export const getAvatarDownloadBlob = async (path: string) => {
  const response = await fetch(`/api/avatars/download/${path}.jpeg`);

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message ?? 'Download failed');
  }

  const result = await response.blob();
  return result;
};

export const downloadAvatarFromAlbum = async (
  albumId: string,
  avatarDocId: string,
): Promise<Blob> => {
  const token = await tokenManager.getToken();
  const response = await fetch(
    `/api/albums/${albumId}/avatars/${avatarDocId}/download`,
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

  return response.blob();
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
