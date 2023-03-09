import React from 'react';

import axe from '@axe-core/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';

import App from './app.component';

import './i18n/i18n';

import './index.css';

const queryClientConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
};
const queryClient = new QueryClient(queryClientConfig);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </QueryClientProvider>,
);

if (import.meta.env.DEV) {
  // const axe = require('@axe-core/react');
  axe(React, ReactDOM, 1000);
}

// Don't use MSW when docker running, only during local development.
if (import.meta.env.VITE_USE_MSW) {
  const { worker } = await import('~/mocks/browser');
  worker.start();
}
