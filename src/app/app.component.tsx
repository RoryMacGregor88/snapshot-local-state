import { FC, ReactElement, useState } from 'react';

import { ErrorBoundary } from 'react-error-boundary';

import { ErrorFallback, errorHandler } from '~/components/error-fallback.component';
import { useCreateErrorReport } from '~/error-reporting/error-report.hook';
import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';

import { useAppConfig } from './useAppConfig';

const Bomb = () => {
  throw new Error('💥 CABOOM 💥');
};

const App: FC = (): ReactElement => {
  const { data: appConfig } = useAppConfig();
  const { mutate, data: report, error: failure, isError, isSuccess } = useCreateErrorReport();

  const handleErrorReport = (error: Error) => {
    const sendErrorReport = async () => {
      await mutate({ message: error.message, stackTrace: error.stack ?? '' });
    };

    sendErrorReport();
  };

  const [explode, setExplode] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Header appConfig={appConfig} />

      <main className="grow">
        <h1>Main Content</h1>

        <ErrorBoundary
          fallbackRender={({ error, resetErrorBoundary }) => (
            <ErrorFallback
              error={error}
              failure={failure}
              handleErrorReport={handleErrorReport}
              isError={isError}
              isSuccess={isSuccess}
              report={report}
              resetErrorBoundary={resetErrorBoundary}
            />
          )}
          onError={errorHandler}
          onReset={() => setExplode(!explode)}
        >
          <button
            className="rounded-md border-2 border-black bg-blue-500 py-2 px-4 text-white"
            onClick={() => setExplode(!explode)}
          >
            Throw a hissy fit
          </button>

          {explode ? <Bomb /> : null}
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  );
};

export default App;
