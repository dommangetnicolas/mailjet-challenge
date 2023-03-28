import { FunctionComponent, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Shovel from '../../garden/components/Shovel';
import useGarden from '../../garden/hooks/useGarden';
import LawnItem from '../../lawnItem/components/LawnItem';
import { Lawn as LawnType } from '../types/Lawn';
import { Lawn } from './Lawn';

const HEIGHT_COMPONENT_AND_SHOVEL = 116;

const DropZone = styled.div`
  align-self: stretch;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

type Props = {
  lawn: LawnType;
};

const LawnContainer: FunctionComponent<Props> = (props) => {
  const [hoverPosition, setHoverPosition] = useState<'top' | 'bottom'>('top');

  const { lawn } = props;

  const { maximumLawnsReached, onDropLawn } = useGarden();

  const containerRef = useRef<HTMLDivElement>(null);

  const [{ isHovering }, drop] = useDrop(
    () => ({
      accept: 'LAWN',
      collect: (monitor) => ({
        isHovering: monitor.canDrop() && monitor.isOver(),
      }),
      drop: (item, monitor) => {
        onDropLawn({ id: lawn.id, position: 'before' });
      },
      hover: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) {
          return;
        }

        setHoverPosition(
          clientOffset.y - (containerRef?.current?.offsetTop || 0) >
            HEIGHT_COMPONENT_AND_SHOVEL
            ? 'bottom'
            : 'top'
        );
      },
    }),
    [hoverPosition]
  );

  return (
    <DropZone ref={drop}>
      <Container ref={containerRef}>
        {isHovering && !maximumLawnsReached && hoverPosition === 'top' && (
          <Shovel />
        )}

        <Lawn height="128px">
          {lawn?.items?.map((item) => (
            <LawnItem key={item?.id} item={item} />
          ))}
        </Lawn>

        {isHovering && !maximumLawnsReached && hoverPosition === 'bottom' && (
          <Shovel />
        )}
      </Container>
    </DropZone>
  );
};

export default LawnContainer;
