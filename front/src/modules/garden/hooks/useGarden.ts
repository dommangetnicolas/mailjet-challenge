import { useCallback, useMemo } from 'react';
import { API_URL } from '../../../core/constants';
import { ToastRef } from '../../../core/ui/Toast';
import generateId from '../../../utils/generateId';
import { MAXIMUM_LAWNS } from '../GardenConstants';
import useGardenContext from './useGardenContext';

const useGarden = () => {
  const { currentGarden: garden, setCurrentGarden: setGarden } =
    useGardenContext();

  const onDropLawn = useCallback(
    (fromLawn?: { id: number; position: 'top' | 'bottom' }) => {
      setGarden((prevState) => {
        if ((prevState?.lawns?.length || 0) >= MAXIMUM_LAWNS) {
          return prevState;
        }

        const newLawns = [...prevState.lawns];

        let newLawnIndex = newLawns.length;

        const newLawn = {
          id: generateId(),
          gardenId: prevState.id,
          position: 1,
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

  const saveGarden = useCallback(async () => {
    const body = JSON.stringify(garden);

    try {
      const response = await fetch(`${API_URL}/garden`, {
        method: 'POST',
        body,
      });

      const data = await response.json();

      const urlParams = new URLSearchParams(window.location.search);
      urlParams.set('id', data.id);
      window.location.search = urlParams.toString();

      ToastRef.current?.addToast('Super le jardin est créé', 'success');
    } catch (error) {
      ToastRef.current?.addToast(
        "Une erreur s'est produite. Paraît-il",
        'danger'
      );
    }
  }, [garden]);

  return { garden, maximumLawnsReached, onDropLawn, saveGarden };
};

export default useGarden;
