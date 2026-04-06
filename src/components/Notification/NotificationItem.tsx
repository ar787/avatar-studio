import { useState, useMemo, type ReactNode } from 'react';
import {
  Snackbar,
  Alert,
  type AlertColor,
  type SnackbarProps,
} from '@mui/material';

type NotificationItemProps = {
  message: string;
  severity?: AlertColor;
  duration?: number;
  action?: ReactNode;
  anchorOrigin?: SnackbarProps['anchorOrigin'];
  onClose?: () => void;
};

export default function NotificationItem({
  message,
  severity = 'info',
  duration = 3000,
  action,
  anchorOrigin = { vertical: 'top', horizontal: 'right' },
  onClose = () => {},
}: Readonly<NotificationItemProps>) {
  const [open, setOpen] = useState(true);
  const slotProps = useMemo(
    () => ({ transition: { onExited: () => onClose() } }),
    [onClose],
  );

  const handleClose: SnackbarProps['onClose'] = (_, reason) => {
    if (reason === 'clickaway') return;
    setOpen(false);
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={duration}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
      slotProps={slotProps}
    >
      <Alert severity={severity} variant="filled" action={action}>
        {message}
      </Alert>
    </Snackbar>
  );
}
