import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { forwardRef } from 'react';
import { StyledButton } from './Button.styles';

export type ButtonProps = Omit<MuiButtonProps, 'variant'> & {
  variant?: 'primary' | 'neon';
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'neon', ...rest }, ref) => {
    return <StyledButton ref={ref} $variant={variant} {...rest} />;
  },
);
