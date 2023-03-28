import { FunctionComponent } from 'react';
import styled from 'styled-components';
import useDragSource from '../../../core/drag/hooks/useDragSource';
import { DRAGGABLE_ITEM_IMAGES } from '../DraggableItemConstants';
import { DraggableItemType } from '../types/DraggableItemType';

const SectionWrapper = styled.div`
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  gap: 2px;
  justify-content: center;
  padding: 2px;
  min-width: 100px;
`;

const ItemWrapper = styled.div`
  align-items: center;
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  display: flex;
  min-width: 50px;
`;

type Props = {
  type: DraggableItemType;
};

const DraggableItem: FunctionComponent<Props> = (props) => {
  const { type } = props;

  const { dragRef } = useDragSource({
    item: {
      /* TO DEFINE */
    },
    type,
  });

  if (['LAWN', 'PLOT'].includes(type)) {
    return (
      <SectionWrapper ref={dragRef}>
        <img
          alt={type}
          src={DRAGGABLE_ITEM_IMAGES[type]}
          style={{ height: 50, width: 100 }}
        />
      </SectionWrapper>
    );
  }

  return (
    <ItemWrapper ref={dragRef}>
      <img
        alt={type}
        src={DRAGGABLE_ITEM_IMAGES[type]}
        style={{ height: 50, width: 50 }}
      />
    </ItemWrapper>
  );
};

export default DraggableItem;
