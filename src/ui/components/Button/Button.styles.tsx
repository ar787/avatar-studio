import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { type ButtonProps as MuiButtonProps } from './Button';
const paddingMap = {
  small: '4px 12px',
  medium: '8px 20px',
  large: '12px 32px',
};

export const StyledButton = styled(MuiButton)<MuiButtonProps>((props) => {
  const size = props.size ?? 'medium';

  return {
    // background:
    //   'linear-gradient(135deg, #6A1B9A 0%, #FF4081 50%, #7C4DFF 100%)',
    color: props.theme.palette.primary.contrastText,
    fontWeight: 700,
    textTransform: 'none',
    borderRadius: '10px',
    // boxShadow: '0 0 18px rgba(255, 64, 129, 0.7)',
    transition: '0.2s ease',
    padding: paddingMap[size],
  };
});
