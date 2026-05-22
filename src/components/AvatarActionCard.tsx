import { useState } from 'react';
import {
  Card,
  CardMedia,
  Box,
  IconButton,
  Portal,
  styled,
} from '@mui/material';
import DownloadIcon from '@mui/icons-material/Download';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useFileDownload } from '@hooks/useFileDownload';
import { useNotification } from '@hooks/useNotification';
import AvatarView from '@/components/AvatarView';

const StyledCard = styled(Card)({
  position: 'relative',
  borderRadius: 16,
  overflow: 'hidden',
  cursor: 'pointer',
});

const Overlay = styled(Box)({
  position: 'absolute',
  inset: 0,
  background: 'rgba(0,0,0,0.35)',
  opacity: 0,
  transition: 'opacity 0.3s ease',
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'flex-end',
  padding: 8,
  pointerEvents: 'none',

  '.MuiPaper-root:hover &': {
    opacity: 1,
    pointerEvents: 'auto',
  },
});

const FloatingButton = styled(IconButton)({
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  '&:hover': {
    background: 'rgba(0,0,0,0.8)',
  },
});

type AvatarActionCardProps = {
  src: string;
  name: string;
  onDownload: () => Promise<Blob>;
  onDelete: () => void;
};

export default function AvatarActionCard({
  src,
  name,
  onDownload,
  onDelete,
}: Readonly<AvatarActionCardProps>) {
  const [viewOpen, setViewOpen] = useState(false);
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
      <StyledCard onClick={() => setViewOpen(true)}>
        <CardMedia
          component="img"
          image={src}
          alt={name}
          draggable={false}
          sx={{
            WebkitTouchCallout: 'none',
            userSelect: 'none',
            WebkitUserSelect: 'none',
          }}
          onContextMenu={(e) => e.preventDefault()}
        />

        <Overlay>
          <Box sx={{ display: 'flex', gap: 0.5 }}>
            <FloatingButton
              size="small"
              aria-label="Download avatar"
              onClick={(e) => {
                e.stopPropagation();
                handleDownload(e);
              }}
              loading={loading}
            >
              <DownloadIcon fontSize="small" />
            </FloatingButton>
            <FloatingButton
              size="small"
              aria-label="Delete avatar"
              onClick={(e) => {
                e.stopPropagation();
                onDelete();
              }}
            >
              <DeleteOutlineIcon fontSize="small" />
            </FloatingButton>
          </Box>
        </Overlay>
      </StyledCard>

      <Portal>
        <AvatarView
          open={viewOpen}
          imageUrl={src}
          name={name}
          onClose={() => setViewOpen(false)}
          onDownload={onDownload}
        />
      </Portal>
    </>
  );
}
