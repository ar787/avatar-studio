import { type AlertColor, type SnackbarProps } from '@mui/material';

export type BaseNotification = {
  message: string;
  severity: AlertColor;
};

export type Notification = {
  id: string;
  duration?: number;
  action?: React.ReactNode;
  anchorOrigin?: SnackbarProps['anchorOrigin'];
} & BaseNotification;

export type NotificationWithoutId = Omit<Notification, 'id'>;
