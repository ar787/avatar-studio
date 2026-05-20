import { ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { theme } from './index';

declare module '@mui/material/styles' {
  interface Palette {
    modal: {
      background: string;
      border: string;
    };
    customAction: {
      menuHover: string;
    };
  }
  interface PaletteOptions {
    modal: {
      background: string;
      border: string;
    };
    customAction: {
      menuHover: string;
    };
  }
}

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
};
