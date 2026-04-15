import { tokenManager } from '@/utils/tokenManager';

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
