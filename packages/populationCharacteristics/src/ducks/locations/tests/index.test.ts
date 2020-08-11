import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import { FlushThunks } from 'redux-testkit';
import { locHierarchy } from './fixtures';
import reducer, {
    fetchLocs,
    getLocChildren,
    getLocDetails,
    locationReducerName,
    getActiveLocId,
    getSelectedLocs,
    getDefaultLocId,
    removeLocAction,
} from '..';

reducerRegistry.register(locationReducerName, reducer);

describe('reducers/locations', () => {
    beforeEach(() => {
        FlushThunks.createMiddleware();
        jest.resetAllMocks();
    });

    it('should have initial state', () => {
        const locId = '75af7700-a6f2-448c-a17d-816261a7749a';
        expect(getLocChildren(store.getState(), locId)).toEqual([]);
        expect(getLocDetails(store.getState(), locId)).toEqual({});
        expect(getSelectedLocs(store.getState())).toEqual([]);
        expect(getActiveLocId(store.getState())).toEqual(null);
    });

    it('should fetch locations', () => {
        const locId = '75af7700-a6f2-448c-a17d-816261a7749a';
        const searchId = '8400d475-3187-46e4-8980-7c6f0a243495';
        const { map, parentChildren } = locHierarchy.locationsHierarchy;
        // dispatch locations
        store.dispatch(fetchLocs(locHierarchy));
        // get location hierarchy
        expect(getLocChildren(store.getState(), locId)).toEqual(parentChildren[locId]);
        // get location details
        expect(getLocDetails(store.getState(), searchId)).toEqual(map[locId].children[searchId]);
        // get active location id
        expect(getActiveLocId(store.getState())).toEqual(locId);
        // get selected location ids
        expect(getSelectedLocs(store.getState())).toEqual([locId]);
        // get default location id
        expect(getDefaultLocId(store.getState())).toEqual(locId);
    });

    it('should clear locations', () => {
        const locId = '75af7700-a6f2-448c-a17d-816261a7749a';
        // dispatch locations
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(removeLocAction());
        // get location hierarchy
        expect(getLocChildren(store.getState(), locId)).toEqual([]);
    });
});
