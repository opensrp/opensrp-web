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
import { keyBy } from 'lodash';
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
 */
export const fetchClients = (clientsList: Client[] = []): FetchClientsAction => ({
  clientsById: keyBy(clientsList, (client: Client) => client.id),
  type: CLIENTS_FETCHED,
});
