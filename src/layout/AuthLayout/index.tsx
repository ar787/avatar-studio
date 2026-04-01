import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import type React from 'react';

type AuthLayoutProps = {
  children: React.ReactNode;
  submitAction: React.ReactNode;
  footer: React.ReactNode;
  title: string;
};
export default function AuthLayout({
  title,
  submitAction,
  footer,
  children,
}: AuthLayoutProps) {
  return (
    <Box
      sx={{
        background:
          'linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.62) 100%), rgb(70,70,70)',
      }}
    >
      <Container
        disableGutters
        sx={{
          height: '100vh',
          minHeight: 'calc(100vh - 74px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'relative',
          px: { xs: 2, sm: 3 },
          py: { xs: 2, sm: 4 },
        }}
      >
        <Paper
          sx={{
            minWidth: 480,
            p: 4,
            borderRadius: '24px',
            backgroundColor: 'rgba(255,255,255,0.05)',
            border: '1px solid rgba(255,255,255,0.1)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 8px 32px rgba(0,0,0,0.3)',
          }}
        >
          <Stack spacing={4}>
            <Typography variant="h2" color="#fff" textAlign="center">
              {title}
            </Typography>
            {children}
            <Stack spacing={1}>
              {submitAction}
              {footer}
            </Stack>
          </Stack>
        </Paper>
      </Container>
    </Box>
  );
}
