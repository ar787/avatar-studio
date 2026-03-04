import { useEffect, useMemo } from 'react';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from './routeTree.gen';

import { useAuth } from './hooks/useAuth';
import './index.css';

// Set up a Router instance
const router = createRouter({
  routeTree,
  defaultPreload: 'intent',
  scrollRestoration: true,
  context: {
    auth: undefined!,
  },
});

// Register things for type safety
declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  const auth = useAuth();
  const context = useMemo(() => ({ auth }), [auth]);

  useEffect(() => {
    router.invalidate();
  }, [auth.currentUser, auth.isInitialLoading]);

  return <RouterProvider router={router} context={context} />;
}
