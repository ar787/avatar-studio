import { forwardRef } from 'react';
import Button, { type ButtonProps } from '@mui/material/Button';
import { styled } from '@mui/material/styles';

const paddingMap = {
  small: '4px 12px',
  medium: '8px 20px',
  large: '12px 32px',
};

const StyledButton = styled(Button)((props) => {
  const size = props.size ?? 'medium';

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

export const NeonButton = forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <StyledButton ref={ref} {...props} />;
  },
);

NeonButton.displayName = 'NeonButton';
