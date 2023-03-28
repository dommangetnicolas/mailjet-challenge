import { FunctionComponent } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Shovel from '../../garden/components/Shovel';
import useLawnItem from '../hooks/useLawnItem';

import { LAWN_ITEM_IMAGES } from '../LawnItemConstants';
import { LawnItem as LawnItemType } from '../types/LawnItem';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  item: LawnItemType;
};

const LawnItem: FunctionComponent<Props> = (props) => {
  const { item } = props;

  const { onDropItem } = useLawnItem(item);

  const [{ isHovering }, drop] = useDrop(
    () => ({
      accept: ['TOMATO', 'CARROT'],
      collect: (monitor) => ({
        isHovering: monitor.canDrop() && monitor.isOver(),
      }),
      drop: (item, monitor) => {
        const type = monitor.getItemType();

        if (!type) {
          return;
        }

        if (type === 'CARROT' || type === 'TOMATO') {
          onDropItem(type);
        }
      },
    }),
    []
  );

  return (
    <div ref={drop}>
      <Container>
        {isHovering && item.type === 'PLOT' && <Shovel />}
        <img alt={item.type} src={LAWN_ITEM_IMAGES[item.type]} />;
      </Container>
    </div>
  );
};

export default LawnItem;
