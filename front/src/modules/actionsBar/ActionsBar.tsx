import styled from 'styled-components';
import DraggableItem from '../draggableItem/components/DraggableItem';

import { InputName } from './InputName';
import { SaveButton } from './SaveButton';

const BarContainer = styled.div`
  align-items: center;
  background-color: #ddd;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  display: flex;
  justify-content: space-between;
  padding: 16px 32px;
  width: 100%;
`;

const ItemsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

export function ActionsBar() {
  return (
    <BarContainer>
      <InputName />
      <ItemsContainer>
        <DraggableItem type="LAWN" />
        <DraggableItem type="PLOT" />
        <DraggableItem type="CARROT" />
        <DraggableItem type="TOMATO" />
      </ItemsContainer>
      <SaveButton />
    </BarContainer>
  );
}
