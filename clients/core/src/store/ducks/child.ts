import { Client } from './clients';
import {
    fetchActionCreatorFactory,
    removeFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from './baseDux';

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/child';

/** Interface for Child object same as client */
export type Child = Client;

/** Client Reducer */
const reducer = reducerFactory<Child>(reducerName);

// action creators
export const fetchChildList = fetchActionCreatorFactory<Child>(reducerName, 'baseEntityId');
export const removeChildList = removeFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getChildListById = getItemsByIdFactory<Child>(reducerName);
export const getChildArray = getItemsArrayFactory<Child>(reducerName);
export const getChildById = getItemByIdFactory<Child>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
