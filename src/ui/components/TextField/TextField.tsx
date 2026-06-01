import { forwardRef } from 'react';
import { type TextFieldProps as MuiTextFieldProps } from '@mui/material/TextField';
import { StyledTextField } from './TextField.styles';

export type TextFieldProps = MuiTextFieldProps;

export const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  (props, ref) => {
    return <StyledTextField ref={ref} {...props} />;
  },
);
