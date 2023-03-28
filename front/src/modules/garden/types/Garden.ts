import { Lawn } from '../../lawn/types/Lawn';

export type Garden = {
  id: string;
  name: string;
  lawns: Lawn[];
};
