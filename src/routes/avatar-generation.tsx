import { createFileRoute } from '@tanstack/react-router';
import AvatarGenerationPage from '../pages/AvatarGenerationPage';

export const Route = createFileRoute('/avatar-generation')({
  component: AvatarGenerationPage,
});
