import { useState } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';

import Dialog from '@ui/components/Dialog';
import TextField from '@ui/components/TextField';
import Button from '@ui/components/Button';

import { useNotification } from '@/hooks';

type AlbumCreationDialogProps = {
  open: boolean;
  onClose: () => void;
  onCreate: (value: string) => Promise<unknown>;
};

export default function AlbumCreationDialog({
  open,
  onClose,
  onCreate,
}: Readonly<AlbumCreationDialogProps>) {
  const [value, setValue] = useState('');
  const notify = useNotification();
  const handleOnClose = () => {
    onClose();
    setValue('');
  };
  const handleCreateAlbum = async () => {
    if (!value.trim()) {
      notify.error('Album name cannot be empty');
      return;
    }
    try {
      await onCreate(value);
      handleOnClose();
      notify.success('Album successfully has created');
    } catch {
      notify.error('Something went wrong');
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
      <DialogTitle>Create Album</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          autoFocus
          label="New album"
          variant="outlined"
          value={value}
          sx={{ mt: 1 }}
          onChange={(e) => setValue(e.target.value)}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button onClick={handleCreateAlbum} disabled={!value.trim()}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
}
