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
export const reducerName = 'opensrp-web/client-type/households';

/** Client Reducer */
const reducer = reducerFactory<Client>(reducerName);

/** Interface for household object same as client */
export type Household = Client;

// action creators
export const fetchHouseholds = fetchClientsFactory<Household>(reducerName);
export const removeHouseholds = removeClientsFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getHouseholdsById = getClientsByIdFactory<Household>(reducerName);
export const getHouseholdsArray = getClientsArrayFactory<Household>(reducerName);
export const getHouseholdById = getClientByIdFactory<Household>(reducerName);

export function getTotalRecords(state: Partial<Store>): number {
    return (state as any)[reducerName].totalRecords;
}

export default reducer;
