import { createFileRoute } from '@tanstack/react-router';
import GenerateAvatarPage from '@/pages/GenerateAvatarPage';

export const Route = createFileRoute('/_layout/generate')({
  component: GenerateAvatarPage,
});
