/// <reference types="lodash" />
import { ManifestFilesTypes } from './manifestFiles';
/** reducer name */
export declare const draftReducerName = "manifestDraftFiles";
/** manifest draft files Reducer */
declare const reducer: (state: import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestFilesTypes> | undefined, action: import("@opensrp/reducer-factory/dist/types").ItemsActionTypes<ManifestFilesTypes>) => import("@opensrp/reducer-factory/dist/types").ImmutableObjectState<ManifestFilesTypes>;
/** fetch manifest draft files to store action */
export declare const fetchManifestDraftFiles: (objectsList?: ManifestFilesTypes[] | undefined) => import("@opensrp/reducer-factory/dist/types").FetchAction<ManifestFilesTypes>;
/** clear manifest draft files data in store action*/
export declare const removeManifestDraftFiles: () => import("@opensrp/reducer-factory/dist/types").RemoveAction;
export declare const getAllManifestDraftFilesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => import("lodash").Dictionary<ManifestFilesTypes>;
export declare const getManifestDraftFilesById: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>, id: string) => ManifestFilesTypes | null;
export declare const getAllManifestDraftFilesArray: (state: Partial<import("redux").Store<any, import("redux").AnyAction>>) => ManifestFilesTypes[];
export default reducer;
