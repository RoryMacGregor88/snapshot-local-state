let snapshots = [
  {
    id: 1,
    snapshotName: 'Snapshot 1',
    sidebarColor: 'green',
    sidebarIsOpen: true,
  },
  {
    id: 2,
    snapshotName: 'Snapshot 2',
    sidebarColor: '#ff0000',
    sidebarIsOpen: false,
  },
  {
    id: 3,
    snapshotName: 'Snapshot 3',
    sidebarColor: 'rgb(150, 200, 15)',
    sidebarIsOpen: true,
  },
];

export const getAllSnapshots = () => snapshots.map(({ id, snapshotName }) => ({ id, snapshotName }));

export const getSnapshot = id => snapshots.find(s => s.id === id);

export const saveSnapshot = snapshot => {
  const id = snapshots.length + 1;
  const newSnapshot = { id, ...snapshot };
  snapshots = [...snapshots, newSnapshot];

  return newSnapshot;
};
