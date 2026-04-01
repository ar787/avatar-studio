import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { forwardRef } from 'react';
import { StyledButton } from './Button.styles';

export type ButtonProps = MuiButtonProps;
export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', ...rest }, ref) => {
    return <StyledButton ref={ref} variant={variant} {...rest} />;
  },
);
