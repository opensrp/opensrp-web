/**
 * Given the location id and the loc map, return the location
 * details by traversing the loc map hierarchy
 * @param locMap - the loc map
 * @param locId - the loc id
 */

import { LocChildren, LocMap } from '.';

export function getLocationDetailsFromLocMap(locMap: LocMap, locId: string): LocChildren {
    const locationIds = Object.keys(locMap);
    let i = 0;
    let locFound = false;
    let locDetails = null;

    while (!locFound && i < locationIds.length) {
        const currentLocationId = locationIds[i];
        const currentLocDetails = locMap[currentLocationId];

        if (currentLocationId === locId) {
            locDetails = currentLocDetails;
            locFound = true;
        } else {
            if (currentLocDetails.children) {
                return getLocationDetailsFromLocMap(currentLocDetails.children, locId);
            }
        }

        i += 1;
    }

    return locDetails || ({} as LocChildren);
}
