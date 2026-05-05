import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@ui/theme/ThemeProvider';
import { store } from '@/store';
import NotificationList from '@/components/Notification/NotificationList';
import App from './App';

import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider>
        <App />
        <NotificationList />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
