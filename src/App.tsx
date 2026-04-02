import { useEffect, useMemo } from 'react';
import { RouterProvider } from '@tanstack/react-router';

import router from './router';
import { useAuth } from '@hooks/useAuth';
import './index.css';

export default function App() {
  const auth = useAuth();
  const context = useMemo(() => ({ auth }), [auth]);

  useEffect(() => {
    router.invalidate();
  }, [auth.currentUser, auth.isInitialLoading]);

  return <RouterProvider router={router} context={context} />;
}
