import { rest } from 'msw';
import { describe, expect, it } from 'vitest';

import { server } from '~/mocks/server';
import { renderHook, waitFor } from '~/test/utils';

import { useAppConfig } from './useAppConfig';

describe('useAppConfig', () => {
  it('should fetch data to configure the frontend', async () => {
    const config = { name: 'Test Name' };

    server.use(rest.get('*/api/config', (req, res, ctx) => res(ctx.status(200), ctx.json(config))));

    const { result } = renderHook(() => useAppConfig());

    await waitFor(() => result.current.isSuccess);

    await waitFor(() => expect(result.current.data).toEqual(config));
  });
});
