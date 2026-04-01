import { createFileRoute, Outlet } from '@tanstack/react-router';
import HeaderBar from '../components/HeaderBar';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <Box
        sx={{
          background:
            'linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.62) 100%), rgb(70,70,70)',
        }}
      >
        <HeaderBar />
        <Container
          fixed
          maxWidth={false}
          sx={{
            minHeight: '100vh',
            position: 'relative',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 4 },
          }}
        >
          <Outlet />
        </Container>
      </Box>
    </>
  );
}
