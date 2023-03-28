import { useCallback, useMemo } from 'react';
import { MAXIMUM_LAWNS } from '../GardenConstants';
import useGardenContext from './useGardenContext';

const useGarden = () => {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const onDropLawn = useCallback(
    (fromLawn?: { id: string; position: 'top' | 'bottom' }) => {
      setGarden((prevState) => {
        if ((prevState?.lawns?.length || 0) >= MAXIMUM_LAWNS) {
          return prevState;
        }

        const newLawns = [...prevState.lawns];

        let newLawnIndex = newLawns.length;

        const newLawn = {
          id: new Date().getTime().toString(),
          position: 1,
          items: [],
        };

        if (fromLawn) {
          const fromLawnIndex = newLawns?.findIndex(
            (newLawn) => newLawn.id === fromLawn.id
          );

          if (fromLawnIndex !== undefined && fromLawn?.position === 'top') {
            newLawnIndex = fromLawnIndex;
          }

          if (fromLawnIndex !== undefined && fromLawn?.position === 'bottom') {
            newLawnIndex = fromLawnIndex + 1;
          }
        }

        newLawns.splice(newLawnIndex, 0, newLawn);

        return { ...prevState, lawns: newLawns };
      });
    },
    [setGarden]
  );

  const maximumLawnsReached = useMemo(
    () => garden?.lawns?.length && garden?.lawns?.length >= MAXIMUM_LAWNS,
    [garden?.lawns?.length]
  );

  return { garden, maximumLawnsReached, onDropLawn };
};

export default useGarden;
