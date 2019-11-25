import React from 'react';

export const filterAction = {
  types: {
    ADD: 'ADD',
  },
};

type FilterFunction = <T>(dataObj: T) => boolean;

interface FilterState {
  filter: { [filterId: string]: FilterFunction };
}

// TODO - filterDefinition needs to be an object with a single dynamic property
export interface AddFilterAction {
  filter: { [filterId: string]: FilterFunction };
  overwrite: boolean;
  type: typeof filterAction.types.ADD;
}

export type actionTypes = AddFilterAction;

function filterReducer(state: FilterState, action: actionTypes) {
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

// {reducer = (s,a) => a.changes} = {}

const initialState = { filter: {} };

export function useFilters(reducer = (s: any, a: any) => a.changes) {
  const { filterState, dispatch } = React.useReducer((state: any, action: any) => {
    const changes = filterReducer(state, action);
    return reducer(state, { ...action, changes });
  }, initialState);

  const addFilter = () => dispatch({ type: 'ADD' });
  return { filterState, addFilter };
}
