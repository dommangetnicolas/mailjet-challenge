import { FunctionComponent, useRef, useState } from 'react';
import { useDrop } from 'react-dnd';
import styled from 'styled-components';
import Shovel from '../../garden/components/Shovel';
import useGarden from '../../garden/hooks/useGarden';
import LawnItem from '../../lawnItem/components/LawnItem';
import useLawn from '../hooks/useLawn';
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
  const [hoverPosition, setHoverPosition] = useState<{
    y: 'top' | 'bottom';
    x: 'left' | 'right';
  }>({ x: 'left', y: 'top' });

  const { lawn } = props;

  const { maximumLawnsReached, onDropLawn } = useGarden();
  const { maximumPlotsReached, onDropPlot, lawnItems } = useLawn(lawn);

  const containerRef = useRef<HTMLDivElement>(null);

  const [{ isHoveringWithLawn, isHoveringWithPlot }, drop] = useDrop(
    () => ({
      accept: ['LAWN', 'PLOT'],
      collect: (monitor) => ({
        isHoveringWithLawn:
          monitor.getItemType() === 'LAWN' &&
          monitor.canDrop() &&
          monitor.isOver(),
        isHoveringWithPlot:
          monitor.getItemType() === 'PLOT' &&
          monitor.canDrop() &&
          monitor.isOver(),
      }),
      drop: (item, monitor) => {
        if (monitor.getItemType() === 'PLOT') {
          onDropPlot();
        }

        if (monitor.getItemType() === 'LAWN') {
          onDropLawn({ id: lawn.id, position: hoverPosition.y });
        }
      },
      hover: (item, monitor) => {
        const clientOffset = monitor.getClientOffset();

        if (!clientOffset) {
          return;
        }

        setHoverPosition({
          y:
            clientOffset.y - (containerRef?.current?.offsetTop || 0) >
            HEIGHT_COMPONENT_AND_SHOVEL
              ? 'bottom'
              : 'top',
          x:
            clientOffset.x - (containerRef?.current?.offsetLeft || 0) >
            (containerRef?.current?.offsetWidth || 0) / 2
              ? 'right'
              : 'left',
        });
      },
    }),
    [hoverPosition]
  );

  return (
    <DropZone ref={drop}>
      <Container ref={containerRef}>
        {isHoveringWithLawn &&
          !maximumLawnsReached &&
          hoverPosition.y === 'top' && <Shovel />}

        <Lawn height="128px">
          {isHoveringWithPlot &&
            !maximumPlotsReached &&
            hoverPosition.x === 'left' && <Shovel />}

          {lawnItems?.map((item) => (
            <LawnItem key={item?.id} item={item} />
          ))}

          {isHoveringWithPlot &&
            !maximumPlotsReached &&
            hoverPosition.x === 'right' && <Shovel />}
        </Lawn>

        {isHoveringWithLawn &&
          !maximumLawnsReached &&
          hoverPosition.y === 'bottom' && <Shovel />}
      </Container>
    </DropZone>
  );
};

export default LawnContainer;
