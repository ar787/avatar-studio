import { AppBar, Toolbar, Typography, Box } from '@mui/material';

import Link from '@ui/components/Link';
import { useAppSelector } from '@/store/hooks';
import { useAuth } from '@/hooks/useAuth';
import {
  selectAuthUser,
  selectIsAuthenticated,
} from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';
import { DesktopNav } from './DesktopNav';
import { MobileNav } from './MobileNav';

export default function HeaderBar() {
  const { logOut } = useAuth();
  const user = useAppSelector(selectAuthUser);
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);

  return (
    <AppBar
      position="fixed"
      sx={(theme) => ({
        backgroundColor: theme.palette.surface.background,
        backgroundImage: 'none',
      })}
    >
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Link to="/">
            <Typography variant="h6" component="span">
              My Profile
            </Typography>
          </Link>
        </Box>
        <DesktopNav
          userId={user?.uid}
          isAuthenticated={isAuthenticated}
          profile={profile}
          onSignOut={logOut}
        />
        <MobileNav
          userId={user?.uid}
          isAuthenticated={isAuthenticated}
          profile={profile}
          onSignOut={logOut}
        />
      </Toolbar>
    </AppBar>
  );
}
