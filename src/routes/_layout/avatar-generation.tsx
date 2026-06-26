import { createFileRoute, redirect } from '@tanstack/react-router';
import AvatarGenerationPage from '@/pages/AvatarGenerationPage';

export const Route = createFileRoute('/_layout/avatar-generation')({
  component: AvatarGenerationPage,
  beforeLoad: ({ context, location }) => {
    if (context.auth.isInitialLoading) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/sign-in',
        search: {
          redirect: location.href,
        },
      });
    }
  },
  validateSearch: (search: Record<string, unknown>) => {
    return {
      userId: typeof search.userId === 'string' ? search.userId : undefined,
    };
  },
});
