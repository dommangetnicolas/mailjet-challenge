import { useCallback } from 'react';
import useGardenContext from '../../garden/hooks/useGardenContext';
import { LawnItem } from '../types/LawnItem';
import { LawnItemType } from '../types/LawnItemType';

const useLawnItem = (item: LawnItem) => {
  const { setCurrentGarden: setGarden } =
    useGardenContext();

  const onDropItem = useCallback(
    (type: LawnItemType) => {
      setGarden((prevState) => {
        const newLawnItems = [...(prevState?.lawnItems || [])];

        const itemIndex = newLawnItems.findIndex((x) => x.id === item.id);

        if (itemIndex === undefined) {
          return prevState;
        }

        if (newLawnItems[itemIndex].type !== 'PLOT') {
          return prevState;
        }

        newLawnItems[itemIndex] = { ...newLawnItems[itemIndex], type };

        return { ...prevState, lawnItems: newLawnItems };
      });
    },
    [item.id, setGarden]
  );

  return { onDropItem };
};

export default useLawnItem;
