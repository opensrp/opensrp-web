import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from '@opensrp/reducer-factory';

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
export const releasesReducerName = 'manifestReleases';

/** manifest releases Reducer */
const reducer = reducerFactory<ManifestReleasesTypes>(releasesReducerName);

// action
/** fetch manifest releases to store action */
export const fetchManifestReleases = fetchActionCreatorFactory<ManifestReleasesTypes>(
    releasesReducerName,
    'identifier',
);

/** clear manifest releases data in store action*/
export const removeManifestReleases = removeActionCreatorFactory(releasesReducerName);

// selectors
export const getAllManifestReleasesById = getItemsByIdFactory<ManifestReleasesTypes>(releasesReducerName);
export const getManifestReleasesById = getItemByIdFactory<ManifestReleasesTypes>(releasesReducerName);
export const getAllManifestReleasesArray = getItemsArrayFactory<ManifestReleasesTypes>(releasesReducerName);
export const getTotalManifestReleasesRecords = getTotalRecordsFactory(releasesReducerName);

export default reducer;
