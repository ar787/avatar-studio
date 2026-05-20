import { useEffect, useMemo } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import { useAuth, useNotification } from '@hooks';
import router from '@/router';

import './index.css';
import { initAuthListener } from '@/store/initAuthListener';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import {
  selectAuthUser,
  selectIsInitialLoading,
} from '@/store/auth/authSelectors';

export default function App() {
  const auth = useAuth();
  const notification = useNotification();
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectAuthUser);
  const isInitialLoading = useAppSelector(selectIsInitialLoading);

  const context = useMemo(() => ({ auth, notification }), [auth, notification]);

  useEffect(() => {
    const unsubscribe = initAuthListener(dispatch);
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    router.invalidate();
  }, [user, isInitialLoading]);

  return <RouterProvider router={router} context={context} />;
}
