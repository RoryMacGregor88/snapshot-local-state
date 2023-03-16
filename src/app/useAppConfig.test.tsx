import { QueryClientProvider } from '@tanstack/react-query';
import { renderHook } from '@testing-library/react';
import { rest } from 'msw';
import { expect, it } from 'vitest';

import { server } from '~/mocks/server';
import { waitFor } from '~/test/utils';
import { generateClient } from '~/utils/generate-client';

import { useAppConfig } from './useAppConfig';

describe('useAppConfig', () => {
  it('fetches', async () => {
    const config = { name: 'Test Name' };

    server.use(rest.get('*/api/config', (req, res, ctx) => res(ctx.status(200), ctx.json(config))));

    const wrapper = ({ children }) => {
      return <QueryClientProvider client={generateClient()}>{children}</QueryClientProvider>;
    };

    const { result } = renderHook(() => useAppConfig(), { wrapper });

    await waitFor(() => result.current.isSuccess);

    await waitFor(() => {
      expect(result.current.data).toEqual(config);
    });
  });
});
