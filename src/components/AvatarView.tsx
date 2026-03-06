import Backdrop from '@mui/material/Backdrop';
import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import { useState } from 'react';
import { Fade, Box, CircularProgress, Grow, Zoom } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { getAvatarDownloadBlob } from '../services/api';
import { logEvent } from 'firebase/analytics';
import { analytics } from '../services/firebase';
import { useSnackbar } from '@hooks/useSnackbar';
import Button from '@ui/components/Button';

type AvatarViewProps = {
  imageUrl: string;
  name: string;
  open: boolean;
  onClose: () => void;
};

const sx: SxProps = {
  width: '100%',
  height: '100%',
  maxWidth: 400,
  maxHeight: 400,
  WebkitTouchCallout: 'none',
  userSelect: 'none',
  WebkitUserSelect: 'none',
};
const TIMEOUT = 300;

function generateUniqueFileName(): string {
  const timestamp = Date.now().toString();
  const lastFourDigits = timestamp.slice(-4);
  return `avatar-${lastFourDigits}.png`;
}

export default function AvatarView({
  open,
  onClose,
  imageUrl,
  name,
}: Readonly<AvatarViewProps>) {
  const [isLoading, setIsLoading] = useState(false);
  const { showSnackbar, SnackbarComponent } = useSnackbar();

  function handleOnClose() {
    onClose();
  }

  async function download(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
    try {
      e.stopPropagation();
      setIsLoading(true);
      logEvent(analytics, 'download_image', {
        image_name: name,
      });

      const blob = await getAvatarDownloadBlob(name);
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = generateUniqueFileName();
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);
    } catch {
      showSnackbar({
        message: 'Download failed. Please try again later.',
        severity: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    } finally {
      setIsLoading(false);
    }
  }

  const onContextMenu: AvatarProps['onContextMenu'] = (e) => e.preventDefault();

  return (
    <>
      <Fade in={open} timeout={{ enter: 0, exit: TIMEOUT }}>
        <Backdrop open={open} onClick={handleOnClose}>
          <Box
            onClick={(e) => e.stopPropagation()}
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              paddingX: {
                xs: '10px',
                sm: 0,
              },
              gap: 2,
            }}
          >
            <Zoom in={open} timeout={{ enter: 200, exit: 0 }}>
              <Avatar
                src={imageUrl}
                draggable={false}
                sx={sx}
                slotProps={{ img: { draggable: false } }}
                onContextMenu={onContextMenu}
              />
            </Zoom>

            <Box
              sx={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              {isLoading && (
                <CircularProgress
                  color="secondary"
                  size={36}
                  sx={{
                    position: 'absolute',
                  }}
                />
              )}
              <Grow in={!isLoading} timeout={300}>
                <Button
                  onClick={download}
                  fullWidth
                  aria-label="Download avatar"
                  size="large"
                >
                  Download
                </Button>
              </Grow>
            </Box>
          </Box>
        </Backdrop>
      </Fade>
      {SnackbarComponent}
    </>
  );
}
