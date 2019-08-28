import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { FlexObject } from '../../helpers/utils';

/** The reducer name */
export const reducerName = 'clients';

/** Interface for client object as received from clientServices */
export interface Client {
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

/** Interface for household object same as client */
export type Household = Client;

// actions

/** CLIENTS_FETCHED action type */
export const CLIENTS_FETCHED = 'opensrp/reducer/clients/CLIENTS_FETCHED';
/** REMOVE_CLIENTS action type */
export const REMOVE_CLIENTS = 'opensrp/reducer/clients/REMOVE_CLIENTS';
/** HOUSEHOLDS_FETCHED action type */
export const HOUSEHOLDS_FETCHED = 'opensrp/reducer/clients/HOUSEHOLDS_FETCHED';

/** interface for authorize action */
export interface FetchClientsAction extends AnyAction {
  clientsById: { [key: string]: Client };
  type: typeof CLIENTS_FETCHED;
}

/** Interface for removeClientsAction */
interface RemoveClientsAction extends AnyAction {
  clientsById: {};
  type: typeof REMOVE_CLIENTS;
}

/** interface for fetchHouseholdsAction */
interface FetchHouseholdsAction extends AnyAction {
  householdsById: { [key: string]: Household };
  type: typeof HOUSEHOLDS_FETCHED;
}
/** Create type for clients reducer actions */
export type ClientsActionTypes =
  | FetchClientsAction
  | FetchHouseholdsAction
  | RemoveClientsAction
  | AnyAction;

// action Creators

/** Fetch clients action creator
 * @param {Client []} clientsList - clients array to add to store
 * @return {FetchClientsAction} - an action to add clients to redux store
 */
export const fetchClients = (clientsList: Client[] = []): FetchClientsAction => ({
  clientsById: keyBy(clientsList, (client: Client) => client._id),
  type: CLIENTS_FETCHED,
});

/** Fetch households action creator
 * @param {Household []} householdList - households array to add to store
 * @param {FetchHouseholdsAction} - an action to add households to redux store
 */
export const fetchHouseholds = (householdsList: Household[] = []): FetchHouseholdsAction => ({
  householdsById: keyBy(householdsList, (household: Household) => household._id),
  type: HOUSEHOLDS_FETCHED,
});

// actions

/** removeClientsAction action */
export const removeClientsAction = {
  clientsById: {},
  type: REMOVE_CLIENTS,
};

// The reducer

/** interface for clients state in redux store */
interface ClientState {
  clientsById: { [key: string]: Client };
  householdsById: { [key: string]: Household };
}

/** Create an immutable clients state */
export type ImmutableClientsState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** initial clients-state state */
const initialState: ImmutableClientsState = SeamlessImmutable({
  clientsById: {},
  householdsById: {},
});

/** the clients reducer function */
export default function reducer(
  state: ImmutableClientsState = initialState,
  action: ClientsActionTypes
): ImmutableClientsState {
  switch (action.type) {
    case CLIENTS_FETCHED:
      return SeamlessImmutable({
        ...state,
        clientsById: { ...state.clientsById, ...action.clientsById },
      });
    case REMOVE_CLIENTS:
      return SeamlessImmutable({
        ...state,
        clientsById: action.clientsById,
      });
    case HOUSEHOLDS_FETCHED:
      return SeamlessImmutable({
        ...state,
        householdsById: { ...state.householdsById, ...action.householdsById },
      });
    default:
      return state;
  }
}

// Selectors

/** returns all clients in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Client} } - clients object as values, respective ids as keys
 */
export function getClientsById(state: Partial<Store>): { [key: string]: Client } {
  return (state as any)[reducerName].clientsById;
}

/** get clients ids in an array
 * @param {Partial<Store>} state - the redux store
 * @return {string[]} - clients ids as an array of strings
 */
export function getClientsIdArray(state: Partial<Store>): string[] {
  return keys(getClientsById(state));
}

/** gets clients as an array of clients objects
 * @param {Partial<Store>} state - the redux store
 * @return {Client[]} - an array of clients objs
 */
export function getClientsArray(state: Partial<Store>): Client[] {
  return values(getClientsById(state));
}

/** get a specific client by their id
 * @param {Partial<Store>} state - the redux store
 * @return {Client | null} a client obj if the id is found else null
 */
export function getClientById(state: Partial<Store>, id: string): Client | null {
  return get(getClientsById(state), id) || null;
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
