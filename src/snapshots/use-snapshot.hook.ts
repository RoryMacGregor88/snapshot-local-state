import { useContext } from 'react';

import { SnapshotContext } from './snapshot.context';

export const useSnapshots = () => {
  const context = useContext(SnapshotContext);

  if (!context) {
    throw new Error('useSnapshots must be used within a SnapshotProvider');
  }

  return context;
};
