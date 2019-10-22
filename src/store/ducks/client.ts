import { AnyAction } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Client } from './clients';

/** Interface for event object as received from event search */
export interface Event {
  type: 'Event';
  dateCreated: number;
  serverVersion: number;
  clientApplicationVersion: number;
  clientDatabaseVersion: number;
  identifiers: { [key: string]: string | null };
  baseEntityId: string;
  locationId: string;
  eventDate: number;
  eventType: string;
  formSubmissionId: string;
  providerId: string;
  duration: number;
  obs: { [key: string]: string[] | string | null };
  entityType: string;
  version: number;
  teamId: string;
  team: string;
  _id: string;
  _rev: string;
}

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
  eventsById: { [key: string]: Event };
  membersById: { [key: string]: Client };
}

/** Create an immutable client state */
export type ImmutableClientState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** initial clients-state state */
const initialState: ImmutableClientState = SeamlessImmutable({
  clientById: {},
  eventsById: {},
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
        clientById: action.client,
      });
    default:
      return state;
  }
}
