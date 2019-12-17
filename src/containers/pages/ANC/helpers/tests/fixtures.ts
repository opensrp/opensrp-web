import { FilterStateAction } from '../hooks';

export const sampleFilter = (f: any) => !!f;
export const filterStateAction: FilterStateAction = {
  filterFunction: sampleFilter,
  filterId: 'random',
  misc: {
    activeCardId: '1',
  },
};

export const anotherFilterStateAction: FilterStateAction = {
  filterFunction: sampleFilter,
  filterId: 'sample',
  misc: {
    activeTab: '2',
  },
};
