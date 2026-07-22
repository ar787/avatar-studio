import { useNavigate, useRouterState } from '@tanstack/react-router';
import { Divider, useMediaQuery, useTheme } from '@mui/material';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Avatar from '@mui/material/Avatar';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import PhotoAlbumIcon from '@mui/icons-material/PhotoAlbum';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import CloseIcon from '@mui/icons-material/Close';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import AutoFixHighIcon from '@mui/icons-material/AutoFixHigh';
import type { SvgIconComponent } from '@mui/icons-material';

import { useAppSelector } from '@/store/hooks';
import { selectAuthUser } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';

const DRAWER_WIDTH = 84;

const NAV_ITEMS: { key: string; label: string; icon: SvgIconComponent }[] = [
  { key: '/generate', label: 'Generate', icon: AutoFixHighIcon },
  { key: '/avatar-generation', label: 'Library', icon: PhotoLibraryIcon },
  { key: '/albums', label: 'Albums', icon: PhotoAlbumIcon },
  { key: '/about', label: 'About', icon: InfoOutlinedIcon },
];

const paperSx = {
  width: DRAWER_WIDTH,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  py: 2,
  overflowX: 'hidden',
} as const;

type SidebarProps = Readonly<{
  open: boolean;
  onClose: () => void;
}>;

export default function Sidebar({ open, onClose }: SidebarProps) {
  const navigate = useNavigate();
  const { location } = useRouterState();
  const profile = useAppSelector(selectUserProfile);
  const user = useAppSelector(selectAuthUser);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleNav = (key: string) => {
    if (key === '/avatar-generation') {
      navigate({ to: '/avatar-generation', search: { userId: user?.uid } });
    } else {
      navigate({
        to: key as '/' | '/albums' | '/about' | '/settings' | '/generate',
      });
    }
    if (isMobile) onClose();
  };

  const isActive = (key: string) =>
    key === '/' ? location.pathname === '/' : location.pathname.startsWith(key);

  const railContent = (showClose: boolean) => (
    <>
      {showClose && (
        <Box
          role="button"
          aria-label="Close menu"
          onClick={onClose}
          sx={{
            width: 36,
            height: 36,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'rgba(255,255,255,0.7)',
            cursor: 'pointer',
            mb: 1,
            borderRadius: 1,
            transition: 'background-color 200ms cubic-bezier(0.4,0,0.2,1)',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.06)' },
          }}
        >
          <CloseIcon />
        </Box>
      )}

      <Box
        role="button"
        aria-label="Home"
        onClick={() => handleNav('/')}
        sx={{
          width: 56,
          height: 56,
          borderRadius: 2,
          background: 'linear-gradient(135deg,#7c4dff,#ff4081)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 0 20px rgba(124,77,255,0.5)',
          mb: 1.5,
          cursor: 'pointer',
          overflow: 'hidden',
        }}
      >
        {profile?.picture ? (
          <Avatar
            src={profile.picture}
            sx={{ width: '100%', height: '100%', borderRadius: 0 }}
          />
        ) : (
          <AutoAwesomeIcon sx={{ color: '#fff', fontSize: 26 }} />
        )}
      </Box>

      <Divider sx={{ mb: 1, width: 44, bgcolor: '#d6e1ff1f' }} />

      {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
        const active = isActive(key);
        return (
          <Box
            key={key}
            role="button"
            onClick={() => handleNav(key)}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 0.5,
              py: 1,
              px: 0.5,
              borderRadius: 1.5,
              width: 64,
              cursor: 'pointer',
              mb: 0.5,
              color: active ? '#7c4dff' : 'rgba(255,255,255,0.5)',
              bgcolor: active ? 'rgba(124,77,255,0.08)' : 'transparent',
              transition:
                'background-color 200ms cubic-bezier(0.4,0,0.2,1), color 200ms cubic-bezier(0.4,0,0.2,1)',
              '&:hover': {
                bgcolor: active
                  ? 'rgba(124,77,255,0.12)'
                  : 'rgba(255,255,255,0.06)',
                color: active ? '#7c4dff' : 'rgba(255,255,255,0.8)',
              },
            }}
          >
            <Icon
              sx={
                active
                  ? { filter: 'drop-shadow(0 0 6px rgba(124,77,255,0.6))' }
                  : undefined
              }
            />
            <Box
              component="span"
              sx={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.03em',
                textTransform: 'uppercase',
              }}
            >
              {label}
            </Box>
          </Box>
        );
      })}

      <Box sx={{ flex: 1 }} />

      <Box
        role="button"
        aria-label="Settings"
        onClick={() => handleNav('/settings')}
        sx={{
          width: 44,
          height: 44,
          borderRadius: 1.5,
          bgcolor: isActive('/settings') ? 'rgba(124,77,255,0.08)' : '#232628',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: isActive('/settings') ? '#7c4dff' : 'rgba(255,255,255,0.7)',
          cursor: 'pointer',
          mb: 1,
          transition:
            'background-color 200ms cubic-bezier(0.4,0,0.2,1), color 200ms cubic-bezier(0.4,0,0.2,1)',
          '&:hover': {
            bgcolor: isActive('/settings')
              ? 'rgba(124,77,255,0.12)'
              : '#2a2d30',
            color: isActive('/settings') ? '#7c4dff' : '#fff',
          },
        }}
      >
        <SettingsIcon />
      </Box>
    </>
  );

  // Mobile: temporary drawer — MUI handles backdrop + slide animation
  if (isMobile) {
    return (
      <Drawer
        variant="temporary"
        open={open}
        onClose={onClose}
        ModalProps={{ keepMounted: true }}
        sx={{
          '& .MuiDrawer-paper': paperSx,
        }}
      >
        {railContent(true)}
      </Drawer>
    );
  }

  // Desktop: permanent drawer — width animates to 0 when closed so no space is reserved
  return (
    <Drawer
      variant="permanent"
      anchor="left"
      sx={{
        width: open ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        overflow: 'visible',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: open
            ? theme.transitions.duration.enteringScreen
            : theme.transitions.duration.leavingScreen,
        }),
        '& .MuiDrawer-paper': {
          ...paperSx,
          width: open ? DRAWER_WIDTH : 0,
          height: '100%',
          position: 'relative',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: open
              ? theme.transitions.duration.enteringScreen
              : theme.transitions.duration.leavingScreen,
          }),
        },
      }}
    >
      {railContent(false)}
    </Drawer>
  );
}
