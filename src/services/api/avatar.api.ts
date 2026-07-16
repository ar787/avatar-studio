import type {
  AdjustState,
  AvatarStyle,
  AvatarType,
  GeneratedAvatarType,
  PresetType,
} from '@/types/avatar';
import { tokenManager } from '@/utils/tokenManager';

export const saveEditedAvatar = async ({
  blob,
  originalName,
  albumId,
  avatarId,
  adjustments,
  preset,
}: {
  blob: Blob;
  originalName: string;
  albumId: string;
  avatarId: string;
  adjustments: AdjustState;
  preset: PresetType | null;
}): Promise<{ avatar: GeneratedAvatarType; remainingCredits: number }> => {
  const token = await tokenManager.getToken();
  const formData = new FormData();
  formData.append('file', blob, `${originalName}-edited.png`);
  formData.append('originalName', originalName);
  formData.append('albumId', albumId);
  formData.append('avatarId', avatarId);
  formData.append('adjustments', JSON.stringify(adjustments));
  formData.append('preset', preset ?? '');
  const response = await fetch('/api/v1/avatars/save-edited', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    const error = text ? JSON.parse(text) : {};
    throw new Error(error.message ?? 'Failed to save edited avatar.');
  }

  const result = await response.json();
  return result.data as {
    avatar: GeneratedAvatarType;
    remainingCredits: number;
  };
};

export const getAvatars = async () => {
  const response = await fetch('/api/v1/avatars');
  const result = await response.json();

  return result.data as AvatarType[];
};

export const getGeneratedAvatars = async () => {
  const token = await tokenManager.getToken();

  const response = await fetch('/api/v1/avatars/library', {
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
  const response = await fetch('/api/v1/avatars', {
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
