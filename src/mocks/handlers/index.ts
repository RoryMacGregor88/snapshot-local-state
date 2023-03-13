import appHandlers from './app';
import errorReportHandlers from './error-report';

const handlers = [...appHandlers, ...errorReportHandlers];

export default handlers;
