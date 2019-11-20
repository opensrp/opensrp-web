import { AnyAction, Store } from 'redux';
import { keyBy, values } from 'lodash';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'events';

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

  /** EVENTS_FETCHED action type */
export const EVENTS_FETCHED = 'opensrp/reducer/event/EVENTS_FETCHED';

/** interface for fetch events */
export interface FetchEventsAction extends AnyAction {
    eventsById: { [key: string]: Event };
    type: typeof EVENTS_FETCHED;
}

/** Fetch events action creator
 * @param {Event} events - events to add to store
 * @return {FetchEventsAction} - an action to add events to redux store
 */
export const fetchEvents = (eventsList: Event[]): FetchEventsAction => ({
    eventsById: keyBy(eventsList, (event: Event) => event.baseEntityId),
    type: EVENTS_FETCHED,
});

/** Create type for event reducer actions */
export type EventActionTypes = FetchEventsAction | AnyAction;
  
/** interface for event state in redux store */
interface EventState {
    eventsById: { [key: string]: Event };
}

/** Create an immutable event state */
export type ImmutableEventState = EventState & SeamlessImmutable.ImmutableObject<EventState>;

/** initial events-state state */
const initialState: ImmutableEventState = SeamlessImmutable({
    eventsById: {},
});

/** the event reducer function */
export default function reducer(
    state: ImmutableEventState = initialState,
    action: EventActionTypes
  ): ImmutableEventState {
    switch (action.type) {
      case EVENTS_FETCHED:
        return SeamlessImmutable({
          ...state,
          eventsById: action.eventsById,
        });
      
      default:
        return state;
    }
  }

// Selectors  

/** returns the events of the event in the store as array
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - events array
 */
export function getEventsArray(state: Partial<Store>): Event[] {
    return values((state as any)[reducerName].eventsById);
}

  /** returns the events of the event in the store by their ids
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - event objects as values, respective ids as keys
 */
export function getEventsById(state: Partial<Store>): { [key: string]: Event } {
    return (state as any)[reducerName].eventsById;
}