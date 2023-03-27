import styled from 'styled-components';

import emptyPlotImg from '../../assets/emptyPlot.png';
import { Lawn } from '../../components/Lawn';
import { useDragSource } from './dragSource';

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

export function DraggableLawn() {
  const { dragRef } = useDragSource({ item: {
    /* TO DEFINE */
  }, type: 'LAWN' });

  return (
    <SectionWrapper ref={dragRef}>
      <Lawn />
    </SectionWrapper>
  );
}

export function DraggablePlot() {
  const { dragRef } = useDragSource({ item: {
    /* TO DEFINE */
  }, type: 'PLOT' });

  return (
    <SectionWrapper ref={dragRef}>
      <img
        alt="empty plot"
        src={emptyPlotImg}
        style={{ height: 50 }}
      />
    </SectionWrapper>
  );
}
