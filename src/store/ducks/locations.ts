import { LocationState } from 'history';
import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import { COMMUNE, DISTRICT, PROVINCE, VILLAGE } from '../../constants';

/** the reducer name */
export const reducerName = 'LocationReducer';

/** Interface for Location object received from discover */
export interface Location {
  location_id: string;
  location_name: string;
  level: VILLAGE | COMMUNE | DISTRICT | PROVINCE;
  parent_id: string;
}

export interface UserLocation {
  provider_name: string;
  provider_contact: string;
  provider_id: string;
  location_id: string | any;
  phone_number?: string;
  location_name: string;
}

export interface Locations {
  [key: string]: Location | UserLocation;
}

// actions

/** FETCH_USER_LOCATION action type */
export const FETCHED_USER_LOCATION = 'opensrp/reducer/FETCH_USER_LOCATION';

/** FETCH_LOCATION action type */
export const FETCHED_LOCATION = 'opensrp/reducer/FETCH_LOCATION';

/** REMOVE_LOCATION action type */
export const REMOVE_LOCATIONS = 'opensrp/reducer/REMOVE_LOCATIONS';

/** Interface for FetchLocationAction */
export interface FetchLocationsAction extends AnyAction {
  locations: { [key: string]: Location };
  type: typeof FETCHED_LOCATION;
}

/** Interface for FetchUserLocationAction */
export interface FetchUserLocationsAction extends AnyAction {
  userLocations: { [key: string]: UserLocation };
  type: typeof FETCHED_USER_LOCATION;
}

export const removeLocations = {
  locations: [],
  type: REMOVE_LOCATIONS,
};

/** Location action types */
export type LocationActionTypes = FetchLocationsAction | FetchUserLocationsAction | AnyAction;

// action creators

/**
 * Fetch Location action creator
 * @param {Location[]} - Location array to add to store
 * @return {FetchLocationAction} - an action to add Location array to store
 */
export const fetchLocations = (locations: Location[] = []): FetchLocationsAction => {
  return {
    locations: keyBy(locations, (location: Location) => location.location_id),
    type: FETCHED_LOCATION as typeof FETCHED_LOCATION,
  };
};

export const fetchUserLocations = (
  userLocations: UserLocation[] = []
): FetchUserLocationsAction => {
  const fetchUserLocationsAction = {
    type: FETCHED_USER_LOCATION as typeof FETCHED_USER_LOCATION,
    userLocations: keyBy(userLocations, (userLocation: UserLocation) => userLocation.provider_id),
  };
  return fetchUserLocationsAction;
};

/** interface for locations state in redux store */
interface LocationsState {
  locations: { [key: string]: Location };
  locationsFetched: boolean;
  userLocations: { [key: string]: UserLocation };
  userLocationsFetched: boolean;
}

/** Initial location-state state */
const initialState: LocationsState = {
  locations: {},
  locationsFetched: false,
  userLocations: {},
  userLocationsFetched: false,
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
        locationsFetched: true,
      };
    case FETCHED_USER_LOCATION:
      return {
        ...state,
        userLocations: { ...state.userLocations, ...action.userLocations },
        userLocationsFetched: true,
      };
    case REMOVE_LOCATIONS:
      return {
        ...state,
        locations: action.locations,
        locationsFetched: false,
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

/** Return all User Location data in the store as values whose
 * keys are their respective provider ids
 * @param {Partial<store>} state - the redux store
 * @return {UserLocation[]}} - an array of User Location objects
 */
export function getUserLocations(state: Partial<Store>): UserLocation[] {
  return values((state as any)[reducerName].userLocations);
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

/** Returns true if location data has been fetched from superset
 * and false otherwise
 */
export function locationsDataFetched(state: Partial<Store>): boolean {
  return (state as any)[reducerName].locationsFetched;
}

/** Returns true if user location details has been fetched from superset
 * and false otherwise
 */

export function userLocationDataFetched(state: Partial<Store>): boolean {
  return (state as any)[reducerName].userLocationsFetched;
}
