import carrotsPlotImg from '../assets/carrotsPlot.png';
import emptyPlotImg from '../assets/emptyPlot.png';
import tomatoesPlotImg from '../assets/tomatoesPlot.png';

interface PlotProps {
  type: 'CARROT' | 'EMPTY' | 'TOMATO';
}

const plotTypeToImg = {
  CARROT: carrotsPlotImg,
  EMPTY: emptyPlotImg,
  TOMATO: tomatoesPlotImg,
};

export function Plot({ type }: PlotProps) {
  return <img alt={type} src={plotTypeToImg[type]} />;
}
