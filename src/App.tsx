import { useEffect, useMemo } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import { useAuth, useNotification } from '@hooks';
import router from './router';

import './index.css';
export default function App() {
  const auth = useAuth();
  const notification = useNotification();

  const context = useMemo(() => ({ auth, notification }), [auth, notification]);

  useEffect(() => {
    router.invalidate();
  }, [auth.currentUser, auth.isInitialLoading]);

  return <RouterProvider router={router} context={context} />;
}
