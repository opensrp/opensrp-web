import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { FlexObject } from '../../helpers/utils';

/** The reducer name */
export const reducerName = 'households';

/** Interface for household object as received from clientServices. Used Client instead of Household */
export interface Household {
  type: 'Client';
  dateCreated: number;
  serverVersion: number;
  clientApplicationVersion: number;
  clientDatabaseVersion: number;
  baseEntityId: string;
  identifiers: { [key: string]: string | null };
  addresses: FlexObject[];
  attributes: FlexObject;
  firstName: string;
  lastName: string;
  birthdate: number;
  middleName?: string;
  birthdateApprox: boolean;
  deathdateApprox: boolean;
  gender?: string;
  relationships: {
    [key: string]: string[];
  };
  _id: string;
  _rev: string;
}

// actions

/** HOUSEHOLDS_FETCHED action type */
export const HOUSEHOLDS_FETCHED = 'opensrp/reducer/households/HOUSEHOLDS_FETCHED';

/** interface for FetchHouseholdsAction action */
export interface FetchHouseholdsAction extends AnyAction {
  householdsById: { [key: string]: Household };
  type: typeof HOUSEHOLDS_FETCHED;
}

/** Create type for households reducer actions */
export type HouseholdsActionTypes = FetchHouseholdsAction | AnyAction;
// action Creators

/** Fetch households action creator
 * @param {Household []} householdsList - houeholds array to add to store
 * @return {FetchHouseholdsAction} - an action to add households to redux store
 */
export const fetchHouseholds = (householdsList: Household[] = []): FetchHouseholdsAction => ({
  householdsById: keyBy(householdsList, (household: Household) => household._id),
  type: HOUSEHOLDS_FETCHED,
});

// The reducer

/** interface for clients state in redux store */
interface HouseholdState {
  householdsById: { [key: string]: Household };
}

/** Create an immutable clients state */
export type ImmutableHouseholdsState = HouseholdState &
  SeamlessImmutable.ImmutableObject<HouseholdState>;

/** initial clients-state state */
const initialState: ImmutableHouseholdsState = SeamlessImmutable({
  householdsById: {},
});

/** the clients reducer function */
export default function reducer(
  state: ImmutableHouseholdsState = initialState,
  action: HouseholdsActionTypes
): ImmutableHouseholdsState {
  switch (action.type) {
    case HOUSEHOLDS_FETCHED:
      return SeamlessImmutable({
        ...state,
        householdsById: action.householdsById,
      });
    default:
      return state;
  }
}

// Selectors

/** returns all households in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Household} } - households object as values, respective ids as keys
 */
export function getHouseholds(state: Partial<Store>): { [key: string]: Household } {
  return (state as any)[reducerName].householdsById;
}

/** gets households as an array of hosueholds objects
 * @param {Partial<Store>} state - the redux store
 * @return {Household[]} - an array of households objs
 */
export function getHouseholdsArray(state: Partial<Store>): Household[] {
  return values(getHouseholds(state));
}
