import { useState } from 'react';

/** types for a function used as to filter */
type FilterFunction = <T>(dataObj: T) => boolean;

/** describes how filter state information will be stored */
interface FilterState {
  [k: string]: {
    filter: FilterFunction;
    [key: string]: any;
  };
}

/** interface for dataObj handled by setFilterState */
interface FilterStateAction {
  filterId: string;
  filterFunction: FilterFunction;
  overwrite: boolean;
  properties: { [key: string]: any };
}

export function useFilters() {
  const [filterState, setFilterState] = useState<FilterState>({});

  const addFilter = (action: FilterStateAction) => {
    const filterToAdd: FilterState = action.overwrite
      ? {
          [action.filterId]: { filter: action.filterFunction, ...action.properties },
        }
      : {
          ...filterState,
          [action.filterId]: { filter: action.filterFunction, ...action.properties },
        };
    setFilterState(filterToAdd);
  };

  return [filterState, addFilter, setFilterState];
}
