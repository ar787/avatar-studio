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
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useAuth } from '@hooks/useAuth';
import { useSnackbar } from '@hooks/useSnackbar';

import CardDisplay from './CardDisplay';
import Button from '@ui/components/Button';
import Link from '@ui/components/Link';

export default function HeaderBar() {
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { isAuthenticated, currentUserProfile, logOut } = useAuth();
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
      <AppBar position="fixed" color="transparent">
        <Toolbar>
          <Box sx={{ flexGrow: 1 }}>
            <Link to="/">
              <Typography variant="h6" component="span">
                My Profile
              </Typography>
            </Link>
          </Box>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              color: '#7C4DFF',
              gap: '10px',
            }}
          >
            {isAuthenticated && (
              <CardDisplay credits={currentUserProfile?.credits ?? 0} />
            )}
            <Button
              variant="outlined"
              endIcon={<PhotoLibraryIcon />}
              onClick={() => {
                navigate({ to: '/avatar-generation' });
              }}
            >
              Library
            </Button>
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
