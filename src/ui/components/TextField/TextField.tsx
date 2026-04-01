import { forwardRef } from 'react';
import { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { StyledTextField } from './TextField.styles';

export type TextFieldProps = MuiTextFieldProps & {
  animate?: boolean;
};

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ animate = false, ...rest }, ref) => {
    return <StyledTextField ref={ref} animate={animate} {...rest} />;
  },
);
