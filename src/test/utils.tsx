/* eslint-disable import/export */
import { ReactElement } from 'react';

import { RenderOptions } from '@storybook/addons';
import { QueryClientProvider } from '@tanstack/react-query';
import { cleanup, render } from '@testing-library/react';
import { afterEach } from 'vitest';

import { generateClient } from '~/utils/generate-client';

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    // wrap provider(s) here if needed
    wrapper: ({ children }) => {
      return <QueryClientProvider client={generateClient()}>{children}</QueryClientProvider>;
    },
    ...options,
  });

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
