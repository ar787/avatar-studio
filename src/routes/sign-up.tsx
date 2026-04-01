import { createFileRoute, redirect } from '@tanstack/react-router';
import SignUpPage from '../pages/SignUpPage';

export const Route = createFileRoute('/sign-up')({
  component: SignUpPage,
  beforeLoad: ({ context }) => {
    if (context.auth.isInitialLoading) {
      return;
    }

    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});
