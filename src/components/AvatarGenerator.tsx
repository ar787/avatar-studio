import { useState, useEffect, useCallback } from 'react';
import { useNavigate, useRouter } from '@tanstack/react-router';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Skeleton,
  Tooltip,
  LinearProgress,
  Typography,
} from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import { useNotification } from '@/hooks';

import { useAppSelector } from '@/store/hooks';
import { setProfile } from '@/store/user/userSlice';
import { selectIsAuthenticated } from '@/store/auth/authSelectors';
import { selectUserProfile } from '@/store/user/userSelectors';

import { generateAvatar } from '@/services/api/avatar.api';

export default function AvatarGenerator() {
  const notify = useNotification();
  const [value, setValue] = useState('');
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const [progress, setProgress] = useState(0);

  const isAuthenticated = useAppSelector(selectIsAuthenticated);
  const profile = useAppSelector(selectUserProfile);
  const router = useRouter();
  const navigate = useNavigate();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  async function onGenerate() {
    if (!isAuthenticated) {
      navigate({ to: '/sign-in', replace: true });
      return;
    }
    let cleanupTimeout;
    try {
      setProgress(3);
      setLoading(true);
      const { data } = await generateAvatar(value);
      router.invalidate();
      setProgress(100);
      setPreview(data?.generatedAvatarUrls?.[0] ?? null);
      setProfile({ credits: data?.remainingCredits ?? 0 });
    } catch (error) {
      if (error instanceof Error) {
        let message = 'Something went wrong. Please try again later.';

        if (error.message === 'Insufficient credits.') {
          message = 'You have insufficient credits.';
        }
        notify.error(message);
      }
    } finally {
      setValue('');
      setLoading(false);

      cleanupTimeout = setTimeout(() => {
        setProgress(0);
      }, 500);
    }
    return () => clearTimeout(cleanupTimeout);
  }

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (loading && progress < 90) {
      interval = setInterval(() => {
        setProgress((prev) => prev + (90 - prev) * 0.1); // Slows down as it nears 90
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [loading, progress]);

  const getTooltipTitle = useCallback(() => {
    if (!isAuthenticated) return 'Sign in to generate';
    if (profile && profile.credits <= 0) {
      return 'Insufficient credits';
    }
    return '';
  }, [profile, isAuthenticated]);

  return (
    <>
      <Button startIcon={<AddBoxIcon />} onClick={handleOpen}>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
          }}
        >
          <Typography variant="body1">Generate Avatar</Typography>
          {progress > 0 && profile && profile.credits > 0 && (
            <Box sx={{ width: '100%' }}>
              <LinearProgress
                value={progress}
                variant="determinate"
                color="info"
              />
            </Box>
          )}
        </Box>
      </Button>

      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        fullWidth
        disableRestoreFocus
        maxWidth="lg"
        sx={{
          '& .MuiDialog-paper': {
            backgroundImage: 'none',
            backgroundColor: '#1b1d1f',
            borderColor: '#d6e1ff1f',
            borderWidth: 1,
            borderStyle: 'solid',
          },
        }}
      >
        <DialogTitle>Generate your avatar</DialogTitle>
        <DialogContent>
          <TextField
            value={value}
            onChange={handleChange}
            placeholder="Type a prompt..."
            fullWidth
            autoFocus
          />
          {preview && (
            <Box
              component="img"
              src={preview}
              alt="Generated avatar"
              sx={{
                mt: 2,
                borderRadius: '16px',
                height: '200px',
                width: '200px',
              }}
            />
          )}
          {loading && profile && profile.credits > 0 && (
            <Skeleton
              component="div"
              sx={{
                bgcolor: 'grey.900',
                mt: 2,
                borderRadius: '16px',
                height: '200px',
                width: '200px',
              }}
              variant="rectangular"
            />
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} variant="text">
            Cancel
          </Button>
          <Tooltip title={getTooltipTitle()}>
            <Button
              onClick={onGenerate}
              disabled={
                (isAuthenticated && !!value.trim() === false) || loading
              }
            >
              {loading ? 'Generating...' : 'Generate'}
            </Button>
          </Tooltip>
        </DialogActions>
      </Dialog>
    </>
  );
}
