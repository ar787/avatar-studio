import Container from '@mui/material/Container';
import { Outlet, createRootRouteWithContext } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/react-router-devtools';

import type { AuthState } from '../types/auth';

type RouterContext = {
  auth: AuthState;
};

export const Route = createRootRouteWithContext<RouterContext>()({
  component: RootComponent,
});

function RootComponent() {
  return (
    <Container fixed maxWidth={false}>
      <Outlet />
      <TanStackRouterDevtools position="bottom-right" />
    </Container>
  );
}
