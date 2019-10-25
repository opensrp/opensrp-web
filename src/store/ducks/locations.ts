import { LocationState } from 'history';
import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import { COMMUNE, DISTRICT, PROVINCE, VILLAGE } from '../../constants';

/** the reducer name */
export const reducerName = 'LocationReducer';

/** Interface for Location object received from discover */
interface Location {
  location_id: string;
  location_name: string;
  level: VILLAGE | COMMUNE | DISTRICT | PROVINCE;
  parent_id: string;
}

// actions

/** FETCH_LOCATION action type */
export const FETCHED_LOCATION = 'opensrp/reducer/FETCH_LOCATION';

/** REMOVE_LOCATION action type */
export const REMOVE_LOCATIONS = 'opensrp/reducer/REMOVE_LOCATIONS';

/** Interface for FetchLocationAction */
export interface FetchLocationsAction extends AnyAction {
  locations: { [key: string]: Location };
  type: typeof FETCHED_LOCATION;
}

export const removeLocations = {
  locations: [],
  type: REMOVE_LOCATIONS,
};

/** Location action types */
export type LocationActionTypes = FetchLocationsAction | AnyAction;

// action creators

/**
 * Fetch Location action creator
 * @param {Location[]} - Location array to add to store
 * @return {FetchLocationAction} - an action to add Location array to store
 */
export const fetchLocations = (locations: Location[] = []): FetchLocationsAction => {
  const fetchLocationsAction = {
    locations: keyBy(locations, (location: Location) => location.location_id),
    type: FETCHED_LOCATION as typeof FETCHED_LOCATION,
  };
  return fetchLocationsAction;
};

/** interface for locations state in redux store */
interface LocationsState {
  locations: { [key: string]: Location };
}

/** Initial location-state state */
const initialState: LocationsState = {
  locations: {},
};

export default function locationsReducer(
  state: LocationsState = initialState,
  action: LocationActionTypes
): LocationState {
  switch (action.type) {
    case FETCHED_LOCATION:
      return {
        ...state,
        locations: { ...state.locations, ...action.locations },
      };
    case REMOVE_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
      };
    default:
      return state;
  }
}

// Selectors

/** Return all Location data in the store as values whose
 * keys are their respective ids
 * @param {Partial<store>} state - the redux store
 * @return {Location[]}} - an array of Location objects
 */
export function getLocations(state: Partial<Store>): Location[] {
  return values((state as any)[reducerName].locations);
}

/**
 * Return locations of a certain level/administrative unit
 * @param {Partial<store>} state - the redux store
 * @param {String} level - the level/aministrative unit we would like to get from the store
 * @return {Location[]} - an array of location objects
 */
export function getLocationsOfLevel(state: Partial<Store>, level: string): Location[] {
  return values((state as any)[reducerName].locations).filter((location: Location) => {
    return location.level === level;
  });
}
