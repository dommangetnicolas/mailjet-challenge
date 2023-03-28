import { ChangeEvent, useCallback } from 'react';
import styled from 'styled-components';
import { GARDEN_NAME_LENGTH } from '../GardenConstants';
import useGardenContext from '../hooks/useGardenContext';

const CustomInput = styled.input`
  background-color: white;
  border: 1px solid grey;
  border-radius: 3px;
  padding: 4px 12px;
`;

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const prefix = 'garden_';

export function GardenName() {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const input = e.target.value;

      setGarden((prevState) => {
        const newValue = prefix + input.substring(prefix.length);

        if (newValue?.length > GARDEN_NAME_LENGTH) {
          return prevState;
        }

        return {
          ...prevState,
          name: newValue,
        };
      });
    },
    [setGarden]
  );

  return (
    <InputWrapper>
      <label htmlFor="input-name">Garden name</label>
      <CustomInput
        id="input-name"
        onChange={handleChange}
        value={garden?.name || prefix}
        maxLength={GARDEN_NAME_LENGTH}
        disabled={!!garden?.createdAt}
      />
    </InputWrapper>
  );
}
