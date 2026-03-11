import { createFileRoute } from '@tanstack/react-router';
import HomePage from '../../pages/HomePage';
import LoadingPage from '../../pages/LoadingPage';

export const Route = createFileRoute('/_layout/')({
  component: HomePage,
  pendingComponent: LoadingPage,
});
