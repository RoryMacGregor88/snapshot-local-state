import { FC, ReactElement, ReactNode, useState } from 'react';

import Footer from '~/layout/footer.component';
import Header from '~/layout/header.component';
import { useGetSnapshots } from '~/snapshots/use-get-snapshots.hook';
import { useLoadSnapshot } from '~/snapshots/use-load-snapshot.hook';
import { useSaveSnapshot } from '~/snapshots/use-save-snapshot.hook';
import { useSnapshotState } from '~/snapshots/use-snapshot-state.hook';

const SIDEBAR_COLOR_KEY = 'sidebarColor';
const SIDEBAR_IS_OPEN_KEY = 'sidebarIsOpen';
const SNAPSHOT_NAME_KEY = 'snapshotName';
const COLOR_INPUT_KEY = 'colorInput';

const buttonStyles = { textAlign: 'center', border: '1px solid grey', borderRadius: '5px', padding: '0.5rem' };

const Sidebar = ({ open, color, children }: { open: boolean; color: string; children: ReactNode }) => (
  <div
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '20rem',
      height: '100%',
      backgroundColor: color,
      visibility: open ? 'visible' : 'hidden',
    }}
  >
    {children}
  </div>
);

const Dialog = ({ onSave }) => {
  const [snapshotName, setSnapshotName] = useSnapshotState('', SNAPSHOT_NAME_KEY);
  return (
    <div
      style={{
        padding: '2.5rem',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <h3>Name this Snapshot:</h3>
      <input
        style={{ margin: '1rem 0', color: '#000' }}
        value={snapshotName}
        onChange={({ target: { value } }) => setSnapshotName(value)}
      />
      <button style={buttonStyles} onClick={onSave}>
        Save
      </button>
    </div>
  );
};

export const App: FC = (): ReactElement => {
  const [colorInput, setColorInput] = useSnapshotState<string>('', COLOR_INPUT_KEY);
  const [showDialog, setShowDialog] = useState(false);

  const [sidebarColor, setSidebarColor] = useSnapshotState<string>('blue', SIDEBAR_COLOR_KEY);
  const [sidebarIsOpen, setSidebarIsOpen] = useSnapshotState<boolean>(false, SIDEBAR_IS_OPEN_KEY);

  const { mutate: saveSnapshot } = useSaveSnapshot();
  const { data: snapshots } = useGetSnapshots();
  const { mutate: loadSnapshot } = useLoadSnapshot();

  return (
    <div className="flex min-h-screen flex-col">
      <Header appConfig={undefined} />

      <main className="grow">
        {showDialog ? <Dialog onSave={saveSnapshot} /> : null}

        <Sidebar color={sidebarColor} open={sidebarIsOpen}>
          <h1>I am sidebar</h1>
        </Sidebar>

        <div style={{ marginLeft: '30rem', width: '30rem', ...buttonStyles }}>
          <button onClick={() => setShowDialog(true)}>Save App State Snapshot</button>
        </div>
        <div style={{ marginLeft: '30rem', display: 'flex', flexDirection: 'column', width: '30rem' }}>
          <input
            placeholder="Type color, eg; 'red' '#ff0000', or 'rgb(15, 15, 15)'"
            style={{ color: '#000', margin: '1rem 0' }}
            value={colorInput}
            onChange={({ target: { value } }) => setColorInput(value)}
          />
          <button
            style={buttonStyles}
            onClick={() => {
              if (!sidebarIsOpen) setSidebarIsOpen(true);
              setSidebarColor(colorInput);
            }}
          >
            Submit new color
          </button>
          <button onClick={() => setSidebarIsOpen((prev: boolean) => !prev)}>Toggle Sidebar</button>
        </div>
        <ul style={{ margin: '5rem 0 0 30rem', display: 'flex', gap: '2rem' }}>
          {snapshots?.map(({ id, snapshotName, sidebarColor }) => (
            <li key={snapshotName} style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <h4>
                Snapshot Name: <strong>{snapshotName}</strong>
              </h4>
              <div style={{ height: '5rem', width: '5rem', backgroundColor: sidebarColor }} />
              <button style={buttonStyles} onClick={() => loadSnapshot(id)}>
                Load snapshot
              </button>
            </li>
          ))}
        </ul>
      </main>

      <Footer />
    </div>
  );
};
function useEffect(arg0: () => () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
