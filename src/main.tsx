import React from 'react';

import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import ReactDOM from 'react-dom/client';

import { App } from '~/app/app.component';
import './i18n/i18n';
import './index.css';
import { SnapshotProvider } from '~/snapshots/snapshot.context';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      useErrorBoundary: true,
    },
    mutations: {
      useErrorBoundary: true,
    },
  },
};

const config = new QueryClient(queryClientConfig);

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
ReactDOM.createRoot(document.getElementById('root')!).render(
  <SnapshotProvider>
    <QueryClientProvider client={config}>
      <React.StrictMode>
        <App />
      </React.StrictMode>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </SnapshotProvider>,
);

if (import.meta.env.DEV) {
  const axe = await import('@axe-core/react');
  axe.default(React, ReactDOM, 1000);
}

// Don't use MSW when docker running, only during local development.
if (import.meta.env.VITE_USE_MSW) {
  const { worker } = await import('~/mocks/browser');
  worker.start();
}
