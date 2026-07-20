import { lazy, Suspense } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

import Button from '@ui/components/Button';
import CardDisplay from '@/components/CardDisplay';
import AccountPopover from '@/components/AccountPopover';

const AvatarCreation = lazy(() => import('@/components/AvatarCreation'));
import type { UserProfile } from '@/types/userProfile';

type DesktopNavProps = {
  userId: string | undefined;
  isAuthenticated: boolean;
  profile: UserProfile | null;
  onSignOut: () => Promise<void>;
};

export function DesktopNav({
  userId,
  isAuthenticated,
  profile,
  onSignOut,
}: Readonly<DesktopNavProps>) {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'center',
        gap: '10px',
      }}
    >
      <Suspense fallback={null}>
        <AvatarCreation />
      </Suspense>
      <Button
        startIcon={<PhotoLibraryIcon />}
        onClick={() =>
          navigate({
            to: '/avatar-generation',
            search: { userId },
          })
        }
      >
        Library
      </Button>
      <Button
        startIcon={<PhotoAlbumIcon />}
        onClick={() => navigate({ to: '/albums' })}
      >
        Albums
      </Button>
      <Button
        startIcon={<InfoOutlinedIcon />}
        onClick={() => navigate({ to: '/about' })}
      >
        About
      </Button>
      {isAuthenticated && <CardDisplay credits={profile?.credits ?? 0} />}
      <AccountPopover
        profile={profile}
        isAuthenticated={isAuthenticated}
        signOut={onSignOut}
      />
    </Box>
  );
}
