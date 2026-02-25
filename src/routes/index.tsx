import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../pages/HomePage';
import LoadingPage from '../pages/LoadingPage';

export const Route = createFileRoute('/')({
  component: HomePage,
  pendingComponent: LoadingPage,
});
