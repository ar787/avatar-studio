import { use, useState } from 'react';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import { generateAvatar, getGeneratedAvatars } from '../services/api';
import type { SxProps } from '@mui/material/styles';
import Grid, { type GridBaseProps } from '@mui/material/Grid';
import HoverActionCard from '../components/HoverActionCard';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';

const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  paddingTop: '10px',
};

const getGeneratedAvatarsPromise = getGeneratedAvatars();
const sizes: GridBaseProps['size'] = { xs: 4, md: 4, lg: 2 };

export default function AvatarGenerationPage() {
  const [value, setValue] = useState('');

  function onGenerate() {
    generateAvatar(value);
  }

  return (
    <Box sx={containerSx}>
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
      <AvatarCardList />
    </Box>
  );
}

function AvatarCardList() {
  const data = use(getGeneratedAvatarsPromise);
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {data.map((avatar) => (
        <Grid size={sizes} key={avatar.name} sx={{ width: 320 }}>
          <HoverActionCard src={avatar.imageUrl} />
        </Grid>
      ))}
    </Grid>
  );
}
