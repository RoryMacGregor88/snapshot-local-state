import React from 'react';

import { describe, expect, it } from 'vitest';
import { AppConfig } from '~/app/useAppConfig';

import { render, screen } from '~/test/utils';

import Header from './header.component';

describe('Header', () => {
  it('should render the header', () => {
    const config: AppConfig = {
      name: 'Test Name',
    };

    render(<Header appConfig={config} />);
    expect(screen.getByRole('heading', { name: /hello user/i })).toBeInTheDocument();
  });
});
