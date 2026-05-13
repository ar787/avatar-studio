import React, { useState, useCallback } from 'react';

import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Skeleton from '@mui/material/Skeleton';
import Tooltip from '@mui/material/Tooltip';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Slide from '@mui/material/Slide';
import { type TransitionProps } from '@mui/material/transitions';

import Dialog from '@ui/components/Dialog';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';

type AvatarCreationDialogProps = {
  open: boolean;
  onClose: () => void;
  onGenerate: (value: string) => Promise<void>;
  loading: boolean;
  previews: string[];
  isAuthenticated: boolean;
  hasCredits: boolean;
};

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<string, string>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export function AvatarCreationDialog({
  open,
  onClose,
  onGenerate,
  loading,
  previews,
  isAuthenticated,
  hasCredits,
}: Readonly<AvatarCreationDialogProps>) {
  const [value, setValue] = useState('');
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };
  const handleClose = () => {
    setValue('');
    onClose();
  };

  const getTooltipTitle = useCallback(() => {
    if (!isAuthenticated) return 'Sign in to generate';
    if (!hasCredits) {
      return 'Insufficient credits';
    }
    return '';
  }, [hasCredits, isAuthenticated]);

  const disabled = (isAuthenticated && !!value.trim() === false) || loading;

  return (
    <Dialog
      open={open}
      slots={{ transition: Transition }}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      fullWidth
      disableRestoreFocus
      maxWidth="lg"
    >
      <DialogTitle>Generate your avatar</DialogTitle>
      <DialogContent>
        <TextField
          value={value}
          onChange={handleChange}
          placeholder="Type a prompt..."
          fullWidth
          autoFocus
        />
        <Grid
          container
          spacing={2}
          direction="row"
          justifyContent={{ xs: 'center', sm: 'flex-start' }}
        >
          {previews.map((preview, index) => (
            <Grid key={preview + index}>
              <Box
                component="img"
                src={preview}
                alt="Generated avatar"
                sx={{
                  mt: 2,
                  borderRadius: '16px',
                  height: '200px',
                  width: '200px',
                }}
              />
            </Grid>
          ))}

          {loading && hasCredits && (
            <Grid>
              <Skeleton
                component="div"
                sx={{
                  bgcolor: 'grey.900',
                  mt: 2,
                  borderRadius: '16px',
                  height: '200px',
                  width: '200px',
                }}
                variant="rectangular"
              />
            </Grid>
          )}
        </Grid>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="text">
          Cancel
        </Button>
        <Tooltip title={getTooltipTitle()}>
          <Button
            onClick={() => onGenerate(value).finally(() => setValue(''))}
            disabled={disabled}
          >
            {loading ? 'Generating...' : 'Generate'}
          </Button>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
}
