import { useState } from 'react';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContentText from '@mui/material/DialogContentText';
import { useNotification } from '@/hooks';

import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

import Dialog from '@ui/components/Dialog';
import Button from '@ui/components/Button';

import {
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Radio,
  RadioGroup,
} from '@mui/material';
import type { Album } from '@/types/album';
import AlbumChooseNewAlbum from './AlbumChooseNewAlbum';

type AlbumChooseDialogProps = {
  open: boolean;
  albums: Album[];
  albumsLoading: boolean;
  onClose: () => void;
  onConfirm: (value: string) => Promise<unknown>;
  onCreateNewAlbum: (name: string) => Promise<Album>;
};

export default function AlbumChooseDialog({
  open,
  albums = [],
  albumsLoading = false,
  onClose,
  onConfirm,
  onCreateNewAlbum,
}: Readonly<AlbumChooseDialogProps>) {
  const [selectedValue, setSelectedValue] = useState('');
  const [loading, setLoading] = useState(false);
  const notify = useNotification();

  const handleOnClose = () => {
    onClose();
    setSelectedValue('');
  };

  const handleOnConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(selectedValue);
      handleOnClose();
      notify.success('Avatar added to album successfully!');
    } catch (error: unknown) {
      const message =
        error instanceof Error &&
        error.message === 'Avatar is already in this album'
          ? error.message
          : 'Failed to add avatar to album. Please try again.';

      notify.error(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      fullWidth
      disableRestoreFocus
      maxWidth="xs"
    >
      <DialogTitle>Add to album</DialogTitle>
      <DialogContent sx={{ pt: 2 }}>
        <DialogContentText>Pick where to save this avatar</DialogContentText>
        {albumsLoading ? (
          <Box sx={{ py: 3, textAlign: 'center' }}>
            <Typography variant="body2" color="textSecondary">
              Loading albums...
            </Typography>
          </Box>
        ) : (
          <RadioGroup
            value={selectedValue}
            onChange={(event) => {
              setSelectedValue(event.target.value);
            }}
          >
            <List>
              {albums.map((album) => {
                const isSelected = selectedValue === album.id;
                return (
                  <ListItem key={album.id}>
                    <ListItemButton
                      selected={isSelected}
                      role={undefined}
                      onClick={() => setSelectedValue(album.id)}
                      disableRipple
                      sx={(theme) => ({
                        borderRadius: 2,
                        border: `1px solid transparent`,
                        transition: 'border 0.5s',
                        '&:hover': {
                          backgroundColor: theme.palette.customAction.menuHover,
                        },
                        '&.Mui-selected': {
                          border: `1px solid ${theme.palette.primary.light}`,
                        },
                      })}
                    >
                      <ListItemText>{album.name}</ListItemText>
                      <Radio
                        disableRipple
                        checked={isSelected}
                        value={album.id}
                        checkedIcon={<CheckCircleIcon />}
                      />
                    </ListItemButton>
                  </ListItem>
                );
              })}
              <AlbumChooseNewAlbum
                onOpen={() => setSelectedValue('')}
                onNewAlbum={async (name) => {
                  const newAlbum = await onCreateNewAlbum(name);
                  setSelectedValue(newAlbum.id);
                }}
              />
            </List>
          </RadioGroup>
        )}
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button disabled={!selectedValue || loading} onClick={handleOnConfirm}>
          {loading ? 'Adding...' : 'Add to album'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
