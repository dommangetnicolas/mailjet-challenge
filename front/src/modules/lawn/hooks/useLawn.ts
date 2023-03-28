import { useCallback, useMemo } from 'react';
import useGardenContext from '../../garden/hooks/useGardenContext';
import { MAXIMUM_PLOTS } from '../LawnConstants';
import { Lawn } from '../types/Lawn';

const useLawn = (lawn: Lawn) => {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const lawnItems = useMemo(() => {
    return garden?.lawnItems.filter((x) => x.lawnId === lawn.id) || [];
  }, [garden, lawn.id]);

  const maximumPlotsReached =
    lawnItems?.filter((item) => item.lawnId === lawn.id).length >=
    MAXIMUM_PLOTS;

  const onDropPlot = useCallback(
    (position: 'right' | 'left') => {
      setGarden((prevState) => {
        if (
          prevState.lawnItems?.filter((item) => item.lawnId === lawn.id)
            .length >= MAXIMUM_PLOTS
        ) {
          return prevState;
        }

        const newLawnItems = [...prevState.lawnItems];
        const existingLawnItemIndex = newLawnItems?.findIndex(
          (x) => x.lawnId === lawn.id
        );

        newLawnItems.splice(
          position === 'left'
            ? existingLawnItemIndex
            : existingLawnItemIndex + 1,
          0,
          {
            id: new Date().getTime().toString(),
            lawnId: lawn.id,
            type: 'PLOT',
            position: 1,
          }
        );

        return { ...prevState, lawnItems: newLawnItems };
      });
    },
    [lawn.id, setGarden]
  );

  return { maximumPlotsReached, onDropPlot, lawnItems };
};

export default useLawn;
