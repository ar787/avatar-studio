import { Suspense } from 'react';
import './App.css';
import { Container } from '@mui/material';

import HomePage from './pages/HomePage';
import LoadingPage from './pages/LoadingPage';

function App() {
  return (
    <Container fixed maxWidth={false}>
      <Suspense fallback={<LoadingPage />}>
        <HomePage />
      </Suspense>
    </Container>
  );
}

export default App;
