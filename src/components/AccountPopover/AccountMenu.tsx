import Menu, { type MenuProps } from '@ui/components/Menu';

import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Login from '@mui/icons-material/Login';
import Logout from '@mui/icons-material/Logout';
import Divider from '@mui/material/Divider';

import type { UserProfile } from '@/types/userProfile';

type AccountMenuProps = {
  anchorEl: null | HTMLElement;
  slotProps: MenuProps['slotProps'];
  profile: UserProfile | null;
  isAuthenticated: boolean;
  isSignOut: boolean;
  onClose: () => void;
  onSignIn: () => void;
  onSignOut: () => Promise<void>;
};

export const AccountMenu = ({
  anchorEl,
  slotProps,
  profile,
  isAuthenticated,
  isSignOut,
  onClose,
  onSignIn,
  onSignOut,
}: Readonly<AccountMenuProps>) => {
  return (
    <Menu
      anchorEl={anchorEl}
      open={Boolean(anchorEl)}
      onClose={onClose}
      slotProps={slotProps}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 2 }}>
        <Avatar />
        <Box>
          <Typography variant="body2" fontWeight="bold">
            {isAuthenticated ? profile?.displayName : 'Guest'}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {isAuthenticated
              ? profile?.email
              : 'Please sign in to access your profile'}
          </Typography>
        </Box>
      </Box>

      <Divider sx={{ my: 1 }} />

      {isAuthenticated ? (
        <MenuItem onClick={onSignOut} disabled={isSignOut}>
          <ListItemIcon>
            <Logout />
          </ListItemIcon>
          <ListItemText primary="Sign Out" />
          {isSignOut && <CircularProgress size={20} />}
        </MenuItem>
      ) : (
        <MenuItem onClick={onSignIn}>
          <ListItemIcon color="inherit">
            <Login />
          </ListItemIcon>
          <ListItemText primary="Sign In" />
        </MenuItem>
      )}
    </Menu>
  );
};
