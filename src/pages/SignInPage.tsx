import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import Link from '@ui/components/Link';

import { useAuthForm } from '@hooks/useAuthForm';
import { useSnackbar } from '@hooks/useSnackbar';

import { signInUser } from '../services/api';

export default function SignInPage() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { showSnackbar, SnackbarComponent } = useSnackbar();
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
    authAction: signInUser,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onUnexpectedError: () =>
      showSnackbar({
        severity: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: 'Something went wrong',
      }),
  });

  return (
    <Container
      sx={{
        paddingTop: '30vh',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '8px',
        }}
      >
        <Typography variant="h2" color="#fff" align="center">
          Sign In
        </Typography>
        <Box
          sx={{
            width: { xs: '100%', md: '50%' },
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            border: '1px solid transparent',
            position: 'relative',
            padding: 5,
            gap: '16px',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: '10px',
            }}
          >
            <TextField
              placeholder="Email"
              type="email"
              value={values.email}
              helperText={errors.email}
              error={errors.email.length !== 0}
              onChange={(e) => {
                setField('email', e.target.value);
              }}
            />
            <TextField
              placeholder="Password"
              type={toggle ? 'text' : 'password'}
              value={values.password}
              onChange={(e) => {
                setField('password', e.target.value);
              }}
              helperText={errors.password}
              error={errors.password.length !== 0}
              slotProps={{
                input: {
                  endAdornment: (
                    <IconButton onClick={() => setToggle((prev) => !prev)}>
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
          </Box>
          <Button onClick={submit} loading={loading}>
            Sign In
          </Button>
          <Typography color="#fff">
            Do not have an account? <Link to="/sign-up">Sign up</Link>
          </Typography>
        </Box>
      </Box>
      {SnackbarComponent}
    </Container>
  );
}
