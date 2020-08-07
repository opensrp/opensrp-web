import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Dictionary } from '@onaio/utils';
/** reducer name */
export declare const locationReducerName = "locHierarchy";
/** LOC_FETCHED action type */
export declare const LOC_FETCHED = "location/LOC_FETCHED";
/** REMOVE_LOC action_type */
export declare const REMOVE_LOC = "location/REMOVE_LOC";
/** parent location  interface*/
interface ParentLocation {
    locationId: string;
    name: string;
    voided: boolean;
}
/** location node interface */
export interface LocNode {
    locationId: string;
    name: string;
    parentLocation?: ParentLocation;
    tags?: string[];
    voided: boolean;
}
/** location children interface */
export interface LocChildren {
    children?: {
        [key: string]: LocChildren;
    };
    id: string;
    label: string;
    parent?: string;
    node: LocNode;
}
/** locationsHierarchy parentChildren  interface */
export declare type ParentChildren = Dictionary<string[]>;
/** locationsHierarchy map interface */
export declare type LocMap = Dictionary<LocChildren>;
/** crurrent Location interface */
export interface CurrentLoc {
    activeLocId?: string | null;
    defaultLocId?: string;
    map: LocMap | {};
    parentChildren: ParentChildren | {};
    selectedLocs?: string[];
}
/** location payload interface */
export interface LocPayload {
    locationsHierarchy: CurrentLoc;
}
/** interface for FetchLocAction action */
export interface FetchLocAction extends AnyAction {
    locations: CurrentLoc;
    type: typeof LOC_FETCHED;
}
/** RemoveLocAction interface for REMOVE_LOC_SETTINGS */
export interface RemoveLocAction extends AnyAction {
    type: typeof REMOVE_LOC;
    locations: {};
}
/** interface for location state */
export interface LocState {
    locations: CurrentLoc;
}
/** immutable location state */
export declare type ImmutableLocState = LocState & SeamlessImmutable.ImmutableObject<LocState>;
/** Create type for locations reducer actions */
export declare type LocTypes = FetchLocAction | RemoveLocAction | AnyAction;
/** the location reducer function */
export default function reducer(state: ImmutableLocState | undefined, action: LocTypes): ImmutableLocState;
/** removeLocAction */
export declare const removeLocAction: () => {
    locations: {
        map: {};
        parentChildren: {};
    };
    type: string;
};
/** fetchLocs */
export declare const fetchLocs: (locs: LocPayload) => FetchLocAction;
/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {parentChildren } locId children locactions
 */
export declare function getLocChildren(state: Partial<Store>, locId: string): string[];
/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {activeLocId } active location id
 */
export declare function getActiveLocId(state: Partial<Store>): string;
/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {defaultLocId } default location id
 */
export declare function getDefaultLocId(state: Partial<Store>): string;
/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {selectedLocs } selected locactions
 */
export declare function getSelectedLocs(state: Partial<Store>): string[];
/**  getLocDetails - get location details of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locIds}  - the location ids
 * @returns { locationDetails } locId children locactions
 */
export declare function getLocDetails(state: Partial<Store>, locId: string): LocChildren;
export {};
