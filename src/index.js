import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { GlobalContextProvider } from './contexts/global';
import { MemStorageProvider } from './contexts/storage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <GlobalContextProvider>
      <MemStorageProvider>
        <App />
      </MemStorageProvider>
    </GlobalContextProvider>
  </BrowserRouter>
);