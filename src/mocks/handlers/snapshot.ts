import { rest } from 'msw';

import { getAllSnapshots, getSnapshot, saveSnapshot } from '~/mocks/fixtures/snapshot';

const handleGetAllSnapshots = rest.get('*/api/snapshots', async (req, res, ctx) => {
  const snapshots = getAllSnapshots();

  return res(ctx.status(200), ctx.json(snapshots));
});

const handleGetSnapshot = rest.get('*/api/snapshots/:id', async (req, res, ctx) => {
  const { id } = req.params;
  const snapshot = getSnapshot(Number(id));

  return res(ctx.status(200), ctx.json(snapshot));
});

const handleSaveSnapshot = rest.post('*/api/snapshots', async (req, res, ctx) => {
  const body = await req.json();
  const snapshot = saveSnapshot(body);

  return res(ctx.status(200), ctx.json(snapshot));
});

const handlers = [handleGetAllSnapshots, handleGetSnapshot, handleSaveSnapshot];

export default handlers;
