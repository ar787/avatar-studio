import { useState } from 'react';
import { Card, CardMedia, Box, IconButton, styled } from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import AddIcon from '@mui/icons-material/Add';
import { useFileDownload } from '@hooks/useFileDownload';
import { useNotification } from '@hooks/useNotification';
import AlbumChoose from './Album/AlbumChoose';

const StyledCard = styled(Card)(() => ({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
}));

const Overlay = styled(Box)(() => ({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
  padding: 12,
  pointerEvents: 'none',

  '.MuiPaper-root:hover &': {
    opacity: 1,
    pointerEvents: 'auto',
  },
}));

const ActionGroup = styled(Box)({
  display: 'flex',
  justifyContent: 'flex-end',
});

const FloatingButton = styled(IconButton)(() => ({
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  '&:hover': {
    background: 'rgba(0,0,0,0.8)',
  },
}));

type HoverActionCardProps = {
  id: string;
  src: string;
  onDownload: () => Promise<Blob>;
};

export default function HoverActionCard({
  id,
  src,
  onDownload,
}: Readonly<HoverActionCardProps>) {
  const [openChooseDialog, setOpenChooseDialog] = useState(false);

  const notify = useNotification();
  const { handleDownload, loading } = useFileDownload({
    onDownload,
    onSuccess: () => {},
    onError: () => {
      notify.error('Download failed. Please try again later.');
    },
  });

  return (
    <>
      <StyledCard>
        <CardMedia component="img" image={src} alt="avatar" />

        <Overlay>
          <ActionGroup>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <FloatingButton
                size="small"
                onClick={() => setOpenChooseDialog(true)}
              >
                <AddIcon />
              </FloatingButton>
              <FloatingButton
                size="small"
                onClick={handleDownload}
                loading={loading}
              >
                <DownloadIcon />
              </FloatingButton>
            </Box>
          </ActionGroup>
        </Overlay>
      </StyledCard>

      <AlbumChoose
        open={openChooseDialog}
        onClose={() => setOpenChooseDialog(false)}
        avatarId={id}
      />
    </>
  );
}
