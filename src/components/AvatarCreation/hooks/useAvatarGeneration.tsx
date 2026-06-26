import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { useNotification } from '@/hooks';
import type { AvatarStyle } from '@/types/avatar';
import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { useGenerateAvatar } from '@/hooks/queries/avatars';
import { useProgress } from './useProgress';

export function useAvatarGeneration() {
  const [previews, setPreviews] = useState<string[]>([]);
  const navigate = useNavigate();
  const { progress, start, complete, fail } = useProgress();
  const notify = useNotification();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const { generate, isPending: loading } = useGenerateAvatar();

  async function onGenerate(value: string, style: AvatarStyle) {
    if (!isAuthenticated) {
      navigate({ to: '/sign-in', replace: true });
      return;
    }

    start();
    notify.info('Generating avatar. This may take a moment...');

    try {
      const { data } = await generate({ prompt: value, style });
      setPreviews((prev) => [...prev, ...(data?.generatedAvatarUrls ?? [])]);
      complete();
      notify.success('Avatar generated successfully!');
    } catch (error) {
      let message = 'Something went wrong. Please try again later.';
      if (error instanceof Error && error.message === 'Insufficient credits.') {
        message = 'You have insufficient credits.';
      }
      notify.error(message);
      fail();
    }
  }

  return { loading, previews, progress, onGenerate };
}
