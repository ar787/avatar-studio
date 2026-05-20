import MuiDialog from '@mui/material/Dialog';
import { styled } from '@mui/material/styles';
import { type DialogProps } from './Dialog';

export const StyledDialog = styled(MuiDialog)<DialogProps>((props) => {
  return {
    '& .MuiDialog-paper': {
      backgroundImage: 'none',
      backgroundColor: props.theme.palette.modal.background,
      borderColor: props.theme.palette.modal.border,
      borderWidth: 1,
      borderStyle: 'solid',
    },
  };
});
