import { LocationState } from 'history';
import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
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

/** Interface for FetchLocationAction */
export interface FetchLocationsAction extends AnyAction {
  payload: { [key: string]: Location };
  type: typeof FETCHED_LOCATION;
}

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
    payload: keyBy(locations, (location: Location) => location.location_id),
    type: FETCHED_LOCATION as typeof FETCHED_LOCATION,
  };
  return fetchLocationsAction;
};

/** interface for locations state in redux store */
interface LocationsState {
  payload: { [key: string]: Location };
}

/** Initial location-state state */
const initialState: LocationsState = {
  payload: {},
};

export default function reducer(
  state: LocationsState = initialState,
  action: LocationActionTypes
): LocationState {
  switch (action.type) {
    case FETCHED_LOCATION:
      return {
        ...state,
        payload: { ...state.payload, ...action.payload },
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
  return values((state as any)[reducerName].smsDataFetched);
}

/**
 * Return locations of a certain level/administrative unit
 * @param {Partial<store>} state - the redux store
 * @param {String} level - the level/aministrative unit we would like to get from the store
 * @return {Location[]} - an array of location objects
 */
export function getLocationsOfLeve(state: Partial<Store>, level: string): Location[] {
  return values((state as any)[reducerName].smsDataFetched).filter((location: Location) => {
    return location.level === level;
  });
}
