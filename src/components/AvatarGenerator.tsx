import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Box, InputAdornment, Typography } from '@mui/material';
import type { SxProps } from '@mui/material/styles';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';

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
  const navigate = useNavigate();

  function onGenerate() {
    navigate({
      to: '/avatar-generation',
      state: {
        prompt: value,
      },
    });
  }

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
                <InputAdornment position="start">
                  <Button
                    disabled={value.trim().length === 0}
                    size="small"
                    onClick={onGenerate}
                  >
                    Generate
                  </Button>
                </InputAdornment>
              ),
            },
          }}
        />
      </Box>
    </Box>
  );
}
