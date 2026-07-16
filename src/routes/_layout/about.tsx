import { createFileRoute } from '@tanstack/react-router';
import AboutPage from '@/pages/AboutPage';
import LoadingPage from '@/pages/LoadingPage';

export const Route = createFileRoute('/_layout/about')({
  component: AboutPage,
  pendingComponent: LoadingPage,
});
