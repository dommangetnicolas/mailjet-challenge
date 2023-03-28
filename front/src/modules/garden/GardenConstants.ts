import { Garden } from './types/Garden';

const EMPTY_GARDEN_ID = 'empty-garden-id';

export const EMPTY_GARDEN: Garden = {
  id: EMPTY_GARDEN_ID,
  name: '',
  lawns: [],
  lawnItems: []
};

export const MAXIMUM_LAWNS = 5;
