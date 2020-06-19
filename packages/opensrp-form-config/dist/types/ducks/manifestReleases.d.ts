/// <reference types="lodash" />
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
export declare const releasesReducerName = "manifestReleases";
/** manifest releases Reducer */
declare const reducer: (state: import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestReleasesTypes> | undefined, action: import("@opensrp/reducer-factory/dist/types").ItemsActionTypes<ManifestReleasesTypes>) => import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestReleasesTypes>;
/** fetch manifest releases to store action */
export declare const fetchManifestReleases: (objectsList?: ManifestReleasesTypes[] | undefined) => import("@opensrp/reducer-factory/dist/types").FetchAction<ManifestReleasesTypes>;
/** clear manifest releases data in store action*/
export declare const removeManifestReleases: () => import("@opensrp/reducer-factory/dist/types").RemoveAction;
export declare const getAllManifestReleasesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => import("lodash").Dictionary<ManifestReleasesTypes>;
export declare const getManifestReleasesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>, id: string) => ManifestReleasesTypes | null;
export declare const getAllManifestReleasesArray: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => ManifestReleasesTypes[];
export declare const getTotalManifestReleasesRecords: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => number;
export default reducer;
