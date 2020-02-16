import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from './baseDux';

/** Interface for event object as received from event search */
export interface Event {
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
    type: string;
}

/** The reducer name */
export const reducerName = 'opensrp-web/events';

/** Client Reducer */
const reducer = reducerFactory<Event>(reducerName);

// action creators
export const fetchEvents = fetchActionCreatorFactory<Event>(reducerName, 'baseEntityId');
export const removeEvents = removeActionCreatorFactory(reducerName);

// selectors
export const getEventsById = getItemsByIdFactory<Event>(reducerName);
export const getEventsArray = getItemsArrayFactory<Event>(reducerName);
export const getChildById = getItemByIdFactory<Event>(reducerName);

export default reducer;
