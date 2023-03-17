import '@testing-library/jest-dom';

import '~/i18n/i18n';

import nodeFetch from 'node-fetch';

import { server } from './src/mocks/server';

// type of global fetch
type GlobalFetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

/**
 * cast to unknown type as baseline for casting to other types
 *
 * from typescript: 'Conversion of type 'typeof fetch' to type 'GlobalFetch'
 * may be a mistake because neither type sufficiently overlaps with the other.
 * If this was intentional, convert the expression to 'unknown' first.'
 */
const fetch = nodeFetch as unknown as GlobalFetch;

// override global fetch with node-fetch
global.fetch = fetch;

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
});
