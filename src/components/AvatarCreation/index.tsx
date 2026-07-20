import { useState } from 'react';

import { useAppSelector } from '@/store/hooks';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';

import { AvatarCreationDialog } from './AvatarCreationDialog';
import { useAvatarGeneration } from './hooks/useAvatarGeneration';
import { AvatarCreationButton } from './AvatarCreationButton';

type AvatarCreationProps = Readonly<{ compact?: boolean; active?: boolean }>;

export default function AvatarCreation({
  compact = false,
  active = false,
}: AvatarCreationProps) {
  const [open, setOpen] = useState(false);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);
  const { loading, progress, previews, onGenerate } = useAvatarGeneration();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const hasCredits = (profile && profile.credits > 0) ?? false;

  return (
    <>
      <AvatarCreationButton
        text={compact ? 'Generate' : 'Generate Avatar'}
        progress={progress}
        showProgress={progress > 0 && hasCredits}
        onClick={handleOpen}
        compact={compact}
        active={active}
      />

      <AvatarCreationDialog
        open={open}
        onClose={handleClose}
        onGenerate={(value, style) => onGenerate(value, style)}
        loading={loading}
        previews={previews}
        isAuthenticated={isAuthenticated}
        hasCredits={hasCredits}
      />
    </>
  );
}
