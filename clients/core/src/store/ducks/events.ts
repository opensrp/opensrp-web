import { keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
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
    obs: Array<{ [key: string]: string[] | string | null }>;
    entityType: string;
    version: number;
    teamId: string;
    team: string;
    _id: string;
    _rev: string;
    isSendToOpenMRS: string;
}

/** EVENTS_FETCHED action type */
export const EVENTS_FETCHED = 'opensrp/reducer/event/EVENTS_FETCHED';
/** REMOVE_EVENTS action type */
export const REMOVE_EVENTS = 'opensrp/reducer/event/REMOVE_EVENTS';

/** interface for fetch events */
export interface FetchEventsAction extends AnyAction {
    eventsById: { [key: string]: Event };
    type: typeof EVENTS_FETCHED;
}

/** interface for remove events */
export interface RemoveEventsAction extends AnyAction {
    eventsById: { [key: string]: Event };
    type: typeof REMOVE_EVENTS;
}

/** Fetch events action creator
 * @param {Event} events - events to add to store
 * @return {FetchEventsAction} - an action to add events to redux store
 */
export const fetchEvents = (eventsList: Event[]): FetchEventsAction => ({
    eventsById: keyBy(eventsList, (event: Event) => event.baseEntityId),
    type: EVENTS_FETCHED,
});

/** Fetch events action creator
 * @param {Event} events - events to add to store
 * @return {FetchEventsAction} - an action to add events to redux store
 */
export const removeEventsAction = (): RemoveEventsAction => ({
    eventsById: {},
    type: REMOVE_EVENTS,
});

/** Create type for event reducer actions */
export type EventActionTypes = FetchEventsAction | RemoveEventsAction | AnyAction;

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
    action: EventActionTypes,
): ImmutableEventState {
    switch (action.type) {
        case EVENTS_FETCHED:
            return SeamlessImmutable({
                ...state,
                eventsById: { ...state.eventsById, ...action.eventsById },
            });
        case REMOVE_EVENTS:
            return SeamlessImmutable({
                ...state,
                eventsById: action.eventsById,
            });

        default:
            return state;
    }
}

// Selectors

/** returns an array of events
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - events array
 */
export function getEventsArray(state: Partial<Store>): Event[] {
    return values(getEventsById(state));
}

/** returns the events with their ids
 * @param {Partial<Store>} state - the redux store
 * @return { Event } - event objects as values, respective ids as keys
 */
export function getEventsById(state: Partial<Store>): { [key: string]: Event } {
    return (state as any)[reducerName].eventsById;
}
