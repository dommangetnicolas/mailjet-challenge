import styled from 'styled-components';

import Ground from '../../assets/ground.svg';
import { Lawn } from '../../components/Lawn';
import { Plot } from '../../components/Plot';

const Land = styled.div`
  align-items: center;
  background-image: url(${Ground});
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px;
`;

export function Builder() {
  return (
    <Land>
      <Lawn>
        <Plot type="EMPTY" />
        <Plot type="CARROT" />
      </Lawn>
      <Lawn height="128px"></Lawn>
      <Lawn>
        <Plot type="TOMATO" />
      </Lawn>
    </Land>
  );
}
