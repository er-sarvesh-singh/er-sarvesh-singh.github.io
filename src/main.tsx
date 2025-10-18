import React from 'react';
import ReactDOM from 'react-dom/client';
import { HelmetProvider } from 'react-helmet-async';
import { LocalizationProvider } from './contexts/LocalizationContext';
import App from './App';
import './index.css';

// Enable React Strict Mode for better development experience
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HelmetProvider>
      <LocalizationProvider>
        <App />
      </LocalizationProvider>
    </HelmetProvider>
  </React.StrictMode>
);