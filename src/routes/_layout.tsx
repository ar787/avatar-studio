import { createFileRoute, Outlet } from '@tanstack/react-router';
import HeaderBar from '../components/HeaderBar';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeaderBar />
      <Outlet />
    </>
  );
}
