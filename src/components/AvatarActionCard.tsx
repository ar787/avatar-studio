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
import EditIcon from '@mui/icons-material/Edit';
import { useFileDownload } from '@hooks/useFileDownload';
import { useNotification } from '@hooks/useNotification';
import AvatarView from '@/components/AvatarView';
import {
  AvatarEditorDialog,
  AvatarEditorBadges,
  type AdjustState,
  type PresetType,
} from '@/components/AvatarEditor';

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
  avatarId: string;
  albumId: string;
  adjustments?: AdjustState;
  preset?: PresetType | null;
  onDownload: () => Promise<Blob>;
  onDelete: () => void;
};

export default function AvatarActionCard({
  src,
  name,
  avatarId,
  albumId,
  adjustments,
  preset,
  onDownload,
  onDelete,
}: Readonly<AvatarActionCardProps>) {
  const [viewOpen, setViewOpen] = useState(false);
  const [editorOpen, setEditorOpen] = useState(false);
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

        <AvatarEditorBadges adjustments={adjustments} preset={preset} />

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
              aria-label="Edit avatar"
              onClick={(e) => {
                e.stopPropagation();
                setEditorOpen(true);
              }}
            >
              <EditIcon fontSize="small" />
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
          onEdit={() => {
            setViewOpen(false);
            setEditorOpen(true);
          }}
        />
      </Portal>

      <Portal>
        <AvatarEditorDialog
          open={editorOpen}
          imageUrl={src}
          name={name}
          avatarId={avatarId}
          albumId={albumId}
          initialAdjustments={adjustments}
          initialPreset={preset}
          onClose={() => setEditorOpen(false)}
        />
      </Portal>
    </>
  );
}
