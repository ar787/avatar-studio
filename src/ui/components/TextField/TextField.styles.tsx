import MuiTextField from '@mui/material/TextField';
import { styled, keyframes } from '@mui/material/styles';
import { type TextFieldProps } from './TextField';

const gradientAnimation = keyframes`
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
`;

const neonBorderBefore = (animate: TextFieldProps['animate']) => ({
  content: '""',
  position: 'absolute',
  background: 'linear-gradient(270deg, #6A1B9A, #FF4081, #7C4DFF, #6A1B9A)',
  backgroundPosition: animate ? undefined : '100% 50%',
  backgroundSize: '600% 600%',
  animation: animate ? `${gradientAnimation} 4s ease infinite` : 'none',
  pointerEvents: 'none',
  zIndex: 0,
});

export const StyledTextField = styled(MuiTextField)<TextFieldProps>(({
  theme,
  animate,
}) => {
  return {
    '& .MuiOutlinedInput-root': {
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
      // paddingRight: 0,
      '& fieldset': { border: '2px solid transparent' },
      '&:hover fieldset, &.Mui-focused fieldset': {
        borderColor: 'transparent',
      },
      '&::before': {
        ...neonBorderBefore(animate),
        top: -2,
        left: -2,
        right: -2,
        bottom: -2,
        borderRadius: 10,
        padding: 2,
        mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMask:
          'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        maskComposite: 'exclude',
        WebkitMaskComposite: 'destination-out',
      },
    },

    '& .MuiInputBase-input': {
      position: 'relative',
      borderRadius: 8,
      zIndex: 1,
    },

    '& .MuiFormHelperText-root': {
      color: '#fff',
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: theme.palette.error.light,
    },
  };
});
