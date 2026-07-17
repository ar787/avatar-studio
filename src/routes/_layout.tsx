import { useState } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import Box from '@mui/material/Box';
import { useMediaQuery, useTheme } from '@mui/material';

import HeaderBar from '@/components/HeaderBar';
import Sidebar from '@/components/Sidebar';

export const Route = createFileRoute('/_layout')({
  component: RouteComponent,
});

function RouteComponent() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        overflow: 'hidden',
        bgcolor: '#181e1f',
      }}
    >
      <HeaderBar onToggleSidebar={() => setSidebarOpen((prev) => !prev)} />
      <Box sx={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <Box
          component="main"
          sx={{
            flex: 1,
            minWidth: 0,
            overflowY: 'auto',
            px: { xs: 2, sm: 3 },
            py: { xs: 2, sm: 4 },
            ...(isMobile && sidebarOpen && { pointerEvents: 'none' }),
          }}
        >
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}
