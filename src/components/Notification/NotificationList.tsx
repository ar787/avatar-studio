import { useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';

import type { Notification } from '../../types/notification';
import NotificationItem from './NotificationItem';

import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { selectNotifications } from '@/store/notification/notificationSelectors';
import { removeNotification } from '@/store/notification/notificationSlice';

export default function NotificationItemList() {
  const notificationRootId = useMemo(
    () => document.getElementById('notifications-root'),
    [],
  );
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const handleClose = useCallback(
    (id: Notification['id']) => {
      dispatch(removeNotification(id));
    },
    [dispatch],
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
