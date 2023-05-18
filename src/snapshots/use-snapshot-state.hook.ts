import { useCallback, useEffect, useState } from 'react';

import { useSnapshots } from '~/snapshots/use-snapshot.hook';

type StateSetterValue = unknown | (<T>(previousValue: T) => T);
type SnapshotStateSetter = (value: StateSetterValue) => void;

const useSnapshotState = <T>(value: unknown, key: string): [T, SnapshotStateSetter] => {
  const { localState, updateLocalState } = useSnapshots();

  const initialState = (localState[key] ?? value) as T;

  const [state, setState] = useState<T>(initialState);

  const wrappedSetState = useCallback((value: StateSetterValue) => {
    const newState = typeof value === 'function' ? value(state) : value;
    updateLocalState({ [key]: newState });
    setState(newState);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    wrappedSetState(initialState);
  }, [initialState, wrappedSetState]);

  return [state, wrappedSetState];
};

export { useSnapshotState };
