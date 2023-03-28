import { Lawn } from '../../lawn/types/Lawn';
import { LawnItem } from '../../lawnItem/types/LawnItem';

export type Garden = {
  id: string;
  name: string;
  lawns: Lawn[];
  lawnItems: LawnItem[];
};
