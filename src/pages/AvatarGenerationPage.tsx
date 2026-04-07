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

import {
  downloadAvatarFromLibrary,
  generateAvatar,
  getGeneratedAvatars,
} from '@/services/api';
import HoverActionCard from '@/components/HoverActionCard';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';

import type { GeneratedAvatarType } from '@/types/avatar';
import { useAuth } from '@hooks/useAuth';
import { useNotification } from '@hooks/useNotification';

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
  const { setProfileData, currentUser } = useAuth();
  const { addNotification } = useNotification();
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
        const { data } = await generateAvatar(prompt);
        const res = await getGeneratedAvatars();
        setProfileData({ credits: data?.remainingCredits ?? 0 });
        setList(res);
      } catch (error) {
        if (error instanceof Error) {
          let message = 'Something went wrong. Please try again later.';

          if (error.message === 'Insufficient credits.') {
            message = 'You have insufficient credits.';
          }

          addNotification({
            message,
            severity: 'error',
          });
        }
      } finally {
        generationStarted.current = false;
        setIsAvatarGenerated(false);
        setValue('');
        navigate({
          to: '/avatar-generation',
          state: (prev) => ({ ...prev, prompt: undefined }),
          search: { userId: currentUser?.uid },
          replace: true,
        });
      }
    },
    [currentUser?.uid, navigate, setProfileData, addNotification],
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
  const skeletonSize = list.length > 0 ? '100%' : { xs: '200px', md: '300px' };

  return (
    <Grid container spacing={2} sx={{ mt: 4, width: '100%' }}>
      {loading && (
        <Grid size={sizes}>
          <Skeleton
            component="div"
            sx={{
              bgcolor: 'grey.900',
              borderRadius: '16px',
              height: skeletonSize,
              width: skeletonSize,
            }}
            variant="rectangular"
          />
        </Grid>
      )}
      {list.map((avatar) => (
        <Grid size={sizes} key={avatar.name}>
          <HoverActionCard
            src={avatar.url}
            onDownload={() => downloadAvatarFromLibrary(avatar.name)}
          />
        </Grid>
      ))}
    </Grid>
  );
}
