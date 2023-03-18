import React from 'react';

import { QueryClient, QueryClientConfig, QueryClientProvider } from '@tanstack/react-query';

import i18n from '../src/i18n/i18n';
// import { BrowserRouter } from 'react-router-dom';

import 'tailwindcss/tailwind.css';

const queryClientConfig: QueryClientConfig = {
  defaultOptions: {
    queries: {
      retry: false,
    },
    mutations: {
      retry: false,
    },
  },
};

const queryClient = new QueryClient(queryClientConfig);

export const decorators = [
  (Story, context) => (
    <QueryClientProvider client={queryClient}>
      <Story {...context} />
    </QueryClientProvider>
  ),
];

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  i18n,
  locale: 'en',
  locales: {
    en: { title: 'English', left: '🇬🇧' },
    fr: { title: 'French', left: '🇫🇷' },
  },
};

export const globalTypes = {
  theme: {
    name: 'Theme',
    description: 'Global theme for components',
    defaultValue: 'dark',
    toolbar: {
      icon: 'paintbrush',
      items: [
        { value: 'light', title: 'Light', left: '☀️' },
        { value: 'dark', title: 'Dark', left: '🌒' },
      ],
    },
  },
};
