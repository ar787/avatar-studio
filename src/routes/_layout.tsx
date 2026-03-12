import { createFileRoute, Outlet } from '@tanstack/react-router';
import HeaderBar from '../components/HeaderBar';
import Container from '@mui/material/Container';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <HeaderBar />
      <Container fixed maxWidth={false}>
        <Outlet />
      </Container>
    </>
  );
}
