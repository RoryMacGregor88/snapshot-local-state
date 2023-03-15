import { FC, ReactElement } from 'react';

import { Button } from '@astrosat/react-utils';

import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

import { useAppConfig } from './useAppConfig';

const App: FC = (): ReactElement => {
  const { data: appConfig } = useAppConfig();
  return (
    <div className="flex min-h-screen flex-col">
      <Header appConfig={appConfig} />

      <main className="grow">
        <h2>Main Content</h2>

        <Button onClick={() => console.log('BUTTON CLICKED')}>
          <span>Click Me</span>
        </Button>
      </main>

      <Footer />
    </div>
  );
};

export default App;