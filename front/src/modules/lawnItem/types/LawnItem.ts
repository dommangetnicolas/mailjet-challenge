import { LawnItemType } from './LawnItemType';

export type LawnItem = {
  id: string;
  lawnId: string;
  type: LawnItemType;
  position: number;
};
