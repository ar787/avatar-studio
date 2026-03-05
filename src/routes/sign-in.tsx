import { createFileRoute, redirect } from '@tanstack/react-router';
import SignInPage from '../pages/SignInPage';

export const Route = createFileRoute('/sign-in')({
  component: SignInPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isInitialLoading) {
      return;
    }

    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});
