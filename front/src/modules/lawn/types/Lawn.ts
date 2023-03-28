import { LawnItem } from '../../lawnItem/types/LawnItem';

export type Lawn = {
  id: string;
  position: number;
  items: LawnItem[];
};
