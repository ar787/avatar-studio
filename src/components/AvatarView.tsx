import { logEvent } from 'firebase/analytics';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import type { SxProps } from '@mui/material/styles';

import { getAvatarDownloadBlob } from '@/services/api/download.api';
import { analytics } from '@/services/firebase';
import Button from '@ui/components/Button';
import { useFileDownload } from '@hooks/useFileDownload';
import { useNotification } from '@hooks/useNotification';

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
const TRANSITION = 300;
const BUTTON_TRANSITION = TRANSITION + 500;

export default function AvatarView({
  open,
  onClose,
  imageUrl,
  name,
}: Readonly<AvatarViewProps>) {
  const { addNotification } = useNotification();
  const { handleDownload, loading } = useFileDownload({
    onDownload: () => getAvatarDownloadBlob(name),
    onSuccess: () => {
      logEvent(analytics, 'download_image', {
        image_name: name,
      });
    },
    onError: () => {
      addNotification({
        message: 'Download failed. Please try again later.',
        severity: 'error',
      });
    },
  });

  const onContextMenu: AvatarProps['onContextMenu'] = (e) => e.preventDefault();

  return (
    <Backdrop
      open={open}
      transitionDuration={{ enter: 0, exit: TRANSITION }}
      onClick={onClose}
    >
      <Zoom in={open} timeout={{ enter: TRANSITION, exit: 0 }} unmountOnExit>
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
          <Avatar
            src={imageUrl}
            draggable={false}
            sx={sx}
            slotProps={{ img: { draggable: false } }}
            onContextMenu={onContextMenu}
          />

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
            <Grow in={!loading} timeout={BUTTON_TRANSITION}>
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
      </Zoom>
    </Backdrop>
  );
}
