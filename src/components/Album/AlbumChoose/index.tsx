import AlbumChooseDialog from './AlbumChooseDialog';
import {
  useAddAvatarToAlbum,
  useAlbums,
  useCreateAlbum,
} from '@/hooks/queries/albums';

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
  const { albums, isLoading } = useAlbums();
  const { addAvatarToAlbum } = useAddAvatarToAlbum();
  const { create } = useCreateAlbum();

  return (
    <AlbumChooseDialog
      open={open}
      onClose={onClose}
      albums={albums}
      albumsLoading={isLoading}
      onConfirm={async (albumId) =>
        await addAvatarToAlbum({ id: albumId, avatarId })
      }
      onCreateNewAlbum={async (name) => {
        const newAlbum = await create(name);
        return newAlbum;
      }}
    />
  );
}
