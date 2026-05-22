import type { Album } from '@/types/album';
import AlbumCard from './AlbumCard';

type AlbumsProps = {
  albums: Album[];
  onRename: (id: string, name: string) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
};

export default function Albums({
  albums,
  onRename,
  onDelete,
}: Readonly<AlbumsProps>) {
  return albums.map((album) => (
    <AlbumCard
      key={album.id}
      album={album}
      onRename={onRename}
      onDelete={onDelete}
    />
  ));
}
