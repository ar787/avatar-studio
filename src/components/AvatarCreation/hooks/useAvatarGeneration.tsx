import { useNavigate } from '@tanstack/react-router';
import { useNotification } from '@/hooks';
import type { AvatarStyle } from '@/types/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import {
  selectAvatarGenerationLoading,
  selectAvatarGenerationProgress,
  selectAvatarGenerationPreviews,
} from '@/store/avatarGeneration/avatarGenerationSelectors';
import {
  generationStarted,
  generationSucceeded,
  generationFailed,
} from '@/store/avatarGeneration/avatarGenerationSlice';
import { useGenerateAvatar } from '@/hooks/queries/avatars';

export function useAvatarGeneration() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const notify = useNotification();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const loading = useAppSelector(selectAvatarGenerationLoading);
  const progress = useAppSelector(selectAvatarGenerationProgress);
  const previews = useAppSelector(selectAvatarGenerationPreviews);
  const { generate } = useGenerateAvatar();

  async function onGenerate(value: string, style: AvatarStyle) {
    if (!isAuthenticated) {
      navigate({ to: '/sign-in', replace: true });
      return;
    }

    dispatch(generationStarted());
    notify.info('Generating avatar. This may take a moment...');

    try {
      const { data } = await generate({ prompt: value, style });
      dispatch(generationSucceeded(data?.generatedAvatarUrls ?? []));
      notify.success('Avatar generated successfully!');
    } catch (error) {
      let message = 'Something went wrong. Please try again later.';
      if (error instanceof Error && error.message === 'Insufficient credits.') {
        message = 'You have insufficient credits.';
      }
      notify.error(message);
      dispatch(generationFailed());
    }
  }

  return { loading, previews, progress, onGenerate };
}
