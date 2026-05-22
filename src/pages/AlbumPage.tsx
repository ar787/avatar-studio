import Box from '@mui/material/Box';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { useEffect, useState } from 'react';
import {
  getAlbum,
  updateAlbum,
  deleteAvatarFromAlbum,
} from '@/services/api/album.api';
import { useParams } from '@tanstack/react-router';
import type { Album, GetAlbumApiReturn } from '@/types/album';
import { downloadAvatarFromAlbum } from '@/services/api/download.api';

import type { AvatarType } from '@/types/avatar';
import { Grid, type GridBaseProps } from '@mui/material';
import Button from '@/ui/components/Button';
import AlbumRenameDialog from '@/components/Album/AlbumRenameDialog';
import { useNotification } from '@/hooks';
import AvatarActionCard from '@/components/AvatarActionCard';

const size: GridBaseProps['size'] = { xs: 4, md: 4, lg: 2 };

export default function AlbumPage() {
  const { albumId } = useParams({ from: '/_layout/albums/$albumId' });
  const [data, setData] = useState<GetAlbumApiReturn>({
    albumMetadata: {} as Album,
    avatars: [],
  });

  const [openRename, setOpenRename] = useState(false);
  const notify = useNotification();

  useEffect(() => {
    const fetchAlbum = async () => {
      const result = await getAlbum(albumId);
      setData(result);
    };
    fetchAlbum();
  }, [albumId]);

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
        {data?.albumMetadata.name}
      </Button>
      <Grid container spacing={2} sx={{ mt: 4 }}>
        {data?.avatars.map((avatar) => {
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
                onDelete={async () => {
                  await deleteAvatarFromAlbum(albumId, avatar.id);
                  setData((prev) => {
                    const newAvatars = data.avatars.filter(
                      (el) => el.id !== avatar.id,
                    );
                    return {
                      albumMetadata: { ...prev.albumMetadata },
                      avatars: newAvatars,
                    };
                  });
                }}
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
        initialName={data.albumMetadata.name ?? ''}
        onConfirm={(name) =>
          updateAlbum(data.albumMetadata.id, name).then((res) => {
            setData((prev) => ({ ...prev, albumMetadata: res }));
            notify.success('Album renamed successfully!');
          })
        }
      />
    </Box>
  );
}
