import { useState } from 'react';
import type { Album } from '@/types/album';
import { Grid } from '@mui/material';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { Link } from '@tanstack/react-router';
import AlbumCardMenu from './AlbumCardMenu';
import AlbumRenameDialog from '../AlbumRenameDialog';

type AlbumCardProps = {
  album: Album;
  onRename: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function AlbumCard({
  album,
  onRename,
  onDelete,
}: Readonly<AlbumCardProps>) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [renameOpen, setRenameOpen] = useState(false);

  const handleMenuOpen = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleRenameOpen = () => {
    setRenameOpen(true);
    handleMenuClose();
  };

  const handleDeleteClick = () => {
    handleMenuClose();
    onDelete(album.id);
  };

  return (
    <Grid>
      <Link
        to="/albums/$albumId"
        params={{ albumId: album.id }}
        style={{ textDecoration: 'none' }}
      >
        <Card
          sx={(theme) => ({
            width: 250,
            borderRadius: 3,
            overflow: 'hidden',
            border: `1px solid ${theme.palette.modal.border}`,
            backgroundColor: theme.palette.background.paper,
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: theme.shadows[8],
            },
          })}
        >
          <Box
            sx={{
              position: 'relative',
              height: 130,
              background:
                'linear-gradient(135deg, #2d1b69 0%, #6b21a8 60%, #7c3aed 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <PhotoLibraryIcon
              sx={{ fontSize: 56, color: 'rgba(255,255,255,0.75)' }}
            />
            <IconButton
              size="small"
              onClick={handleMenuOpen}
              sx={{
                position: 'absolute',
                top: 6,
                right: 6,
                color: 'rgba(255,255,255,0.85)',
                backgroundColor: 'rgba(0,0,0,0.25)',
                backdropFilter: 'blur(4px)',
                transition: 'background-color 0.2s ease, opacity 0.2s ease',
                '.MuiPaper-root:hover &': {
                  opacity: 1,
                },
              }}
            >
              <MoreHorizIcon fontSize="small" />
            </IconButton>
          </Box>
          <CardContent sx={{ p: 1.5, '&:last-child': { pb: 1.5 } }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography
                variant="subtitle2"
                fontWeight={600}
                noWrap
                title={album.name}
              >
                {album.name}
              </Typography>
              <Typography
                variant="caption"
                fontWeight={600}
                noWrap
                color={album.avatarCount ? undefined : 'textDisabled'}
                title={String(album.avatarCount)}
              >
                {album.avatarCount} images
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Link>

      <AlbumCardMenu
        anchorEl={anchorEl}
        onClose={handleMenuClose}
        onRename={handleRenameOpen}
        onDelete={handleDeleteClick}
      />

      <AlbumRenameDialog
        open={renameOpen}
        initialName={album.name}
        onClose={() => setRenameOpen(false)}
        onConfirm={(name: string) => onRename(album.id, name)}
      />
    </Grid>
  );
}
