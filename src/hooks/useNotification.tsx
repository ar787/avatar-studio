import { useAppDispatch } from '@/store/hooks';
import { addNotification } from '@/store/notification/notificationSlice';

export type NotificationAPI = {
  success: (message: string) => void;
  info: (message: string) => void;
  error: (message: string) => void;
  warning: (message: string) => void;
};

export function useNotification() {
  const dispatch = useAppDispatch();
  const notify = {
    success: (message: string) => {
      dispatch(addNotification({ severity: 'success', message }));
    },
    info: (message: string) => {
      dispatch(addNotification({ severity: 'info', message }));
    },
    error: (message: string) => {
      dispatch(addNotification({ severity: 'error', message }));
    },
    warning: (message: string) => {
      dispatch(addNotification({ severity: 'warning', message }));
    },
  };

  return notify;
}
