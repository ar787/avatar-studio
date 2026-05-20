import type { DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { forwardRef } from 'react';
import { StyledDialog } from './Dialog.styles';

export type DialogProps = MuiDialogProps;
export const Dialog = forwardRef<HTMLDivElement, DialogProps>((props, ref) => {
  return <StyledDialog ref={ref} {...props} />;
});
