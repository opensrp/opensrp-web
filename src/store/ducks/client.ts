import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
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

/** EVENTS_FETCHED action type */
export const EVENTS_FETCHED = 'opensrp/reducer/client/EVENTS_FETCHED';

/** MEMBERS_FETCHED action type */
export const MEMBERS_FETCHED = 'opensrp/reducer/client/MEMBERS_FETCHED';

/** interface for fetch client */
export interface FetchClientAction extends AnyAction {
  clientById: { [key: string]: Client };
  type: typeof CLIENT_FETCHED;
}

/** interface for fetch events */
export interface FetchEventsAction extends AnyAction {
  eventsById: { [key: string]: Event };
  type: typeof EVENTS_FETCHED;
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

/** Fetch events action creator
 * @param {Event} events - events to add to store
 * @return {FetchEventsAction} - an action to add events to redux store
 */
export const fetchEvents = (eventsList: Event[]): FetchEventsAction => ({
  eventsById: keyBy(eventsList, (event: Event) => event.baseEntityId),
  type: EVENTS_FETCHED,
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
  | FetchEventsAction
  | FetchMembersAction
  | AnyAction;

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
        clientById: action.clientById,
      });
    case EVENTS_FETCHED:
      return SeamlessImmutable({
        ...state,
        eventsById: action.eventsById,
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

/** returns the events of the client in the store by their ids
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - event objects as values, respective ids as keys
 */
export function getEventsById(state: Partial<Store>): { [key: string]: Event } {
  return (state as any)[reducerName].eventsById;
}

/** returns the events of the client in the store as array
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - events array
 */
export function getEventsArray(state: Partial<Store>): Event[] {
  return values((state as any)[reducerName].eventsById);
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
