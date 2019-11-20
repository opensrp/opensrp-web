import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Client } from './clients';

/** The reducer name */
export const reducerName = 'client';

/** CLIENT_FETCHED action type */
export const CLIENT_FETCHED = 'opensrp/reducer/client/CLIENT_FETCHED';

/** MEMBERS_FETCHED action type */
export const MEMBERS_FETCHED = 'opensrp/reducer/client/MEMBERS_FETCHED';

/** interface for fetch client */
export interface FetchClientAction extends AnyAction {
  clientById: { [key: string]: Client };
  type: typeof CLIENT_FETCHED;
}

/** interface for fetch members */
export interface FetchMembersAction extends AnyAction {
  membersById: { [key: string]: Client };
  type: typeof MEMBERS_FETCHED;
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

/** Fetch members action creator
 * @param {Event} members - members to add to store
 * @return {FetchMembersAction} - an action to add members to redux store
 */
export const fetchMembers = (membersList: Client[]): FetchMembersAction => ({
  membersById: keyBy(membersList, (member: Client) => member.baseEntityId),
  type: MEMBERS_FETCHED,
});

/** Create type for client reducer actions */
export type ClientActionTypes =
  | FetchClientAction

  | FetchMembersAction
  | AnyAction;

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
    case MEMBERS_FETCHED:
      return SeamlessImmutable({
        ...state,
        membersById: action.membersById,
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

/** returns the members of the client in the store by their ids
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - client objects as values, respective ids as keys
 */
export function getMembersById(state: Partial<Store>): { [key: string]: Client } {
  return (state as any)[reducerName].membersById;
}

/** returns the members of the client as array
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - members array
 */
export function getMembersArray(state: Partial<Store>): Client[] {
  return values((state as any)[reducerName].membersById);
}
