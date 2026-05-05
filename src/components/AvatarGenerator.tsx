import { useCallback, useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Box, InputAdornment, Tooltip, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import { useAppSelector } from '@/store/hooks';
import {
  selectAuthUser,
  selectIsAuthenticated,
} from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';

const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
};

const inputContainerSx: SxProps = {
  display: 'flex',
  alignItems: 'center',
  width: '50%',
  minWidth: '400px',
  maxWidth: '800px',
};

export default function AvatarGenerator() {
  const [value, setValue] = useState('');
  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const user = useAppSelector(selectAuthUser);
  const profile = useAppSelector(selectUserProfile);

  const navigate = useNavigate();

  function onGenerate() {
    navigate({
      to: '/avatar-generation',
      search: { userId: user?.uid },
      state: {
        prompt: value,
      },
    });
  }

  const getTooltipTitle = useCallback(() => {
    if (!isAuthenticated) return 'Sign in to generate';
    if (profile && profile.credits <= 0) {
      return 'Insufficient credits';
    }
    return '';
  }, [profile, isAuthenticated]);

  return (
    <Box sx={containerSx}>
      <Typography color="#fff" component="h1" variant="h2">
        Generate your avatar
      </Typography>
      <Box sx={inputContainerSx}>
        <TextField
          fullWidth
          animate
          hiddenLabel
          size="small"
          placeholder="Type a prompt..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <Tooltip title={getTooltipTitle()} arrow>
                  <InputAdornment position="start">
                    <Button
                      disabled={value.trim().length === 0}
                      size="small"
                      onClick={onGenerate}
                    >
                      Generate
                    </Button>
                  </InputAdornment>
                </Tooltip>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
