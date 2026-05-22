import { createFileRoute, redirect } from '@tanstack/react-router';
import AlbumsPage from '@/pages/AlbumsPage';

export const Route = createFileRoute('/_layout/albums/')({
  component: AlbumsPage,
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
});
