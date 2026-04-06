import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import type { Notification } from '../../types/notification';
import NotificationItem from './NotificationItem';
import { useNotification } from '@hooks/useNotification';

type NotificationListProps = {
  notifications: Notification[];
};

export default function NotificationItemList({
  notifications,
}: Readonly<NotificationListProps>) {
  const { removeNotification } = useNotification();
  const notificationRootId = useMemo(
    () => document.getElementById('notifications-root'),
    [],
  );

  const handleClose = useCallback(
    (id: Notification['id']) => {
      removeNotification(id);
    },
    [removeNotification],
  );

  if (notificationRootId === null) return null;

  return createPortal(
    <>
      {notifications.map((notification) => (
        <NotificationItem
          key={notification.id}
          {...notification}
          onClose={() => handleClose(notification.id)}
        />
      ))}
    </>,
    notificationRootId,
  );
}
