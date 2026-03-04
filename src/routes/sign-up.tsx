import { createFileRoute, redirect } from '@tanstack/react-router';
import SignUp from '../pages/SignUpPage';

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
  beforeLoad: ({ context }) => {
    if (context.auth.isInitialLoading) {
      return;
    }

    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/' });
    }
  },
});
