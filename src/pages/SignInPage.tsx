import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import Container from '@mui/material/Container';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import Link from '@ui/components/Link';

import { useAuthForm } from '@hooks/useAuthForm';
import { useSnackbar } from '@hooks/useSnackbar';
import { useAuth } from '@hooks/useAuth';

export default function SignInPage() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { signIn } = useAuth();
  const { values, errors, loading, submit, setField } = useAuthForm({
    inputValues: {
      email: '',
      password: '',
    },
    extraValidation: (values) => ({
      email: [
        [!values.email.includes('@'), 'Invalid email format'],
        [values.email.endsWith('.temp'), 'Temporary emails are not allowed'],
      ],
    }),
    authAction: signIn,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onUnexpectedError: () =>
      showSnackbar({
        severity: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: 'Something went wrong. Please try again later.',
      }),
  });

  return (
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
        background:
          'linear-gradient(0deg, rgba(0,0,0,0.62) 0%, rgba(0,0,0,0.62) 100%), rgb(70,70,70)',
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
            Sign In
          </Typography>

          <Stack spacing={2}>
            <TextField
              placeholder="Email"
              type="email"
              value={values.email}
              helperText={errors.email}
              error={errors.email.length !== 0}
              onChange={(e) => setField('email', e.target.value)}
            />

            <TextField
              required
              placeholder="Password"
              type={toggle ? 'text' : 'password'}
              value={values.password}
              helperText={errors.password}
              error={errors.password.length !== 0}
              onChange={(e) => setField('password', e.target.value)}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={() => setToggle((p) => !p)}>
                      {toggle ? (
                        <VisibilityOffOutlinedIcon />
                      ) : (
                        <VisibilityOutlinedIcon />
                      )}
                    </IconButton>
                  ),
                },
              }}
            />
          </Stack>

          <Stack spacing={1}>
            <Button onClick={submit} loading={loading}>
              Sign In
            </Button>

            <Typography color="#fff">
              Do not have an account? <Link to="/sign-up">Sign up</Link>
            </Typography>
          </Stack>
        </Stack>
      </Paper>

      {SnackbarComponent}
    </Container>
  );
}
