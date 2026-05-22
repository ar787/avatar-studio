import type { Album, GetAlbumApiReturn } from '@/types/album';
import { tokenManager } from '@/utils/tokenManager';

export const getAlbums = async () => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/albums', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to fetch albums');
  }
  const result = await response.json();
  return result.data;
};

export const createAlbum = async (name: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/albums', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to create album');
  }
  const result = await response.json();
  return result.data as Album;
};

export const getAlbum = async (id: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch(`/api/albums/${id}`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Failed to fetch album');
  }

  const result = await response.json();
  return result.data as GetAlbumApiReturn;
};

export const updateAlbum = async (id: string, name: string): Promise<Album> => {
  const token = await tokenManager.getToken();
  const response = await fetch(`/api/albums/${id}`, {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to rename album');
  }
  const result = await response.json();
  return result.data as Album;
};

export const deleteAlbum = async (id: string): Promise<void> => {
  const token = await tokenManager.getToken();
  const response = await fetch(`/api/albums/${id}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to delete album');
  }
};

export const deleteAvatarFromAlbum = async (
  id: string,
  avatarId: string,
): Promise<{ success: boolean; message: string }> => {
  const token = await tokenManager.getToken();
  const response = await fetch(`/api/albums/${id}/avatars/${avatarId}`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to delete album');
  }
  const result = await response.json();
  return result;
};

export const addToAlbum = async (id: string, avatarId: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch(`/api/albums/${id}/avatars`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      avatarId,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error?.message || 'Failed to add avatar to album');
  }

  const result = await response.json();
  return result.data;
};
