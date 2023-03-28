import { LawnItemType } from './LawnItemType';

export type LawnItem = {
  id: number;
  lawnId: number;
  type: LawnItemType;
  position: number;
};
