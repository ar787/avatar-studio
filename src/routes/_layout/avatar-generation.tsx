import { createFileRoute, redirect } from '@tanstack/react-router';
import AvatarGenerationPage from '../../pages/AvatarGenerationPage';
import { getGeneratedAvatars } from '../../services/api';
import LoadingPage from '../../pages/LoadingPage';

export const Route = createFileRoute('/_layout/avatar-generation')({
  component: AvatarGenerationPage,
  pendingComponent: LoadingPage,
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
  loaderDeps: ({ search }) => ({ userId: search.userId }),
  loader: () => getGeneratedAvatars(),
});
