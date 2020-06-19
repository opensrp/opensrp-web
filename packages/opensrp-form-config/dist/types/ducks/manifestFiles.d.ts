/// <reference types="lodash" />
/** manifest files interface */
export interface ManifestFilesTypes {
    createdAt: string;
    form_relation: string;
    id: string;
    identifier: string;
    isDraft: boolean;
    isJsonValidator: boolean;
    jursdiction: string;
    label: string;
    module: string;
    version: string;
}
/** reducer name */
export declare const filesReducerName = "manifestFiles";
/** manifest files Reducer */
declare const reducer: (state: import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestFilesTypes> | undefined, action: import("@opensrp/reducer-factory/dist/types").ItemsActionTypes<ManifestFilesTypes>) => import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestFilesTypes>;
/** fetch manifest files to store action */
export declare const fetchManifestFiles: (objectsList?: ManifestFilesTypes[] | undefined) => import("@opensrp/reducer-factory/dist/types").FetchAction<ManifestFilesTypes>;
/** clear manifest files data in store action*/
export declare const removeManifestFiles: () => import("@opensrp/reducer-factory/dist/types").RemoveAction;
export declare const getAllManifestFilesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => import("lodash").Dictionary<ManifestFilesTypes>;
export declare const getManifestFilesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>, id: string) => ManifestFilesTypes | null;
export declare const getAllManifestFilesArray: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => ManifestFilesTypes[];
export default reducer;
