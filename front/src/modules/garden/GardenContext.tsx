import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';
import { API_URL } from '../../core/constants';
import { ToastRef } from '../../core/ui/Toast';
import generateId from '../../utils/generateId';
import { EMPTY_GARDEN } from './GardenConstants';
import { Garden } from './types/Garden';

type GardenContextType =
  | {
      currentGarden: Garden | undefined;
      setCurrentGarden: Dispatch<SetStateAction<Garden>>;
    }
  | undefined;

export const GardenContext = createContext<GardenContextType>(undefined);

type GardenProviderProps = {
  children?: ReactNode;
};

export const GardenProvider: FunctionComponent<GardenProviderProps> = (
  props
) => {
  const [currentGarden, setCurrentGarden] = useState<Garden>(EMPTY_GARDEN);

  const { children } = props;

  const fetchGarden = useCallback(async () => {
    try {
      const queryParameters = new URLSearchParams(window.location.search);
      const id = queryParameters.get('id');

      if (!id) {
        setCurrentGarden((prevState) => ({ ...prevState, id: generateId() }));
        return;
      }

      const response = await fetch(`${API_URL}/garden/${id}`, {
        method: 'GET',
      });
      const data = await response.json();

      setCurrentGarden(data);
    } catch (error) {
      ToastRef.current?.addToast(
        "Une erreur s'est produite. Paraît-il",
        'danger'
      );
    }
  }, []);

  useEffect(() => {
    fetchGarden();
  }, [fetchGarden]);

  return (
    <GardenContext.Provider value={{ currentGarden, setCurrentGarden }}>
      {children}
    </GardenContext.Provider>
  );
};
