import Backdrop from '@mui/material/Backdrop';
import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import { Fade, Box, CircularProgress, Grow, Zoom } from '@mui/material';
import type { SxProps } from '@mui/material/styles';
import { getAvatarDownloadBlob } from '../services/api';
import { logEvent } from 'firebase/analytics';

import { analytics } from '../services/firebase';
import { useSnackbar } from '@hooks/useSnackbar';
import Button from '@ui/components/Button';
import { useFileDownload } from '@hooks/useFileDownload';

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

export default function AvatarView({
  open,
  onClose,
  imageUrl,
  name,
}: Readonly<AvatarViewProps>) {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { handleDownload, loading } = useFileDownload({
    onDownload: () => getAvatarDownloadBlob(name),
    onSuccess: () => {
      logEvent(analytics, 'download_image', {
        image_name: name,
      });
    },
    onError: () => {
      showSnackbar({
        message: 'Download failed. Please try again later.',
        severity: 'error',
        anchorOrigin: {
          vertical: 'top',
          horizontal: 'right',
        },
      });
    },
  });

  function handleOnClose() {
    onClose();
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
              {loading && (
                <CircularProgress
                  color="secondary"
                  size={36}
                  sx={{
                    position: 'absolute',
                  }}
                />
              )}
              <Grow in={!loading} timeout={300}>
                <Button
                  onClick={handleDownload}
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
