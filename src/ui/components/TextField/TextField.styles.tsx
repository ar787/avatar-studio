import MuiTextField from '@mui/material/TextField';
import { styled } from '@mui/material/styles';

export const StyledTextField = styled(MuiTextField)(({ theme }) => ({
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
}));
