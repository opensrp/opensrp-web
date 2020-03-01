import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'locations';

/** Inteface for Location */
export interface Location {
    id: string;
    label: string;
    parent?: string;
    node: {
        locationId: string;
        name: string;
        parentLocation?: ParentLocation;
        tags: string[];
        voided: boolean;
    };
    children?: LocationNode;
}

/** interface for the parent location. */
export interface ParentLocation {
    locationId: string;
    name: string;
    voided: boolean;
    parentLocation?: ParentLocation;
}
/** A single node for location hierarchy */
export interface LocationNode {
    [key: string]: Location;
}

/** Interface for location object */
export interface LocationHierarchy {
    locationsHierarchy: {
        map: LocationNode;
        parentChildren: {
            [key: string]: string[];
        };
    };
}

/** SET_LOCATION action type */
export const SET_LOCATIONS = 'opensrp/reducer/locations/SET_LOCATIONS';

/** Interface for setLocationAction */
interface SetLocationAction extends AnyAction {
    locations: LocationHierarchy | null;
    type: typeof SET_LOCATIONS;
}

/** Create type for location reducer actions */
export type LocationActionTypes = SetLocationAction | AnyAction;

/** setLocation action */
export const setLocations = (locations: LocationHierarchy | null): SetLocationAction => ({
    locations,
    type: SET_LOCATIONS,
});

/** interface for location state in redux store */
interface LocationState {
    locations: {
        [key: string]: LocationHierarchy;
    };
}

/** Create an immutable location state */
export type ImmutableLocationsState = LocationState & SeamlessImmutable.ImmutableObject<LocationState>;

/** initial locations-state */
const initialState: ImmutableLocationsState = SeamlessImmutable({
    locations: {},
});

/** the locations reducer function */
export default function reducer(
    state: ImmutableLocationsState = initialState,
    action: LocationActionTypes,
): ImmutableLocationsState {
    switch (action.type) {
        case SET_LOCATIONS:
            return SeamlessImmutable({
                locations: action.locations,
            });
        default:
            return state;
    }
}

/** get location hierarchy
 * @param {Partial<Store>} state - the redux store
 * @return {Household | null} a household obj if the id is found else null
 */
export function getLocationHierarchy(state: Partial<Store>): LocationHierarchy | null {
    return (state as any)[reducerName].locations;
}
