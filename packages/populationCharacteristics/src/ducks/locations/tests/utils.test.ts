import { locHierarchy } from './fixtures';
import { getLocationDetailsFromLocMap } from '../utils';

describe('src/ducks/locations/utils/getLocationDetailsFromLocMap', () => {
    const map = locHierarchy.locationsHierarchy.map;

    it('should return details correctly if the location is the parent level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, '75af7700-a6f2-448c-a17d-816261a7749a');
        expect(locDetails).toEqual(map['75af7700-a6f2-448c-a17d-816261a7749a']);
    });

    it('should return details correctly if location is a middle level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, '8400d475-3187-46e4-8980-7c6f0a243495');
        expect(locDetails).toEqual(
            map['75af7700-a6f2-448c-a17d-816261a7749a'].children['8400d475-3187-46e4-8980-7c6f0a243495'],
        );
    });

    it('should return details correctly if the location is the last level', () => {
        const locDetails = getLocationDetailsFromLocMap(map, 'f4d22dad-f211-4476-bdf0-09fb20f7f64f');
        expect(locDetails).toEqual(
            map['75af7700-a6f2-448c-a17d-816261a7749a'].children['8400d475-3187-46e4-8980-7c6f0a243495'].children[
                'f4d22dad-f211-4476-bdf0-09fb20f7f64f'
            ],
        );
    });
});
