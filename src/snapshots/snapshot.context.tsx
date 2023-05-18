import { FC, ReactElement, createContext, useState } from 'react';

export type LocalState = Record<string, unknown>;

export type SnapshotContextType = {
  localState: LocalState;
  updateLocalState: (newState: unknown) => void;
};

export const SnapshotContext = createContext<SnapshotContextType | null>(null);
SnapshotContext.displayName = 'SnapshotContext';

interface Props {
  initialState?: Partial<SnapshotContextType>;
  children: ReactElement;
}

export const SnapshotProvider: FC<Props> = ({ initialState = {}, children }) => {
  const [localState, setLocalState] = useState<LocalState>({});

  const updateLocalState = (newState: LocalState) => setLocalState(prev => ({ ...prev, ...newState }));

  const value = { localState, updateLocalState, ...initialState };

  return <SnapshotContext.Provider value={value}>{children}</SnapshotContext.Provider>;
};
