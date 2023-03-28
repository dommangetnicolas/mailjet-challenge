import { Garden } from './types/Garden';

const EMPTY_GARDEN_ID = 10;

export const EMPTY_GARDEN: Garden = {
  id: EMPTY_GARDEN_ID,
  name: '',
  lawns: [],
  lawnItems: [],
  createdAt: undefined,
  updatedAt: undefined,
};

export const MAXIMUM_LAWNS = 5;

export const GARDEN_PREFIX = 'garden-';

export const GARDEN_NAME_LENGTH = 10;
