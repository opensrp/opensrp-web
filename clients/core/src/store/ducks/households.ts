import { Client } from './clients';
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

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/households';

/** Interface for household object same as client */
export type Household = Client;

/** Client Reducer */
const reducer = reducerFactory<Household>(reducerName);

// action creators
export const fetchHouseholds = fetchActionCreatorFactory<Household>(reducerName, 'baseEntityId');
export const removeHouseholds = removeActionCreatorFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getHouseholdsById = getItemsByIdFactory<Household>(reducerName);
export const getHouseholdsArray = getItemsArrayFactory<Household>(reducerName);
export const getHouseholdById = getItemByIdFactory<Household>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
