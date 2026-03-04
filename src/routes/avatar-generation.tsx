import { createFileRoute, redirect } from '@tanstack/react-router';
import AvatarGenerationPage from '../pages/AvatarGenerationPage';

export const Route = createFileRoute('/avatar-generation')({
  component: AvatarGenerationPage,
  beforeLoad: ({ context, location }) => {
    if (context.auth.isInitialLoading) {
      return;
    }

    if (!context.auth.isAuthenticated) {
      throw redirect({
        to: '/sign-up',
        search: {
          redirect: location.href,
        },
      });
    }
  },
});
