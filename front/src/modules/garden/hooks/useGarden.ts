import { useCallback } from 'react';
import { MAXIMUM_LAWNS } from '../GardenConstants';
import useGardenContext from './useGardenContext';

const useGarden = () => {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const onDropLawn = useCallback(() => {
    setGarden((prevState) => {
      if ((prevState?.lawns?.length || 0) >= MAXIMUM_LAWNS) {
        return prevState;
      }

      return {
        ...prevState,
        lawns: [
          ...prevState.lawns,
          { id: new Date().getTime().toString(), position: 1, items: [] },
        ],
      };
    });
  }, [setGarden]);

  return { garden, onDropLawn };
};

export default useGarden;
