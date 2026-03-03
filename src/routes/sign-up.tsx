import { createFileRoute } from '@tanstack/react-router';
import SignUp from '../pages/SignUpPage';

export const Route = createFileRoute('/sign-up')({
  component: SignUp,
});
