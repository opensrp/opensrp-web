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
export const reducerName = 'opensrp-web/admin/location';

/** Interface for Location object */

export interface LocationTag {
    id: number;
    active: boolean;
    name: string;
    description: string;
}
export interface Location {
    type: string;
    id: number | string;
    properties: {
        uid: string;
        type: string;
        status: string;
        parentId: string;
        name: string;
        geographicLevel: number;
        effectiveStartDate: string;
        version: number;
        parentName: string;
        tagName: string;
    };
    serverVersion: number;
    locationTags: LocationTag[];
}

/** Client Reducer */
const reducer = reducerFactory<Location>(reducerName);

// action creators
export const fetchLocationList = fetchActionCreatorFactory<Location>(reducerName, 'id');
export const removeLocationList = removeActionCreatorFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getLocationListById = getItemsByIdFactory<Location>(reducerName);
export const getLocationArray = getItemsArrayFactory<Location>(reducerName);
export const getLocationById = getItemByIdFactory<Location>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
