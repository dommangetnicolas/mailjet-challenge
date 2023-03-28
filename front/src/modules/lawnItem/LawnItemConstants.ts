import carottImg from '../../assets/carrotsPlot.png';
import emptyPlotImg from '../../assets/emptyPlot.png';
import tomatoImg from '../../assets/tomatoesPlot.png';
import { LawnItemType } from './types/LawnItemType';

export const LAWN_ITEM_IMAGES: Record<LawnItemType, string> = {
  CARROT: carottImg,
  TOMATO: tomatoImg,
  PLOT: emptyPlotImg,
};
