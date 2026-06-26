import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7c4dff',
      light: '#9670FF',
      dark: '#5635B2',
    },
    surface: {
      background: '#1b1d1f',
      border: '#d6e1ff1f',
    },
    customAction: {
      menuHover: '#ddeaf814',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 700,
          textTransform: 'none',
          borderRadius: '10px',
          transition: '0.2s ease',
        },
        sizeSmall: { padding: '4px 12px' },
        sizeMedium: { padding: '8px 20px' },
        sizeLarge: { padding: '12px 32px' },
      },
    },
  },
});
