import { Box, ListItem, ListItemButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useState } from 'react';
import TextField from '@/ui/components/TextField';
import { useNotification } from '@/hooks';

type AlbumChooseNewAlbumProps = {
  onNewAlbum: (name: string) => Promise<void>;
  onOpen?: () => void;
};

export default function AlbumChooseNewAlbum({
  onNewAlbum,
  onOpen = () => {},
}: Readonly<AlbumChooseNewAlbumProps>) {
  const [isNewAlbum, setIsNewAlbum] = useState(false);
  const [albumName, setAlbumName] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const handleSubmit = async () => {
    if (albumName.trim()) {
      setLoading(true);
      try {
        await onNewAlbum(albumName.trim());
      } catch {
        notify.error('Failed to create album. Please try again.');
      } finally {
        setLoading(false);
      }
    }
    setIsNewAlbum(false);
    setAlbumName('');
  };

  return (
    <ListItem>
      {isNewAlbum ? (
        <Box sx={{ height: '68px', width: '100%' }}>
          <TextField
            autoFocus
            fullWidth
            placeholder="Album name"
            value={albumName}
            disabled={loading}
            onChange={(e) => setAlbumName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !loading) {
                handleSubmit();
              }
              if (e.key === 'Escape') {
                setIsNewAlbum(false);
                setAlbumName('');
              }
            }}
            onBlur={handleSubmit}
          />
        </Box>
      ) : (
        <ListItemButton
          onClick={() => {
            setIsNewAlbum(true);
            onOpen();
          }}
          sx={(theme) => ({
            borderRadius: 2,
            border: '2px dashed',
            borderColor: theme.palette.divider,
            '&:hover': {
              backgroundColor: theme.palette.customAction.menuHover,
            },
          })}
        >
          <Box
            sx={{
              borderRadius: 2,
              opacity: 0.4,
              backgroundColor: (theme) => theme.palette.action.hover,
              height: '50px',
              width: '50px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              marginRight: 1,
            }}
          >
            <AddIcon />
          </Box>
          <Typography> New album</Typography>
        </ListItemButton>
      )}
    </ListItem>
  );
}
