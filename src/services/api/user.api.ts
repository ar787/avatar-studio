import { tokenManager } from '@/utils/tokenManager';

export const getUserProfile = async () => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/user/getUserProfile', {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await response.json();
  return result.data;
};

export const updateProfile = async (displayName: string) => {
  const token = await tokenManager.getToken();
  const response = await fetch('api/user/updateProfile', {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      displayName,
    }),
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to update profile');
  }

  return result.data;
};

export const updateProfilePicture = async (
  file: File,
): Promise<{ status: boolean; message: string; picture: string }> => {
  const token = await tokenManager.getToken();
  const formData = new FormData();
  formData.append('picture', file);
  const response = await fetch('api/user/profile/image', {
    method: 'PATCH',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  const result = await response.json();

  if (!response.ok) {
    throw new Error(result.message || 'Failed to upload picture');
  }

  return result;
};
