import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** reducer name */
export const reducerName = 'locHierarchy';

/** LOC_FETCHED action type */
export const LOC_FETCHED = 'location/LOC_FETCHED';

/** REMOVE_LOC action_type */
export const REMOVE_LOC = 'location/REMOVE_LOC';

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
    children?: { [key: string]: LocChildren };
    id: string;
    label: string;
    parent?: string;
    node: LocNode;
}

/** locationsHierarchy parentChildren  interface */
export interface ParentChildren {
    [key: string]: Array<string>;
}

/** locationsHierarchy map interface */
export interface LocMap {
    [key: string]: LocChildren;
}

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
export type ImmutableLocState = LocState & SeamlessImmutable.ImmutableObject<LocState>;

/** initial location state */
const initialState: ImmutableLocState = SeamlessImmutable({
    locations: {
        map: {},
        parentChildren: {},
        activeLocId: null,
    },
});

/** Create type for locations reducer actions */
export type LocTypes = FetchLocAction | RemoveLocAction | AnyAction;

/** the location reducer function */
export default function reducer(state = initialState, action: LocTypes): ImmutableLocState {
    switch (action.type) {
        case LOC_FETCHED:
            return SeamlessImmutable({
                ...state,
                locations: {
                    ...state.locations,
                    ...action.locations,
                    map: { ...state.locations.map, ...action.locations.map },
                    parentChildren: { ...state.locations.parentChildren, ...action.locations.parentChildren },
                },
            });
        case REMOVE_LOC:
            return SeamlessImmutable({
                ...state,
                locations: action.locations,
            });
        default:
            return state;
    }
}

/** removeLocAction */
export const removeLocAction = () => ({
    locations: {
        map: {},
        parentChildren: {},
    },
    type: REMOVE_LOC,
});

/** fetchLocs */
export const fetchLocs = (locs: LocPayload): FetchLocAction => {
    const map = locs.locationsHierarchy.map;
    const parentChildren = locs.locationsHierarchy.parentChildren;
    const defaultLoc: string = map && Object.keys(map)[0];
    const activeLocId = locs.locationsHierarchy.activeLocId || defaultLoc;
    const defaultLocId = locs.locationsHierarchy.defaultLocId || defaultLoc;
    let selectedLocs = locs.locationsHierarchy.selectedLocs;
    if (!selectedLocs) {
        selectedLocs = activeLocId ? [activeLocId] : [];
    }

    return {
        locations: {
            map,
            parentChildren,
            activeLocId,
            selectedLocs,
            defaultLocId,
        },
        type: LOC_FETCHED,
    };
};

/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {parentChildren } locId children locactions
 */
export function getLocChildren(state: Partial<Store>, locId: string): string[] {
    return (state as any)[reducerName].locations.parentChildren[locId] || [];
}

/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {activeLocId } active location id
 */
export function getActiveLocId(state: Partial<Store>): string {
    return (state as any)[reducerName].locations.activeLocId || null;
}

/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {defaultLocId } default location id
 */
export function getDefaultLocId(state: Partial<Store>): string {
    return (state as any)[reducerName].locations.defaultLocId || null;
}

/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @returns {selectedLocs } selected locactions
 */
export function getSelectedLocs(state: Partial<Store>): string[] {
    return (state as any)[reducerName].locations.selectedLocs || [];
}

/**  getLocDetails - get location details of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locIds}  - the location ids
 * @returns { locationDetails } locId children locactions
 */
export function getLocDetails(state: Partial<Store>, locIds: string[]): LocChildren {
    let locDetails = (state as any)[reducerName].locations.map[locIds[0]];
    if (locIds.length === 1) {
        return locDetails || {};
    } else {
        for (let i = 1; i < locIds.length; i++) {
            locDetails = locDetails.children[locIds[i]];
        }
    }
    return locDetails;
}
