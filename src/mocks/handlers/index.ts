import appHandlers from './app';
import errorReportHandlers from './error-report';
import snapshotHandlers from './snapshot';

const handlers = [...appHandlers, ...errorReportHandlers, ...snapshotHandlers];

export default handlers;
