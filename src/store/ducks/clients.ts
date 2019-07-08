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
