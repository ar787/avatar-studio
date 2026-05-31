import { useEffect, useRef, useState } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import { useNotification } from '@/hooks';
import { generateAvatar } from '@/services/api/avatar.api';
import type { AvatarStyle } from '@/types/avatar';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';

export function useAvatarGeneration() {
  const [loading, setLoading] = useState(false);
  const [previews, setPreviews] = useState<string[]>([]);
  const [progress, setProgress] = useState(0);

  const notify = useNotification();
  const navigate = useNavigate();
  const router = useRouter();

  const dispatch = useAppDispatch();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);

  const cleanupTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  async function onGenerate(value: string, style: AvatarStyle) {
    if (!isAuthenticated) {
      navigate({ to: '/sign-in', replace: true });
      return;
    }

    if (cleanupTimeoutRef.current) {
      clearTimeout(cleanupTimeoutRef.current);
    }

    setProgress(3);
    setLoading(true);

    try {
      notify.info('Generating avatar. This may take a moment...');
      const { data } = await generateAvatar(value, style);
      router.invalidate();
      setProgress(100);
      setPreviews((prev) => [...prev, ...(data?.generatedAvatarUrls ?? [])]);
      dispatch(setProfile({ credits: data?.remainingCredits ?? 0 }));
      notify.success('Avatar generated successfully!');
    } catch (error) {
      if (error instanceof Error) {
        let message = 'Something went wrong. Please try again later.';

        if (error.message === 'Insufficient credits.') {
          message = 'You have insufficient credits.';
        }
        notify.error(message);
      }
    } finally {
      cleanupTimeoutRef.current = setTimeout(() => {
        setProgress(0);
      }, 1000);
      setLoading(false);
    }
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => prev + (90 - prev) * 0.1); // Slows down as it nears 90
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading, progress]);

  useEffect(() => {
    return () => {
      if (cleanupTimeoutRef.current) {
        clearTimeout(cleanupTimeoutRef.current);
      }
    };
  }, []);

  return { loading, previews, progress, onGenerate };
}
