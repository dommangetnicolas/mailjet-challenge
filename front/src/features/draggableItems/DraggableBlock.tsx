import styled from 'styled-components';

import { draggableTypesToImages } from './DraggableTypesToImages';
import { useDragSource } from './dragSource';

const DraggableCard = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  min-width: 50px;
`;

interface DraggableBlockProps {
  type: 'CARROT' | 'TOMATO';
}

export function DraggableBlock({ type }: DraggableBlockProps) {
  const { dragRef } = useDragSource({
    item: {
      /* TO DEFINE */
    },
    type,
  });

  return (
    <DraggableCard ref={dragRef}>
      <img
        alt={type}
        src={draggableTypesToImages[type]}
        style={{ height: 50, width: 50 }}
      />
    </DraggableCard>
  );
}
