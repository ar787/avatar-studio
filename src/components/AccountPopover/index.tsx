import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import { type MenuProps } from '@ui/components/Menu';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

import { useNotification } from '@hooks/useNotification';

import type { UserProfile } from '../../types/userProfile';
import { AccountMenu } from './AccountMenu';
import { useSignOut } from './hooks/useSignOut';

const slotProps: MenuProps['slotProps'] = {
  paper: {
    sx: {
      padding: '10px',
      borderRadius: '1rem',
    },
  },
  list: {
    sx: { maxWidth: 400, minWidth: 260 },
  },
};

type AccountPopoverProps = {
  profile: UserProfile | null;
  isAuthenticated: boolean;
  signOut: () => Promise<void>;
};

export default function AccountPopover({
  profile,
  isAuthenticated,
  signOut,
}: Readonly<AccountPopoverProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const navigate = useNavigate();
  const { addNotification } = useNotification();

  const { loading, handleSignOut } = useSignOut({
    signOut,
    onSuccess: () => {
      handleClose();
    },
    onError: () => {
      addNotification({
        message: 'Something went wrong. Please try again later.',
        severity: 'error',
      });
    },
  });
  const handleSingIn = () => {
    navigate({ to: '/sign-in', replace: true });
  };

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton onClick={handleOpen} color="inherit">
        <AccountCircle />
      </IconButton>
      <AccountMenu
        anchorEl={anchorEl}
        isAuthenticated={isAuthenticated}
        profile={profile}
        slotProps={slotProps}
        isSignOut={loading}
        onSignIn={handleSingIn}
        onSignOut={handleSignOut}
        onClose={handleClose}
      />
    </>
  );
}
