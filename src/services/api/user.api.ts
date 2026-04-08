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
