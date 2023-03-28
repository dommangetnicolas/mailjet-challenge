import carottImg from '../../assets/carrot.png';
import emptyPlotImg from '../../assets/emptyPlot.png';
import tomatoImg from '../../assets/tomato.png';
import lawnImg from '../../assets/greenLawn.png';
import { DraggableItemType } from './types/DraggableItemType';

export const DRAGGABLE_ITEM_IMAGES: Record<DraggableItemType, string> = {
  LAWN: lawnImg,
  CARROT: carottImg,
  TOMATO: tomatoImg,
  PLOT: emptyPlotImg,
};
