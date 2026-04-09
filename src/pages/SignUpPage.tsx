import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import Stack from '@mui/material/Stack';
import Divider from '@mui/material/Divider';

import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import Link from '@ui/components/Link';
import GoogleSignInButton from '@/components/GoogleSignInButton';
import { useNotification, useAuthForm, useAuth } from '@hooks';
import AuthLayout from '@/layout/AuthLayout';

export default function SignUpPage() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();
  const { signUp } = useAuth();
  const { values, errors, loading, submit, setField } = useAuthForm({
    inputValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    extraValidation: (values) => ({
      email: [
        [!values.email.includes('@'), 'Invalid email format'],
        [values.email.endsWith('.temp'), 'Temporary emails are not allowed'],
      ],
      confirmPassword: [
        values.confirmPassword !== values.password,
        'Passwords do not match',
      ],
    }),
    authAction: signUp,
    onSuccess: () => {
      navigate({ to: '/' });
    },
    onUnexpectedError: () =>
      addNotification({
        severity: 'error',
        message: 'Something went wrong. Please try again later.',
      }),
  });

  const submitAction = (
    <Button onClick={submit} loading={loading} size="large">
      Sign Up
    </Button>
  );

  const footer = (
    <Typography color="#fff">
      Already have an account? <Link to="/sign-in">Sign in</Link>
    </Typography>
  );

  return (
    <AuthLayout title="Sign Up" submitAction={submitAction} footer={footer}>
      <GoogleSignInButton title="Continue with Google" />
      <Divider />
      <Stack spacing={2}>
        <TextField
          placeholder="Email Address *"
          type="email"
          value={values.email}
          helperText={errors.email}
          error={errors.email.length !== 0}
          onChange={(e) => {
            setField('email', e.target.value);
          }}
        />
        <TextField
          placeholder="Password *"
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
        <TextField
          placeholder="Confirm password *"
          type={toggle ? 'text' : 'password'}
          value={values.confirmPassword}
          onChange={(e) => {
            setField('confirmPassword', e.target.value);
          }}
          helperText={errors.confirmPassword}
          error={errors.confirmPassword.length !== 0}
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
      </Stack>
    </AuthLayout>
  );
}
