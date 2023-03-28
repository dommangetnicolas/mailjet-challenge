import styled from 'styled-components';

import GrennLawn from '../../../assets/greenLawn.png';

type LawnProps = {
  height?: string
};

const LawnBed = styled.div<LawnProps>`
  align-items: flex-end;
  background-image:url(${GrennLawn});
  background-position-x: center;
  display: flex;
  gap: 16px;
  min-height: ${({ height }) => height || '100%'};
  justify-content: center;
  max-width: 600px;
  width: 100%;
`;

export function Lawn({ children, height }: React.PropsWithChildren<LawnProps>) {
  return <LawnBed height={height}>{children}</LawnBed>;
}
