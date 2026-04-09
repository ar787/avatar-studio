import { createContext } from 'react';
import type {
  Notification,
  NotificationContext as NotificationContextType,
} from '@/types/notification';

export const NotificationContext = createContext<NotificationContextType>({
  notifications: [] as Notification[],
  addNotification: () => {
    throw new Error(
      'addNotification must be used within a NotificationProvider',
    );
  },
  removeNotification: () => {
    throw new Error(
      'removeNotification must be used within a NotificationProvider',
    );
  },
});
