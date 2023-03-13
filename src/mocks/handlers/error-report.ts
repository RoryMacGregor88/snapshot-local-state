import { rest } from 'msw';

import { addErrorReport } from '~/mocks/fixtures/error-report';

const handleErrorReport = rest.post('*/api/error-report', (req, res, ctx) => {
  addErrorReport(req.body);
  return res(ctx.status(200), ctx.json({ message: 'Thank you for submitting an error report' }));
});

const handlers = [handleErrorReport];

export default handlers;
