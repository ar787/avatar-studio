import { Card, CardMedia, Box, IconButton, styled } from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import ShareIcon from '@mui/icons-material/Share';
import DownloadIcon from '@mui/icons-material/Download';
import CropFreeIcon from '@mui/icons-material/CropFree';

import { useSnackbar } from '@hooks/useSnackbar';
import { useFileDownload } from '@hooks/useFileDownload';

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
  justifyContent: 'space-between',
});

const FloatingButton = styled(IconButton)(() => ({
  background: 'rgba(0,0,0,0.6)',
  color: '#fff',
  '&:hover': {
    background: 'rgba(0,0,0,0.8)',
  },
}));

type HoverActionCardProps = {
  src: string;
  onDownload: () => Promise<Blob>;
};

export default function HoverActionCard({
  src,
  onDownload,
}: Readonly<HoverActionCardProps>) {
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { handleDownload, loading } = useFileDownload({
    onDownload,
    onSuccess: () => {},
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

  return (
    <StyledCard>
      <CardMedia component="img" image={src} alt="avatar" />

      <Overlay>
        {/* Top Row */}
        <ActionGroup>
          <FloatingButton size="small">
            <CheckIcon />
          </FloatingButton>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <FloatingButton size="small">
              <ShareIcon />
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

        {/* Bottom Row */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FloatingButton size="small">
            <CropFreeIcon />
          </FloatingButton>
        </Box>
      </Overlay>
      {SnackbarComponent}
    </StyledCard>
  );
}
