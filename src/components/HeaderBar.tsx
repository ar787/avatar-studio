import { useState, type MouseEvent } from 'react';
import { useNavigate } from '@tanstack/react-router';
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Box,
  CircularProgress,
} from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useAuth } from '@hooks/useAuth';
import { useSnackbar } from '@hooks/useSnackbar';

export default function HeaderBar() {
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { isAuthenticated, logOut } = useAuth();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) =>
    setAnchorEl(event.currentTarget);
  const handleCloseMenu = () => setAnchorEl(null);

  const handleSignOut = async () => {
    setIsLoggingOut(true);
    try {
      await logOut();
      handleCloseMenu();
      navigate({ to: '/sign-in' });
    } catch {
      showSnackbar({
        message: 'Something went wrong. Please try again later.',
        severity: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } finally {
      setIsLoggingOut(false);
    }
  };

  return (
    <>
      <AppBar
        position="static"
        sx={{
          background:
            'linear-gradient(135deg, #6A1B9A 0%, #FF4081 50%, #7C4DFF 100%)',
        }}
      >
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            My Profile
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleOpenMenu} color="inherit">
              <AccountCircle />
            </IconButton>

            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleCloseMenu}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            >
              {isAuthenticated ? (
                <MenuItem
                  onClick={handleSignOut}
                  disabled={isLoggingOut}
                  sx={{ minWidth: 120, justifyContent: 'space-between' }}
                >
                  {isLoggingOut ? 'Signing out...' : 'Sign Out'}
                  {isLoggingOut && (
                    <CircularProgress size={16} color="inherit" />
                  )}
                </MenuItem>
              ) : (
                <MenuItem onClick={() => navigate({ to: '/sign-in' })}>
                  Sign In
                </MenuItem>
              )}
            </Menu>
          </Box>
        </Toolbar>
      </AppBar>
      {SnackbarComponent}
    </>
  );
}
