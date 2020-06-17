import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
} from '@opensrp/reducer-factory';
import { ManifestFilesTypes } from './manifestFiles';

/** reducer name */
export const reducerName = 'manifestDraftFiles';

/** manifest draft files Reducer */
const reducer = reducerFactory<ManifestFilesTypes>(reducerName);

// action
/** fetch manifest draft files to store action */
export const fetchManifestDraftFiles = fetchActionCreatorFactory<ManifestFilesTypes>(reducerName, 'id');

/** clear manifest draft files data in store action*/
export const removeManifestDraftFiles = removeActionCreatorFactory(reducerName);

// selectors
export const getAllManifestDraftFilesById = getItemsByIdFactory<ManifestFilesTypes>(reducerName);
export const getManifestDraftFilesById = getItemByIdFactory<ManifestFilesTypes>(reducerName);
export const getAllManifestDraftFilesArray = getItemsArrayFactory<ManifestFilesTypes>(reducerName);

export default reducer;
