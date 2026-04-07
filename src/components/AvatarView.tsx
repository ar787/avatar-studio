import { useEffect, useRef, useState } from 'react';
import { logEvent } from 'firebase/analytics';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Zoom from '@mui/material/Zoom';
import CircularProgress from '@mui/material/CircularProgress';
import Grow from '@mui/material/Grow';
import Avatar, { type AvatarProps } from '@mui/material/Avatar';
import type { SxProps } from '@mui/material/styles';

import { getAvatarDownloadBlob } from '@/services/api';
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
const TIMEOUT = 200;

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
  const [internalOpen, setInternalOpen] = useState(false);
  const timeOutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearTimer = () => {
    if (timeOutRef.current) {
      clearTimeout(timeOutRef.current);
      timeOutRef.current = null;
    }
  };

  const handleClose = () => {
    setInternalOpen(false);
    timeOutRef.current = setTimeout(() => {
      onClose();
    }, TIMEOUT);
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setInternalOpen(open);

    return clearTimer;
  }, [open]);

  const onContextMenu: AvatarProps['onContextMenu'] = (e) => e.preventDefault();

  return (
    <Backdrop
      open={internalOpen}
      transitionDuration={{ enter: 0, exit: TIMEOUT }}
      onClick={handleClose}
    >
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
        <Zoom in={internalOpen} timeout={{ enter: 200, exit: TIMEOUT }}>
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
  );
}
