import {
    fetchFactory,
    removeFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
    BaseDux,
} from './baseDux';

/** Interface for event object as received from event search */
export interface Event extends BaseDux {
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

/** The reducer name */
export const reducerName = 'opensrp-web/events';

/** Client Reducer */
const reducer = reducerFactory<Event>(reducerName);

// action creators
export const fetchChildList = fetchFactory<Event>(reducerName);
export const removeChildList = removeFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getChildListById = getItemsByIdFactory<Event>(reducerName);
export const getChildArray = getItemsArrayFactory<Event>(reducerName);
export const getChildById = getItemByIdFactory<Event>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
