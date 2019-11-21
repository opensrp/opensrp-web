import { values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Client } from './clients';

/** The reducer name */
export const reducerName = 'client';

/** CLIENT_FETCHED action type */
export const CLIENT_FETCHED = 'opensrp/reducer/client/CLIENT_FETCHED';



/** interface for fetch client */
export interface FetchClientAction extends AnyAction {
  clientById: { [key: string]: Client };
  type: typeof CLIENT_FETCHED;
}

// actions

// action Creators

/** Fetch client action creator
 * @param {Client} client - client to add to store
 * @return {FetchClientAction} - an action to add client to redux store
 */
export const fetchClient = (client: Client): FetchClientAction => ({
  clientById: { [client.baseEntityId]: client },
  type: CLIENT_FETCHED,
});

/** Create type for client reducer actions */
export type ClientActionTypes = FetchClientAction | AnyAction;

// The reducer

/** interface for client state in redux store */
interface ClientState {
  clientById: { [key: string]: Client };
  membersById: { [key: string]: Client };
}

/** Create an immutable client state */
export type ImmutableClientState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** initial clients-state state */
const initialState: ImmutableClientState = SeamlessImmutable({
  clientById: {},
  membersById: {},
});

/** the client reducer function */
export default function reducer(
  state: ImmutableClientState = initialState,
  action: ClientActionTypes
): ImmutableClientState {
  switch (action.type) {
    case CLIENT_FETCHED:
      return SeamlessImmutable({
        ...state,
        clientById: action.clientById,
      });
    default:
      return state;
  }
}

// Selectors

/** returns the client in the store by its id
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - client object as value, id as key
 */
export function getClientById(state: Partial<Store>): { [key: string]: Client } {
  return (state as any)[reducerName].clientById;
}

/** returns the client object in the store
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - client object
 */
export function getClient(state: Partial<Store>): Client {
  const client = getClientById(state);
  return values(client)[0];
}


