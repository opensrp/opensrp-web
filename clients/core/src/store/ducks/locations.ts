import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'locations';

/** A single node for location hierarchy */
export interface LocationNode {
    [key: string]: {
        id: string;
        label: string;
        node: {
            locationId: string;
            name: string;
            parentLocation: {
                locationId: string;
                name: string;
                voided: boolean;
                parentLocation?: {
                    locationId: string;
                    name: string;
                    voided: boolean;
                };
            };
            tags: string[];
            voided: boolean;
        };
        children?: LocationNode;
    };
}

/** Interface for location object */
export interface LocationHierarchy {
    locationsHierarchy: {
        map: LocationNode;
    };
}

/** SET_LOCATION action type */
export const SET_LOCATIONS = 'opensrp/reducer/locations/SET_LOCATIONS';

/** Interface for setLocationAction */
interface SetLocationAction extends AnyAction {
    locations: LocationHierarchy;
    type: typeof SET_LOCATIONS;
}

/** Create type for location reducer actions */
export type LocationActionTypes = SetLocationAction | AnyAction;

/** setLocation action */
export const setLocations = (locations: LocationHierarchy): SetLocationAction => ({
    locations,
    type: SET_LOCATIONS,
});
