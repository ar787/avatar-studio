import { useNavigate } from '@tanstack/react-router';
import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';

import Button from '@ui/components/Button';
import Link from '@ui/components/Link';
import CardDisplay from '@/components/CardDisplay';
import AccountPopover from '@/components/AccountPopover';
import { useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import {
  selectAuthUser,
  selectIsAuthenticated,
} from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';

export default function HeaderBar() {
  const navigate = useNavigate();
  const { logOut } = useAuth();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);

  return (
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
          {isAuthenticated && <CardDisplay credits={profile?.credits ?? 0} />}
          <Button
            variant="outlined"
            endIcon={<PhotoLibraryIcon />}
            onClick={() => {
              navigate({
                to: '/avatar-generation',
                search: {
                  userId: user?.uid,
                },
              });
            }}
          >
            Library
          </Button>
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
