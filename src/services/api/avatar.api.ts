import type {
  AvatarStyle,
  AvatarType,
  GeneratedAvatarType,
} from '@/types/avatar';
import { tokenManager } from '@/utils/tokenManager';

export const getAvatars = async () => {
  const response = await fetch('/api/avatars');
  const result = await response.json();

  return result.data as AvatarType[];
};

export const getGeneratedAvatars = async () => {
  const token = await tokenManager.getToken();

  const response = await fetch('/api/avatars/generated-avatars', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      'Failed to fetch generated avatars. Please try again later.',
    );
  }

  const result = await response.json();

  return result.data as GeneratedAvatarType[];
};

export const generateAvatar = async (prompt: string, style: AvatarStyle) => {
  const token = await tokenManager.getToken();
  const response = await fetch('/api/avatars/generate', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ prompt, style }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message);
  }

  return await response.json();
};
