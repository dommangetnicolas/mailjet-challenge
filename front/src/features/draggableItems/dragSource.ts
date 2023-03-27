import { ConnectDragSource, useDrag } from 'react-dnd';

type DragTypes = 'CARROT' | 'LAWN' | 'PLOT' | 'TOMATO';

interface DragSourceParams {
  item: Record<string, unknown>;
  type: DragTypes;
}
interface DragSourceReturn {
  dragRef: ConnectDragSource;
}

export function useDragSource({
  item,
  type,
}: DragSourceParams): DragSourceReturn {
  const [, drag] = useDrag(() => ({
    type,
    item,
  }));

  return {
    dragRef: drag,
  };
}
