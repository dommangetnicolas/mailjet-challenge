import {
  createContext,
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
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

  return (
    <GardenContext.Provider value={{ currentGarden, setCurrentGarden }}>
      {children}
    </GardenContext.Provider>
  );
};
