import { forwardRef } from 'react';
import MuiButton, {
  type ButtonProps as MuiButtonProps,
} from '@mui/material/Button';

export type ButtonProps = MuiButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'contained', ...rest }, ref) => {
    return <MuiButton ref={ref} variant={variant} {...rest} />;
  },
);
