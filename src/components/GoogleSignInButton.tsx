import { useNavigate } from '@tanstack/react-router';
import Button from '@ui/components/Button';
import { useNotification } from '@hooks/useNotification';
import { useAuth } from '@hooks/useAuth';
import { GoogleIcon } from '@/ui/icons';
import type { SxProps } from '@mui/material/styles';

type GoogleSignInButtonProps = {
  title: string;
};

const sx: SxProps = {
  justifyContent: 'start',
  gap: '20px',
  backgroundColor: '#e8f0fe',
  color: '#202124',
  fontSize: '16px',
  '&:hover': {
    backgroundColor: '#d1e3fa',
  },
};

export default function GoogleSignInButton({
  title,
}: Readonly<GoogleSignInButtonProps>) {
  const navigate = useNavigate();
  const { signInWithGoogle } = useAuth();
  const { addNotification } = useNotification();

  async function onSignInByGoogle() {
    try {
      await signInWithGoogle();
      navigate({ to: '/' });
    } catch {
      addNotification({
        severity: 'error',
        message: 'Something went wrong. Please try again later.',
      });
    }
  }

  return (
    <Button
      startIcon={<GoogleIcon />}
      size="medium"
      onClick={onSignInByGoogle}
      sx={sx}
    >
      {title}
    </Button>
  );
}
