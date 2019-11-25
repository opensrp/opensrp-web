/** Provides a way to manage filter state for any component in a logic-customizable way */
import React from 'react';
import { statement } from '@babel/template';

/** Action types for filters */
export const filterAction = {
  types: {
    ADD: 'ADD',
  },
};

/** types for a function used as to filter */
type FilterFunction = <T>(dataObj: T) => boolean;

/** describes the base filter state */
interface FilterState {
  filter: { [filterId: string]: FilterFunction };
}

/** interface for add filter action */
export interface AddFilterAction {
  filter: { [filterId: string]: FilterFunction };
  overwrite: boolean;
  type: typeof filterAction.types.ADD;
}

/** single union type for all filterReducer actions */
export type actionTypes = AddFilterAction;

/** initial filterState */
const initialFilterState = {
  filter: {},
};

/** reducer for filter state
 * @param {FilterState} state -  the filter state
 * @param {actionTypes} action - the action
 */
function filterReducer(state: FilterState = initialFilterState, action: actionTypes) {
  switch (action.type) {
    case 'ADD': {
      const filtersToAdd = action.overwrite
        ? { ...action.filter }
        : { ...state.filter, ...action.filter };
      return {
        ...state,
        filter: filtersToAdd,
      };
    }
    default:
      return state;
  }
}

/** custom hook exposes the filter state and dispatch */
export function useFilters(reducer = <StateT, ActionT>(s: StateT, a: ActionT) => a.changes) {
  const { filterState, dispatch } = React.useReducer((state: any, action: any) => {
    const changes = filterReducer(state, action);
    return reducer(state, { ...action, changes });
  }, initialState);

  const addFilter = () => dispatch({ type: 'ADD' });
  return { filterState, addFilter };
}
