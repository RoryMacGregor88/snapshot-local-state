import { describe, expect, it } from 'vitest';

import { render, screen } from '~/test/utils';

import { SnapshotProvider } from '~/snapshots/snapshot.context';

import { App } from './app.component';

describe('App', () => {
  it('should render the whole app', () => {
    render(
      <SnapshotProvider>
        <App />
      </SnapshotProvider>,
    );

    expect(screen.getByRole('heading', { name: /main content/i })).toBeInTheDocument();
  });
});
