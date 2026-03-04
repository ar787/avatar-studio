import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { useAuthForm } from '../hooks/useAuthForm';
import { useSnackbar } from '../hooks/useSnackbar';

export default function SignUp() {
  const [toggle, setToggle] = useState(false);
  const { showSnackbar, SnackbarComponent } = useSnackbar();
  const { values, errors, loading, submit, setField } = useAuthForm({
    onUnexpectedError: () =>
      showSnackbar({
        severity: 'error',
        anchorOrigin: { horizontal: 'right', vertical: 'top' },
        message: 'Some thing went wrong',
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
          Create My Avatar
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
            Sign Up
          </Button>
        </Box>
      </Box>
      {SnackbarComponent}
    </Container>
  );
}
