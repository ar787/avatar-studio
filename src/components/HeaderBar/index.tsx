import { AppBar, Toolbar, Box, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
// import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';

import { useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';
import CardDisplay from '@/components/CardDisplay';
import AccountPopover from '@/components/AccountPopover';

type HeaderBarProps = {
  onToggleSidebar: () => void;
};

export default function HeaderBar({
  onToggleSidebar,
}: Readonly<HeaderBarProps>) {
  const { logOut } = useAuth();
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: '#1b1d1f',
        backgroundImage: 'none',
        borderBottom: '1px solid #d6e1ff1f',
        boxShadow: 'none',
      }}
    >
      <Toolbar
        sx={{ minHeight: '56px !important', px: '20px !important', gap: 1.5 }}
      >
        <IconButton
          onClick={onToggleSidebar}
          aria-label="Toggle sidebar"
          sx={{ color: '#fff', width: 36, height: 36, borderRadius: 1 }}
        >
          <MenuIcon />
        </IconButton>

        <Box sx={{ flexGrow: 1 }} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.25 }}>
          {isAuthenticated && <CardDisplay credits={profile?.credits ?? 0} />}
          {/* <IconButton
            aria-label="Notifications (not yet implemented)"
            disabled
            sx={{
              color: 'rgba(255,255,255,0.7)',
              width: 36,
              height: 36,
              '&.Mui-disabled': { color: 'rgba(255,255,255,0.7)' },
            }}
          >
            <NotificationsOutlinedIcon />
          </IconButton> */}
          <AccountPopover
            profile={profile}
            isAuthenticated={isAuthenticated}
            signOut={logOut}
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
}
