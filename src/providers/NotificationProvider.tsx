import React, { useMemo, useState } from 'react';
import { NotificationContext } from '../contexts/NotificationContext';
import {
  type Notification,
  type NotificationWithoutId,
} from '@/types/notification';
import NotificationList from '@/components/Notification/NotificationList';

export const NotificationProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const addNotification = (notification: NotificationWithoutId) => {
    const notificationWithId = {
      ...notification,
      id: crypto.randomUUID(),
    };
    setNotifications((prev) => [...prev, notificationWithId]);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const value = useMemo(
    () => ({ notifications, addNotification, removeNotification }),
    [notifications],
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <NotificationList notifications={notifications} />
    </NotificationContext.Provider>
  );
};
