import '@testing-library/jest-dom';

import '~/i18n/i18n';

import fetch from 'node-fetch';

import { server } from './src/mocks/server';

// type global fetch
type GlobalFetch = (input: URL | RequestInfo, init?: RequestInit | undefined) => Promise<Response>;

// cast nodeFetch as GlobalFetch type
const nodeFetch = fetch as GlobalFetch;

// override global fetch with node-fetch
global.fetch = nodeFetch;

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
