import { useCallback, useEffect, useRef, useState } from 'react';
import {
  useLoaderData,
  useLocation,
  useNavigate,
} from '@tanstack/react-router';
import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import InputAdornment from '@mui/material/InputAdornment';
import type { SxProps } from '@mui/material/styles';
import Grid, { type GridBaseProps } from '@mui/material/Grid';

import { generateAvatar, getGeneratedAvatars } from '../services/api';
import HoverActionCard from '../components/HoverActionCard';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';

import type { GeneratedAvatarType } from '../types/avatar';

const containerSx: SxProps = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '8px',
  paddingTop: 5,
};

const sizes: GridBaseProps['size'] = { xs: 6, md: 4, lg: 3 };

export default function AvatarGenerationPage() {
  const initialData = useLoaderData({ from: '/_layout/avatar-generation' });
  const { state } = useLocation();
  const navigate = useNavigate();

  const [value, setValue] = useState('');
  const [isAvatarGenerated, setIsAvatarGenerated] = useState(false);
  const [list, setList] = useState(initialData);

  const generationStarted = useRef(false);

  const handleGenerate = useCallback(
    async (prompt: string) => {
      if (!prompt) return;
      setIsAvatarGenerated(true);
      generationStarted.current = true;
      try {
        await generateAvatar(prompt);
        const res = await getGeneratedAvatars();
        setList(res);
      } finally {
        generationStarted.current = false;
        setIsAvatarGenerated(false);
        setValue('');
        navigate({
          to: '/avatar-generation',
          state: (prev) => ({ ...prev, prompt: undefined }),
          replace: true,
        });
      }
    },
    [navigate],
  );

  useEffect(() => {
    if (state.prompt && generationStarted.current === false)
      handleGenerate(state.prompt);
  }, [state.prompt, handleGenerate]);

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
                  disabled={value.trim().length === 0 || isAvatarGenerated}
                  size="small"
                  onClick={() => handleGenerate(value)}
                >
                  Generate
                </Button>
              </InputAdornment>
            ),
          },
        }}
      />
      <AvatarCardList list={list} loading={isAvatarGenerated} />
    </Box>
  );
}

type AvatarCardListProps = {
  list: GeneratedAvatarType[];
  loading: boolean;
};

function AvatarCardList({ list, loading }: AvatarCardListProps) {
  return (
    <Grid container spacing={2} sx={{ mt: 4 }}>
      {loading && (
        <Grid size={sizes}>
          <Skeleton
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '16px',
              height: { xs: '226px', sm: '100%' },
            }}
            variant="rectangular"
          />
        </Grid>
      )}
      {list.map((avatar) => (
        <Grid size={sizes} key={avatar.name}>
          <HoverActionCard src={avatar.url} />
        </Grid>
      ))}
    </Grid>
  );
}
