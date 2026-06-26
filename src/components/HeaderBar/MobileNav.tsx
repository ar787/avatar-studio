import { lazy, Suspense, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import IconButton from '@mui/material/IconButton';
import Divider from '@mui/material/Divider';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import MenuIcon from '@mui/icons-material/Menu';

import CardDisplay from '@/components/CardDisplay';
import AccountPopover from '@/components/AccountPopover';
const AvatarCreation = lazy(() => import('@/components/AvatarCreation'));
import type { UserProfile } from '@/types/userProfile';

type MobileNavProps = {
  userId: string | undefined;
  isAuthenticated: boolean;
  profile: UserProfile | null;
  onSignOut: () => Promise<void>;
};

export function MobileNav({
  userId,
  isAuthenticated,
  profile,
  onSignOut,
}: Readonly<MobileNavProps>) {
  const navigate = useNavigate();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <>
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
          gap: 1,
        }}
      >
        {isAuthenticated && <CardDisplay credits={profile?.credits ?? 0} />}
        <AccountPopover
          profile={profile}
          isAuthenticated={isAuthenticated}
          signOut={onSignOut}
        />
        <IconButton
          color="inherit"
          edge="end"
          onClick={() => setDrawerOpen(true)}
          aria-label="Open menu"
        >
          <MenuIcon />
        </IconButton>
      </Box>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={() => setDrawerOpen(false)}
        slotProps={{
          paper: {
            sx: (theme) => ({
              backgroundColor: theme.palette.surface.background,
              backgroundImage: 'none',
              width: 240,
            }),
          },
        }}
      >
        <Box sx={{ pt: 2 }}>
          <List disablePadding>
            <ListItem sx={{ pb: 1.5 }}>
              <Suspense fallback={null}>
                <AvatarCreation />
              </Suspense>
            </ListItem>
            <Divider />
            <ListItemButton
              onClick={() => {
                navigate({
                  to: '/avatar-generation',
                  search: { userId },
                });
                setDrawerOpen(false);
              }}
              sx={(theme) => ({
                '&:hover': {
                  backgroundColor: theme.palette.customAction.menuHover,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              })}
            >
              <ListItemIcon>
                <PhotoLibraryIcon />
              </ListItemIcon>
              <ListItemText primary="Library" />
            </ListItemButton>
            <ListItemButton
              onClick={() => {
                navigate({ to: '/albums' });
                setDrawerOpen(false);
              }}
              sx={(theme) => ({
                '&:hover': {
                  backgroundColor: theme.palette.customAction.menuHover,
                },
                '& .MuiListItemIcon-root': {
                  color: theme.palette.primary.main,
                },
              })}
            >
              <ListItemIcon>
                <PhotoAlbumIcon />
              </ListItemIcon>
              <ListItemText primary="Albums" />
            </ListItemButton>
          </List>
        </Box>
      </Drawer>
    </>
  );
}
