import reducerRegistry from '@onaio/redux-reducer-registry';
import { keyBy } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import store from '../../../..';
import { locHierarchy } from './fixtures';
import reducer, { fetchLocs, getLocChildren, getLocDetails, reducerName } from '..';

reducerRegistry.register(reducerName, reducer);

describe('reducers/goals', () => {
    beforeEach(() => {
        FlushThunks.createMiddleware();
        jest.resetAllMocks();
    });

    it('should have initial state', () => {
        const locId = '75af7700-a6f2-448c-a17d-816261a7749a';
        expect(getLocChildren(store.getState(), locId)).toEqual(undefined);
        expect(getLocDetails(store.getState(), [locId])).toEqual(undefined);
    });

    it('should fetch locations', () => {
        const locId = '75af7700-a6f2-448c-a17d-816261a7749a';
        const LocIds: Array<string> = ['75af7700-a6f2-448c-a17d-816261a7749a', '8400d475-3187-46e4-8980-7c6f0a243495'];
        const searchId = '8400d475-3187-46e4-8980-7c6f0a243495';
        const { map, parentChildren } = locHierarchy.locationsHierarchy;
        // dispatch locations
        store.dispatch(fetchLocs(locHierarchy));
        // get location hierarchy
        expect(getLocChildren(store.getState(), locId)).toEqual(parentChildren[locId]);
        // get location details
        expect(getLocDetails(store.getState(), LocIds)).toEqual(map[locId].children[searchId]);
    });
});
