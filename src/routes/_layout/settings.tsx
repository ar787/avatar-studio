import { createFileRoute, redirect } from '@tanstack/react-router';
import SettingsPage from '@/pages/SettingsPage';
import LoadingPage from '@/pages/LoadingPage';

export const Route = createFileRoute('/_layout/settings')({
  component: SettingsPage,
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
});
