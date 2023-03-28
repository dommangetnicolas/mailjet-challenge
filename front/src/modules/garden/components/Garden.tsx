import { useDrop } from 'react-dnd';
import styled from 'styled-components';

import Ground from '../../../assets/ground.svg';
import LawnContainer from '../../lawn/components/LawnContainer';
import useGarden from '../hooks/useGarden';
import Shovel from './Shovel';

const Land = styled.div`
  align-items: center;
  background-image: url(${Ground});
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
  height: calc(100vh - 88px);
`;

export function Garden() {
  const { garden } = useGarden();

  const { onDropLawn } = useGarden();
  const [{ isHovering }, drop] = useDrop(() => ({
    accept: 'LAWN',
    collect: (monitor) => ({
      isHovering: monitor.canDrop() && monitor.isOver(),
    }),
    drop: (item, monitor) => {
      onDropLawn();
    },
  }));

  return (
    <div ref={drop}>
      <Land>
        {isHovering && <Shovel />}

        {garden?.lawns?.map((lawn) => (
          <LawnContainer key={lawn.id} lawn={lawn} />
        ))}
      </Land>
    </div>
  );
}
