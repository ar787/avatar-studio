import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
      light: '#9670FF',
      dark: '#5635B2',
    },
    modal: {
      background: '#1b1d1f',
      border: '#d6e1ff1f',
    },
    customAction: {
      menuHover: '#ddeaf814',
    },
  },
});
