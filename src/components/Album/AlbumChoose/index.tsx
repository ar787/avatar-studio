import { useEffect, useState } from 'react';
import AlbumChooseDialog from './AlbumChooseDialog';
import { getAlbums, addToAlbum, createAlbum } from '@/services/api/album.api';
import type { Album } from '@/types/album';

type AlbumChooseProps = {
  open: boolean;
  onClose: () => void;
  avatarId: string;
};

export default function AlbumChoose({
  open,
  onClose,
  avatarId,
}: Readonly<AlbumChooseProps>) {
  const [albums, setAlbums] = useState<Album[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (open) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setLoading(true);
      getAlbums()
        .then(setAlbums)
        .finally(() => setLoading(false));
    }
  }, [open]);

  return (
    <AlbumChooseDialog
      open={open}
      onClose={onClose}
      albums={albums}
      albumsLoading={loading}
      onConfirm={async (albumId) => await addToAlbum(albumId, avatarId)}
      onCreateNewAlbum={async (name) => {
        const newAlbum = await createAlbum(name);
        setAlbums((prev) => [...prev, newAlbum]);
        return newAlbum;
      }}
    />
  );
}
