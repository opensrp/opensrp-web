import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
} from './baseDux';

/** Interface for location tag object as received from LocationTagServices */
export interface LocationTag {
    id: string;
    name: string;
    description: string;
    active: boolean;
}

/** The reducer name */
export const reducerName = 'opensrp-web/locationTag/tags';

/** LocationTag Reducer */
const reducer = reducerFactory<LocationTag>(reducerName);

// action creators
export const fetchLocationTags = fetchActionCreatorFactory<LocationTag>(reducerName, 'id');
export const removeLocationTags = removeActionCreatorFactory(reducerName);

// Selectors
export const getLocationTagsById = getItemsByIdFactory<LocationTag>(reducerName);
export const getLocationtagsArray = getItemsArrayFactory<LocationTag>(reducerName);
export const getLocationTagById = getItemByIdFactory<LocationTag>(reducerName);

export default reducer;
