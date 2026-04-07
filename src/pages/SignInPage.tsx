import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';

import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import Link from '@ui/components/Link';

import { useAuthForm } from '@hooks/useAuthForm';
import { useNotification } from '@hooks/useNotification';
import { useAuth } from '@hooks/useAuth';
import AuthLayout from '@/layout/AuthLayout';

export default function SignInPage() {
  const [toggle, setToggle] = useState(false);
  const navigate = useNavigate();
  const { addNotification } = useNotification();
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
      addNotification({
        severity: 'error',
        message: 'Something went wrong. Please try again later.',
      }),
  });

  const submitAction = (
    <Button onClick={submit} loading={loading} size="large">
      Sign In
    </Button>
  );

  const footer = (
    <Typography color="#fff">
      Do not have an account? <Link to="/sign-up">Sign up</Link>
    </Typography>
  );

  return (
    <AuthLayout title="Sign In" submitAction={submitAction} footer={footer}>
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
    </AuthLayout>
  );
}
