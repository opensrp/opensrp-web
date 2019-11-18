import { AnyAction, Store } from 'redux';
import { get, keyBy, keys, values } from 'lodash';
import {Client} from './clients';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'households';

export const clientType = 'ec_household';

export const searchPlaceholder = 'Search Household';

/** Interface for household object same as client */
export type Household = Client;

/** HOUSEHOLDS_FETCHED action type */
export const HOUSEHOLDS_FETCHED = 'opensrp/reducer/households/HOUSEHOLDS_FETCHED';
/** REMOVE_HOUSEHOLDS action type */
export const REMOVE_HOUSEHOLDS = 'opensrp/reducer/households/REMOVE_HOUSEHOLDS';
/** SET_TOTAL_RECORDS action type */
export const SET_TOTAL_RECORDS = 'opensrp/reducer/households/SET_TOTAL_RECORDS';

/** interface for fetchHouseholdsAction */
interface FetchHouseholdsAction extends AnyAction {
    householdsById: { [key: string]: Household };
    type: typeof HOUSEHOLDS_FETCHED;
  }
  
  /** Interface for removeHouseholdsAction */
  interface RemoveHouseholdsAction extends AnyAction {
    householdsById: {};
    type: typeof REMOVE_HOUSEHOLDS;
  }
  
  /** Interface for setTotalRecordsAction */
  interface SetTotalRecordsAction extends AnyAction {
    totalRecords: number;
    type: typeof SET_TOTAL_RECORDS;
  }

  /** Create type for household reducer actions */
export type HouseholdActionTypes =
| FetchHouseholdsAction
| RemoveHouseholdsAction
| SetTotalRecordsAction
| AnyAction;

// action creators
/** Fetch households action creator
 * @param {Household []} householdList - households array to add to store
 * @return {FetchHouseholdsAction} - an action to add households to redux store
 */
export const fetchHouseholds = (householdsList: Household[] = []): FetchHouseholdsAction => ({
    householdsById: keyBy(householdsList, (household: Household) => household.baseEntityId),
    type: HOUSEHOLDS_FETCHED,
});

/** setTotalRecords action */
export const setTotalRecords = (totalCount: number): SetTotalRecordsAction => ({
    totalRecords: totalCount,
    type: SET_TOTAL_RECORDS,
});

//actions
export const removeHouseholds = (): RemoveHouseholdsAction => removeHouseholdsAction;

/** removeHouseholds action */
export const removeHouseholdsAction: RemoveHouseholdsAction = {
    householdsById: {},
    type: REMOVE_HOUSEHOLDS,
};

/** interface for household state in redux store */
interface HouseholdState {
    householdsById: { [key: string]: Household };
    totalRecords: number;
}

/** Create an immutable household state */
export type ImmutableHouseholdsState = HouseholdState & SeamlessImmutable.ImmutableObject<HouseholdState>;

/** initial households-state */
const initialState: ImmutableHouseholdsState = SeamlessImmutable({
    householdsById: {},
    totalRecords: 0,
});

/** the households reducer function */
export default function reducer(
    state: ImmutableHouseholdsState = initialState,
    action: HouseholdActionTypes
  ): ImmutableHouseholdsState {
    switch (action.type) {
      case HOUSEHOLDS_FETCHED:
        return SeamlessImmutable({
          ...state,
          householdsById: { ...state.householdsById, ...action.householdsById },
        });
      case REMOVE_HOUSEHOLDS:
        return SeamlessImmutable({
          ...state,
          householdsById: action.householdsById,
        });
      case SET_TOTAL_RECORDS:
        return SeamlessImmutable({
          ...state,
          totalRecords: action.totalRecords,
        });
      default:
        return state;
    }
}

/** returns all households in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Household} } - households object as values, respective ids as keys
 */
export function getHouseholdsById(state: Partial<Store>): { [key: string]: Household } {
    return (state as any)[reducerName].householdsById;
}

/** gets households as an array of households objects
 * @param {Partial<Store>} state - the redux store
 * @return {Household[]} - an array of households objs
 */
export function getHouseholdsArray(state: Partial<Store>): Household[] {
    return values(getHouseholdsById(state));
}
  
/** get a specific household by their id
 * @param {Partial<Store>} state - the redux store
 * @return {Household | null} a household obj if the id is found else null
 */
export function getHouseholdById(state: Partial<Store>, id: string): Household | null {
    return get(getHouseholdsById(state), id) || null;
}

/** returns the count of all records present in server
 * @param {Partial<Store>} state - the redux store
 * @return { number } - total records value from the store
 */
export function getTotalRecords(state: Partial<Store>): number {
    return (state as any)[reducerName].totalRecords;
}
  