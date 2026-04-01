import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';
import { type TextFieldProps } from './TextField';

// const gradientAnimation = keyframes`
//   0% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
//   100% { background-position: 0% 50%; }
// `;

// const neonBorderBefore = (animate: TextFieldProps['animate']) => ({
//   content: '""',
//   position: 'absolute',
//   background: 'linear-gradient(270deg, #6A1B9A, #FF4081, #7C4DFF, #6A1B9A)',
//   backgroundPosition: animate ? undefined : '100% 50%',
//   backgroundSize: '600% 600%',
//   animation: animate ? `${gradientAnimation} 4s ease infinite` : 'none',
//   pointerEvents: 'none',
//   zIndex: 0,
// });

export const StyledTextField = styled(MuiTextField)<TextFieldProps>(({
  theme,
}) => {
  return {
    '& .MuiOutlinedInput-root': {
      backgroundColor: 'rgba(255, 255, 255, 0.05)',
      '& fieldset': {
        borderColor: theme.palette.primary.light,
        transition: theme.transitions.create(['border-color']),
        borderWidth: '2px',
        borderRadius: '8px',
      },
      '&:hover fieldset': {
        borderColor: theme.palette.primary.light,
      },
      '&.Mui-focused fieldset': {
        borderColor: theme.palette.primary.main,
        borderWidth: '2px',
      },
      '&:hover': {
        backgroundColor: 'rgba(255, 255, 255, 0.09)',
      },
    },
    '& .MuiInputBase-input': {
      color: theme.palette.primary.contrastText,
    },

    '& .MuiFormHelperText-root': {
      color: theme.palette.primary.contrastText,
    },
    '& .MuiFormHelperText-root.Mui-error': {
      color: theme.palette.error.light,
    },
  };
});
