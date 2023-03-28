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
    lawnItems?.filter((item) => item.type === 'PLOT' && item.lawnId === lawn.id)
      .length >= MAXIMUM_PLOTS;

  const onDropPlot = useCallback(() => {
    setGarden((prevState) => {
      if (
        prevState.lawnItems?.filter(
          (item) => item.type === 'PLOT' && item.lawnId === lawn.id
        ).length >= MAXIMUM_PLOTS
      ) {
        return prevState;
      }

      const newLawnItems = [...prevState.lawnItems];

      newLawnItems.push({
        id: new Date().getTime().toString(),
        lawnId: lawn.id,
        type: 'PLOT',
        position: 1,
      });

      return { ...prevState, lawnItems: newLawnItems };
    });
  }, [lawn.id, setGarden]);

  return { maximumPlotsReached, onDropPlot, lawnItems };
};

export default useLawn;