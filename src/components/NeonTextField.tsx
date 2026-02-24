import TextField from '@mui/material/TextField';
import { styled, keyframes } from '@mui/material/styles';

const gradientAnimation = keyframes`
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
`;

const NeonTextField = styled(TextField)(({ theme }) => ({
  position: 'relative',
  borderRadius: 8,
  '& .MuiOutlinedInput-root': {
    position: 'relative',
    borderRadius: 8,
    '& fieldset': {
      border: '2px solid transparent',
    },
    '&:hover fieldset': {
      borderColor: 'transparent',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'transparent',
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: -2,
      left: -2,
      right: -2,
      bottom: -2,
      borderRadius: 10,
      padding: 2,
      background: 'linear-gradient(270deg, #6A1B9A, #FF4081, #7C4DFF, #6A1B9A)',
      backgroundSize: '600% 600%',
      zIndex: 0,
      animation: `${gradientAnimation} 4s ease infinite`,
      pointerEvents: 'none',
      mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      WebkitMask:
        'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
      maskComposite: 'exclude',
      WebkitMaskComposite: 'destination-out',
    },
    '& input': {
      position: 'relative',
      backgroundColor: theme.palette.background.paper,
      borderRadius: 8,
      padding: '12px 16px',
    },
  },
}));

export default NeonTextField;
