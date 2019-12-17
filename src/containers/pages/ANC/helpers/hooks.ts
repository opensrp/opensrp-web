import { useState } from 'react';

/** types for a function used as to filter */
export type FilterFunction = <T>(dataObj: T) => boolean;

/** describes how filter state information will be stored */
interface FilterState {
  [k: string]: {
    filter: FilterFunction;
    [key: string]: any;
  };
}

/** interface for dataObj handled by setFilterState */
export interface FilterStateAction {
  filterId: string;
  filterFunction: FilterFunction;
  properties: { [key: string]: any };
}

/** encapsulates state holding functions that will be applied
 * to the store data as filters.
 */
export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({});

  const addFilters = (action: FilterStateAction) =>
    setFilters({
      ...filters,
      [action.filterId]: { filter: action.filterFunction, ...action.properties },
    });

  const resetFilters = (action: FilterStateAction) =>
    setFilters({
      [action.filterId]: { filter: action.filterFunction, ...action.properties },
    });

  return [filters, addFilters, setFilters, resetFilters];
}
