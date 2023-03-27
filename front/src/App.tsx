import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

import { ActionsBar } from './features/actionsBar/ActionsBar';
import { Builder } from './features/builder/Builder';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <>
        <ActionsBar />
        <Builder />
      </>
    </DndProvider>
  );
}

export default App;
