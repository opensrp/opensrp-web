/**
 * Given the location id and the loc map, return the location
 * details by traversing the loc map hierarchy
 * @param locMap - the loc map
 * @param locId - the loc id
 */
import { LocChildren, LocMap } from '.';
export declare function getLocationDetailsFromLocMap(locMap: LocMap, locId: string): LocChildren;
