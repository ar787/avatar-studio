import { createFileRoute, redirect } from '@tanstack/react-router';

import AlbumPage from '@/pages/AlbumPage';

export const Route = createFileRoute('/_layout/albums/$albumId')({
  component: AlbumPage,
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
