import { Client } from './clients';
import {
    fetchClientsFactory,
    removeClientsFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getClientsByIdFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
    getTotalRecordsFactory,
} from './baseClients';

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/households';

/** Interface for household object same as client */
export type Household = Client;

/** Client Reducer */
const reducer = reducerFactory<Household>(reducerName);

// action creators
export const fetchHouseholds = fetchClientsFactory<Household>(reducerName);
export const removeHouseholds = removeClientsFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getHouseholdsById = getClientsByIdFactory<Household>(reducerName);
export const getHouseholdsArray = getClientsArrayFactory<Household>(reducerName);
export const getHouseholdById = getClientByIdFactory<Household>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
