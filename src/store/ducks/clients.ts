/** The clients reducer module:
 * To implement:
 *  - clients object interface
 *  - action to fetch clients
 *  - The client's reducer
 *  - FetchClients action creator
 *  - selectors:
 *      - getclientById
 *      - getClientsArray
 *      - getClientsIdArray
 */
import { get, keyBy, keys, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'clients';

/** Interface for client object */
export interface Client {
  id: string;
  firstName: string;
  gender: string;
  lastName: string;
  type: string;
}

// actions

/** CLIENTS_FETCHED action type */
export const CLIENTS_FETCHED = 'opensrp/reducer/clients/CLIENTS_FETCHED'; // ??What is authorize action in this context?

/** interface for authorize action */
export interface FetchClientsAction extends AnyAction {
  clientsById: { [key: string]: Client };
  type: typeof CLIENTS_FETCHED;
}

/** Create type for clients reducer actions */
export type ClientsActionTypes = FetchClientsAction | AnyAction;

// action Creators

/** Fetch clients action creator
 * @param {Client []} clientsList - clients array to add to store
 * @return {FetchClientsAction} - an action to add clients to redux store
 */
export const fetchClients = (clientsList: Client[] = []): FetchClientsAction => ({
  clientsById: keyBy(clientsList, (client: Client) => client.id),
  type: CLIENTS_FETCHED,
});

// The reducer

/** interface for clients state in redux store */
interface ClientState {
  clientsById: { [key: string]: Client };
}

/** Create an immutable clients state */
export type ImmutableClientsState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** initial clients-state state */
const initialState: ImmutableClientsState = SeamlessImmutable({
  clientsById: {},
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
        clientsById: action.clientsById,
      });
    default:
      return state;
  }
}

// Selectors

/** returns all clients in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Client} } - clients object as values, reepective ids as keys
 */
export function getClients(state: Partial<Store>): { [key: string]: Client } {
  return (state as any)[reducerName].clientsById;
}

/** get clients ids in an array
 * @param {Partial<Store>} state - the reedux store
 * @return {string[]} - clients ids as an array of strings
 */
export function getClientsIdArray(state: Partial<Store>): string[] {
  return keys(getClients(state));
}

/** gets clients as an array of clients objects
 * @param {Partial<Store>} state - the redux store
 * @return {Client[]} - an array of clients objs
 */
export function getClientsArray(state: Partial<Store>): Client[] {
  return values(getClients(state));
}

/** get a specific client by their id
 * @param {Partial<Store>} state - the redux store
 * @return {Cllient | null} a client obj if the id is found else null
 */
export function getClientById(state: Partial<Store>, id: string): Client | null {
  return get(getClients(state), id) || null;
}
