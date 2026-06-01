import { styled } from '@mui/material/styles';
import MUIMenu, { menuClasses } from '@mui/material/Menu';

export const StyledMenu = styled(MUIMenu)(({ theme }) => ({
  [`& .${menuClasses.paper}`]: {
    backgroundImage: 'none',
    backgroundColor: theme.palette.surface.background,
    borderColor: theme.palette.surface.border,
    borderWidth: 1,
    borderStyle: 'solid',
  },
  [`& .${menuClasses.list}`]: {
    '& .MuiMenuItem-root:hover': {
      backgroundColor: theme.palette.customAction.menuHover,
      borderRadius: '8px',
      transition: theme.transitions.create('background-color', {
        duration: theme.transitions.duration.short,
      }),
    },

    '& .MuiListItemIcon-root': {
      color: theme.palette.primary.main,
    },
  },
}));
