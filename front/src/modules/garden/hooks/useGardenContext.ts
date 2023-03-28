import { useContext } from 'react';
import { GardenContext } from '../GardenContext';

const useGardenContext = () => {
  const gardenContext = useContext(GardenContext);

  if (!gardenContext) {
    throw new Error("useGardenContext can't be used outside a GardenProvider");
  }

  return gardenContext;
};

export default useGardenContext;
