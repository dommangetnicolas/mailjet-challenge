import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import ToastContainer from './core/ui/Toast';

import { ActionsBar } from './modules/actionsBar/ActionsBar';
import { Garden } from './modules/garden/components/Garden';
import { GardenProvider } from './modules/garden/GardenContext';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <GardenProvider>
        <ActionsBar />
        <Garden />

        <ToastContainer />
      </GardenProvider>
    </DndProvider>
  );
}

export default App;
