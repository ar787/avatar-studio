import { type AlertColor, type SnackbarProps } from '@mui/material';

export type Notification = {
  id: string;
  message: string;
  severity: AlertColor;
  duration?: number;
  action?: React.ReactNode;
  anchorOrigin?: SnackbarProps['anchorOrigin'];
};
export type NotificationWithoutId = Omit<Notification, 'id'>;

export type NotificationContext = {
  notifications: Notification[];
  addNotification: (notification: NotificationWithoutId) => void;
  removeNotification: (id: string) => void;
};
