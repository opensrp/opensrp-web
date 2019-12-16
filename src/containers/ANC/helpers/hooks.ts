import { useState } from 'react';

/** describes how filter params will be stored */
interface FilterParamState {
  [key: string]: string;
}

/** interface for dataObj handled by setFilterParam */
type FilterStateAction = FilterParamState;

/** hook to manage filter parameter's state; i.e
 * parameters that will be added to the url as query string
 */
export function useParamFilters() {
  const [filterParams, setFilterFilterParams] = useState<FilterParamState>({});

  /** filter params will be added to those already existing
   * @param {FilterStateAction} params - the filter param to add to state
   */
  const addFilters = (params: FilterStateAction) =>
    setFilterFilterParams({ ...filterParams, ...params });

  /** repopulates the state with new filter params */
  const resetFilters = (params: FilterStateAction) => setFilterFilterParams({ ...params });

  return { filterParams, setFilterFilterParams, addFilters, resetFilters };
}
