import { FunctionComponent } from 'react';

import { LAWN_ITEM_IMAGES } from '../LawnItemConstants';
import { LawnItem as LawnItemType } from '../types/LawnItem';

type Props = {
  item: LawnItemType;
};

const LawnItem: FunctionComponent<Props> = (props) => {
  const { item } = props;

  return <img alt={item.type} src={LAWN_ITEM_IMAGES[item.type]} />;
};

export default LawnItem;
