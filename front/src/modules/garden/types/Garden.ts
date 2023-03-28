import { Lawn } from '../../lawn/types/Lawn';
import { LawnItem } from '../../lawnItem/types/LawnItem';

export type Garden = {
  id: number;
  name: string;
  lawns: Lawn[];
  lawnItems: LawnItem[];
  createdAt: Date | undefined;
  updatedAt: Date | undefined;
};
