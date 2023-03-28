import carottImg from '../../assets/carrotsPlot.png';
import emptyPlotImg from '../../assets/emptyPlot.png';
import tomatoImg from '../../assets/tomatoesPlot.png';
import { Lawn } from '../lawn/types/Lawn';
import { LawnItemType } from './types/LawnItemType';

const EMPTY_LAWN_ID = 'empty-garden-id';

export const NEW_LAWN: Lawn = {
  id: EMPTY_LAWN_ID,
  position: 1,
  items: [],
};

export const LAWN_ITEM_IMAGES: Record<LawnItemType, string> = {
  CARROT: carottImg,
  TOMATO: tomatoImg,
  PLOT: emptyPlotImg,
};
