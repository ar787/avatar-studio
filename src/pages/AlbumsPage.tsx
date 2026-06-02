import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import Albums from '@/components/Album/Albums';
import AlbumCreation from '@/components/Album/AlbumCreation';
import { PageHeader } from '@/components/PageHeader';
import { useNotification } from '@/hooks';
import {
  useAlbums,
  useCreateAlbum,
  useRenameAlbum,
  useDeleteAlbum,
} from '@/hooks/queries/albums';

function AlbumsPage() {
  const { albums, isLoading } = useAlbums();
  const { create } = useCreateAlbum();
  const { rename } = useRenameAlbum();
  const { remove } = useDeleteAlbum();
  const notify = useNotification();

  const handleOnCreate = async (value: string) => {
    try {
      await create(value);
    } catch (err) {
      notify.error(
        err instanceof Error ? err.message : 'Failed to create album',
      );
    }
  };

  const handleRename = async (id: string, name: string) => {
    try {
      await rename({ id, name });
    } catch (err) {
      notify.error(
        err instanceof Error ? err.message : 'Failed to rename album',
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await remove(id);
    } catch (err) {
      notify.error(
        err instanceof Error ? err.message : 'Failed to delete album',
      );
    }
  };

  return (
    <Box sx={{ paddingTop: 5 }}>
      <PageHeader title="Albums" />

      {isLoading ? (
        <Box sx={{ p: 2 }}>Loading albums...</Box>
      ) : (
        <Grid container spacing={2}>
          <Grid>
            <AlbumCreation onCreate={handleOnCreate} />
          </Grid>
          <Albums
            albums={albums}
            onRename={handleRename}
            onDelete={handleDelete}
          />
        </Grid>
      )}
    </Box>
  );
}
export default AlbumsPage;
