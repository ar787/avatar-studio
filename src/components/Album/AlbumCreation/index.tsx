import { useState } from 'react';
import AlbumCreationDialog from './AlbumCreationDialog';
import NewAlbum from './NewAlbum';

type AlbumCreationProps = {
  onCreate: (value: string) => Promise<unknown>;
};
export default function AlbumCreation({
  onCreate,
}: Readonly<AlbumCreationProps>) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <NewAlbum onClick={() => setOpen(true)} />
      <AlbumCreationDialog
        open={open}
        onClose={() => setOpen(false)}
        onCreate={onCreate}
      />
    </>
  );
}
