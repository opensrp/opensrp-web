import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from '../../store/ducks/baseDux';

/** json field interface */
export interface ManifestJsonFieldType {
    forms_version: string;
    identifiers: string[];
}

/** manifest releses interface */
export interface ManifestReleasesTypes {
    appId: string;
    appVersion: string;
    createdAt: string;
    identifier: string;
    json: string;
    updatedAt: string;
}

/** reducer name */
export const reducerName = 'manifestReleases';

/** manifest releases Reducer */
const reducer = reducerFactory<ManifestReleasesTypes>(reducerName);

// action
/** fetch manifest releases to store action */
export const fetchManifestReleases = fetchActionCreatorFactory<ManifestReleasesTypes>(reducerName, 'identifier');

/** clear manifest releases data in store action*/
export const removeManifestReleases = removeActionCreatorFactory(reducerName);

// selectors
export const getAllManifestReleasesById = getItemsByIdFactory<ManifestReleasesTypes>(reducerName);
export const getManifestReleasesById = getItemByIdFactory<ManifestReleasesTypes>(reducerName);
export const getAllManifestReleasesArray = getItemsArrayFactory<ManifestReleasesTypes>(reducerName);
export const getTotalManifestReleasesRecords = getTotalRecordsFactory(reducerName);

export default reducer;
