import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** reducer name */
export const reducerName = 'locHierarchy';

/** LOC_FETCHED action type */
export const LOC_FETCHED = 'location/LOC_FETCHED';

/** REMOVE_LOC action_type */
export const REMOVE_LOC = 'location/REMOVE_LOC';

/** location node interface */

export interface LocNode {
    locationId: string;
    name: string;
    tags: Array<string>;
}

/** location children interface */
export interface LocChildren {
    id: string;
    label: string;
    node: LocNode;
    parent?: string;
    children?: { [key: string]: LocChildren };
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
    map: LocMap;
    parentChildren: ParentChildren;
}

/** location payload interface */
export interface LocPayload {
    locationsHierarchy: {
        map: LocMap;
        parentChildren: ParentChildren;
    };
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
                locations: { ...state.locations },
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

/** removeLocSettingAction */
export const removeLocAction: RemoveLocAction = {
    locations: {
        map: {},
        parentChildren: {},
    },
    type: REMOVE_LOC,
};

/** fetchLocSettings */
export const fetchLocSettings = (locs: LocPayload): FetchLocAction => {
    const map = locs.locationsHierarchy.map;
    const parentChildren = locs.locationsHierarchy.parentChildren;
    return {
        locations: {
            map,
            parentChildren,
        },
        type: LOC_FETCHED,
    };
};

/** getLocChildren - get parentChildren of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {parentChildren } locId children locactions
 */
export function getLocChildren(state: Partial<Store>, locId: string): Array<string> {
    return (state as any)[reducerName].locations.parentChildren[locId];
}

/**  getLocDetails - get location details of locId
 * @param {Partial<Store>} state - the redux store
 * @param {locIds}  - the location ids
 * @returns { locationDetails } locId children locactions
 */
export function getLocDetails(state: Partial<Store>, locIds: Array<string>): LocChildren {
    let locDetails = (state as any)[reducerName].locations.map[locIds[0]];
    if (locIds.length === 1) {
        return locDetails;
    } else {
        for (let i = 1; i < locIds.length; i++) {
            locDetails = locDetails.children[locIds[i]];
        }
    }
    return locDetails;
}
