import { useEffect, useState } from 'react';

import { Grid } from '@mui/material';
import Box from '@mui/material/Box';

import {
  getAlbums,
  createAlbum,
  updateAlbum,
  deleteAlbum,
} from '@/services/api/album.api';

import { type Album } from '@/types/album';
import Albums from '@/components/Album/Albums';
import AlbumCreation from '@/components/Album/AlbumCreation';
import { useNotification } from '@/hooks';

function AlbumsPage() {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(true);
  const notify = useNotification();

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        setLoading(true);
        const res = await getAlbums();
        setAlbums(res);
      } catch (err) {
        notify.error(
          err instanceof Error ? err.message : 'Failed to load albums',
        );
      } finally {
        setLoading(false);
      }
    };
    fetchAlbums();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleOnCreate = async (value: string) => {
    const newAlbum = await createAlbum(value);
    setAlbums((prev) => [...prev, newAlbum]);
  };

  const handleRename = async (id: string, name: string) => {
    try {
      const updated = await updateAlbum(id, name);
      setAlbums((prev) => prev.map((a) => (a.id === id ? updated : a)));
    } catch (err) {
      notify.error(
        err instanceof Error ? err.message : 'Failed to rename album',
      );
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteAlbum(id);
      setAlbums((prev) => prev.filter((a) => a.id !== id));
    } catch (err) {
      notify.error(
        err instanceof Error ? err.message : 'Failed to delete album',
      );
    }
  };
  return (
    <Box sx={{ paddingTop: 5 }}>
      <h1>Albums</h1>

      {loading ? (
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
