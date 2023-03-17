/* eslint-disable import/export */
import { ReactElement, ReactNode } from 'react';

import { RenderOptions } from '@storybook/addons';
import { QueryClientProvider } from '@tanstack/react-query';
import { RenderHookOptions, RenderHookResult, cleanup, render, renderHook } from '@testing-library/react';
import { afterEach } from 'vitest';

import { generateClient } from '~/utils/generate-client';

afterEach(() => {
  cleanup();
});

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, {
    wrapper: ({ children }: { children: ReactNode }): ReactElement => (
      <QueryClientProvider client={generateClient()}>{children}</QueryClientProvider>
    ),
    ...options,
  });

type HookResult = RenderHookResult<
  {
    isSuccess: boolean;
    data: unknown;
  },
  unknown
>;

/**
 * Custom renderHook to replace renderHook from testing library
 *
 * @param callback - callback that wraps the hook being tested
 * @param options - An options object to modify the execution of renderHook
 *
 * @returns - object, see here for shape: https://react-hooks-testing-library.com/reference/api#renderhook-result
 */
const customRenderHook = (callback: () => unknown, options?: RenderHookOptions<unknown>): HookResult => {
  const wrapper = ({ children }: { children: ReactNode }): ReactElement => (
    <QueryClientProvider client={generateClient()}>{children}</QueryClientProvider>
  );

  const utils = renderHook(() => callback(), { wrapper, ...options });
  return utils as HookResult;
};

export * from '@testing-library/react';
export { default as userEvent } from '@testing-library/user-event';
// override render export
export { customRender as render };
// overide renderHook export
export { customRenderHook as renderHook };
