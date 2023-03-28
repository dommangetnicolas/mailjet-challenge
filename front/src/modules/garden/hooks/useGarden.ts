import { useCallback } from 'react';
import useGardenContext from './useGardenContext';

const useGarden = () => {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const onDropLawn = useCallback(() => {
    setGarden((prevState) => ({
      ...prevState,
      lawns: [
        ...prevState.lawns,
        { id: new Date().getTime().toString(), position: 1, items: [] },
      ],
    }));
  }, [setGarden]);

  return { garden, onDropLawn };
};

export default useGarden;
