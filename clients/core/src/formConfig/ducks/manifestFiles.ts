import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
} from '../../store/ducks/baseDux';

/** manifest files interface */
export interface ManifestFilesTypes {
    created_at: string;
    id: string;
    identifier: string;
    is_draft: boolean;
    is_json_validator: boolean;
    jursdiction: string;
    label: string;
    module: string;
    version: string;
}

/** reducer name */
export const reducerName = 'manifestFiles';

/** manifest files Reducer */
const reducer = reducerFactory<ManifestFilesTypes>(reducerName);

// action
/** fetch manifest files to store action */
export const fetchManifestFiles = fetchActionCreatorFactory<ManifestFilesTypes>(reducerName, 'id');

/** clear manifest files data in store action*/
export const removeManifestFiles = removeActionCreatorFactory(reducerName);

// selectors
export const getAllManifestFilesById = getItemsByIdFactory<ManifestFilesTypes>(reducerName);
export const getManifestFilesById = getItemByIdFactory<ManifestFilesTypes>(reducerName);
export const getAllManifestFilesArray = getItemsArrayFactory<ManifestFilesTypes>(reducerName);

export default reducer;
