import Box from '@mui/material/Box';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useState } from 'react';
import { useParams } from '@tanstack/react-router';
import { downloadAvatarFromAlbum } from '@/services/api/download.api';

import type { AvatarType } from '@/types/avatar';
import { Grid, type GridBaseProps } from '@mui/material';
import Button from '@/ui/components/Button';
import AlbumRenameDialog from '@/components/Album/AlbumRenameDialog';
import { useNotification } from '@/hooks';
import AvatarActionCard from '@/components/AvatarActionCard';
import {
  useAlbum,
  useRenameAlbum,
  useDeleteAvatarFromAlbum,
} from '@/hooks/queries/albums';

const size: GridBaseProps['size'] = { xs: 4, md: 4, lg: 2 };

export default function AlbumPage() {
  const { albumId } = useParams({ from: '/_layout/albums/$albumId' });
  const { album } = useAlbum(albumId);
  const { rename } = useRenameAlbum();
  const { removeAvatar } = useDeleteAvatarFromAlbum(albumId);
  const [openRename, setOpenRename] = useState(false);
  const notify = useNotification();

  return (
    <Box sx={{ paddingTop: 5 }}>
      <Button
        variant="text"
        startIcon={<FolderOpenIcon />}
        size="small"
        sx={{
          fontSize: 20,
          '& > .MuiButton-startIcon>*:nth-of-type(1)': {
            fontSize: 25,
          },
        }}
        onClick={() => setOpenRename(true)}
      >
        {album?.albumMetadata.name}
      </Button>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {album?.avatars.map((avatar) => {
          const newAvatar: AvatarType = {
            imageUrl: avatar.url as AvatarType['imageUrl'],
            name: 'avatar name',
            createdAt: avatar.createdAt as unknown as AvatarType['createdAt'],
          };
          return (
            <Grid key={avatar.id} size={size}>
              <AvatarActionCard
                name={newAvatar.name}
                src={newAvatar.imageUrl}
                onDelete={() => removeAvatar(avatar.id)}
                onDownload={() => downloadAvatarFromAlbum(albumId, avatar.id)}
              />
            </Grid>
          );
        })}
      </Grid>
      <AlbumRenameDialog
        key={openRename ? 1 : 0}
        open={openRename}
        onClose={() => setOpenRename(false)}
        initialName={album?.albumMetadata.name ?? ''}
        onConfirm={async (name) => {
          await rename({ id: albumId, name });
          notify.success('Album renamed successfully!');
          setOpenRename(false);
        }}
      />
    </Box>
  );
}
