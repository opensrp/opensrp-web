import { get, values } from 'lodash';
import { useState } from 'react';
import { FlexObject } from '../../../../helpers/utils';

/** types for a function used as to filter */
export type FilterFunction = <T>(dataObj: T) => boolean;

/** describes how filter state information will be stored ; a filter id as the key
 * whose value is the filter function and arbitrary miscellaneous obj.
 */
interface FilterState {
  [filterId: string]: FilterStateAction;
}

/** interface for dataObj handled by setFilterState */
export interface FilterStateAction {
  filterId: string;
  filterFunction: FilterFunction;
  misc: FlexObject;
}

/** encapsulates state holding functions that will be applied
 * to the store data as filters.
 */
export function useFilters() {
  const [filters, setFilters] = useState<FilterState>({});

  const addFilters = (action: FilterStateAction) =>
    setFilters({
      ...filters,
      [action.filterId]: { ...action },
    });

  const resetFilters = (action: FilterStateAction) =>
    setFilters({
      [action.filterId]: { ...action },
    });

  const getFilters = () => values(filters);
  const getFilterById = (filterId: string) => get(filters, filterId, null);

  const removeFilters = () => setFilters({});

  return { addFilters, resetFilters, getFilters, getFilterById, removeFilters };
}
