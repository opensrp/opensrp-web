import { Client } from './clients';
import {
    fetchClientsFactory,
    removeClientsFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getClientsByIdFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
} from './baseClients';
import { Store } from 'redux';

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/child';

/** Interface for household object same as client */
export type Child = Client;

/** Client Reducer */
const reducer = reducerFactory<Child>(reducerName);

// action creators
export const fetchChildList = fetchClientsFactory<Child>(reducerName);
export const removeChildList = removeClientsFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getChildListById = getClientsByIdFactory<Child>(reducerName);
export const getChildArray = getClientsArrayFactory<Child>(reducerName);
export const getChildById = getClientByIdFactory<Child>(reducerName);

export function getTotalRecords(state: Partial<Store>): number {
    return (state as any)[reducerName].totalRecords;
}

export default reducer;
