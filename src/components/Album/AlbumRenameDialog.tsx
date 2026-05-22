import { useRef, useState } from 'react';
import { DialogTitle, DialogContent, DialogActions } from '@mui/material';
import Dialog from '@ui/components/Dialog';
import Button from '@ui/components/Button';
import TextField from '@/ui/components/TextField';

type AlbumRenameDialogProps = {
  open: boolean;
  initialName: string;
  onClose: () => void;
  onConfirm: (name: string) => Promise<void>;
};

export default function AlbumRenameDialog({
  open,
  initialName,
  onClose,
  onConfirm,
}: Readonly<AlbumRenameDialogProps>) {
  const [name, setName] = useState(initialName);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleOnClose = () => {
    onClose();
    setName(initialName);
  };
  const handleConfirm = async () => {
    if (!name.trim() || name.trim() === initialName) {
      onClose();
      return;
    }
    setLoading(true);
    try {
      await onConfirm(name.trim());
      onClose();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog
      open={open}
      onClose={handleOnClose}
      maxWidth="xs"
      fullWidth
      slotProps={{ transition: { onEntered: () => inputRef.current?.focus() } }}
    >
      <DialogTitle>Rename album</DialogTitle>
      <DialogContent>
        <TextField
          inputRef={inputRef}
          fullWidth
          label="Album name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') handleConfirm();
            if (e.key === 'Escape') onClose();
          }}
          sx={{ mt: 1 }}
        />
      </DialogContent>
      <DialogActions>
        <Button variant="text" onClick={handleOnClose}>
          Cancel
        </Button>
        <Button disabled={!name.trim() || loading} onClick={handleConfirm}>
          {loading ? 'Saving...' : 'Save'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}
