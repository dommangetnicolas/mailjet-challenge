import { FunctionComponent } from 'react';
import LawnItem from '../../lawnItem/components/LawnItem';
import { Lawn as LawnType } from '../types/Lawn';
import { Lawn } from './Lawn';

type Props = {
  lawn: LawnType;
};

const LawnContainer: FunctionComponent<Props> = (props) => {
  const { lawn } = props;
  return (
    <Lawn height="128px">
      {lawn?.items?.map((item) => (
        <LawnItem key={item?.id} item={item} />
      ))}
    </Lawn>
  );
};

export default LawnContainer;
