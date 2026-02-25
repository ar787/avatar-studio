import { Box, InputAdornment, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import { NeonButton } from './NeonButton';
import NeonTextField from './NeonTextField';
import { useState } from 'react';
import { generateAvatar } from '../services/api';
import { useNavigate } from '@tanstack/react-router';

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

const WhiteNeonTextField = styled(NeonTextField)(() => ({
  backgroundColor: '#fff',
  '& .MuiInputBase-root': { paddingRight: '0px' },
}));

export default function AvatarGenerator() {
  const [value, setValue] = useState('');
  const navigate = useNavigate();

  function onGenerate() {
    generateAvatar(value);
    navigate({ to: '/avatar-generation' });
  }

  return (
    <Box sx={containerSx}>
      <Typography color="#fff" component="h1" variant="h2">
        Generate your avatar
      </Typography>
      <Box sx={inputContainerSx}>
        <WhiteNeonTextField
          fullWidth
          hiddenLabel
          size="small"
          placeholder="Type a prompt..."
          value={value}
          onChange={(e) => setValue(e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="start">
                  <NeonButton
                    disabled={value.trim().length === 0}
                    size="small"
                    onClick={onGenerate}
                  >
                    Generate
                  </NeonButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
