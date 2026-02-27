import MuiButton from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import { type ButtonProps, type ButtonProps as MuiButtonProps } from './Button';
const paddingMap = {
  small: '4px 12px',
  medium: '8px 20px',
  large: '12px 32px',
};

export interface StyledButtonProps extends Omit<MuiButtonProps, 'variant'> {
  $variant?: ButtonProps['variant'];
}

export const StyledButton = styled(MuiButton, {
  shouldForwardProp: (prop) => prop !== '$variant',
})<StyledButtonProps>((props) => {
  const size = props.size ?? 'medium';
  if (props.$variant === 'primary') {
    return {
      color: '#fff',
      fontWeight: 700,
      textTransform: 'uppercase',
      letterSpacing: 2,
      borderRadius: 999,
    };
  }
  return {
    background:
      'linear-gradient(135deg, #6A1B9A 0%, #FF4081 50%, #7C4DFF 100%)',
    color: '#fff',
    fontWeight: 700,
    textTransform: 'uppercase',
    letterSpacing: 2,
    borderRadius: 999,
    // boxShadow: '0 0 18px rgba(255, 64, 129, 0.7)',
    transition: 'box-shadow 0.2s ease, filter 0.2s ease',
    padding: paddingMap[size],
    '&:hover': {
      //   boxShadow: '0 0 26px rgba(255, 64, 129, 1)',
      filter: 'brightness(1.08)',
    },
  };
});
