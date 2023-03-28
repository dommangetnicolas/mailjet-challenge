import { useDrag } from 'react-dnd';
import { DraggableItemType } from '../../../modules/draggableItem/types/DraggableItemType';

interface DragSourceParams {
  item: Record<string, unknown>;
  type: DraggableItemType;
}

const useDragSource = ({ item, type }: DragSourceParams) => {
  const [, drag] = useDrag(() => ({
    type,
    item,
  }));

  return {
    dragRef: drag,
  };
};

export default useDragSource;
