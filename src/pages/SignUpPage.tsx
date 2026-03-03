import { useState } from 'react';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import { IconButton, Typography } from '@mui/material';
import Button from '@ui/components/Button';
import TextField from '@ui/components/TextField';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { signUpUser } from '../services/api';
import { useNavigate } from '@tanstack/react-router';

export default function SignUp() {
  const [toggle, setToggle] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const navigate = useNavigate();

  async function signUp() {
    if (email.trim().length === 0 || password.trim().length === 0) {
      return;
    }
    await signUpUser(email, password);

    navigate({ to: '/' });
  }

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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              placeholder="Password"
              type={toggle ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
          <Button onClick={signUp}>Sign Up</Button>
        </Box>
      </Box>
    </Container>
  );
}
