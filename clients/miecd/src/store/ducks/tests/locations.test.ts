import reducerRegistry from '@onaio/redux-reducer-registry';
import { COMMUNE, DISTRICT, PROVINCE, VILLAGE } from '../../../constants';
import { districts, provinces, userLocationDetails } from '../../../containers/HierarchichalDataTable/test/fixtures';
import store from '../../index';
import reducer, {
    fetchLocations,
    fetchUserLocations,
    getLocations,
    getLocationsOfLevel,
    getUserId,
    getUserLocationId,
    getUserLocations,
    reducerName,
    removeLocations,
    userIdFetched,
    userLocationDataFetched,
    userLocationIdFetched,
} from '../locations';

reducerRegistry.register(reducerName, reducer);

describe('reducers/location/reduer', () => {
    it('should have initial state', () => {
        expect(getLocations(store.getState())).toHaveLength(0);
        expect(getUserLocations(store.getState())).toHaveLength(0);
        expect(getLocationsOfLevel(store.getState(), PROVINCE)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), DISTRICT)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), COMMUNE)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), VILLAGE)).toEqual([]);
        expect(userIdFetched(store.getState())).toEqual(false);
        expect(userLocationDataFetched(store.getState())).toEqual(false);
        expect(userLocationIdFetched(store.getState())).toEqual(false);
        expect(getUserLocationId(store.getState())).toEqual('');
        expect(getUserId(store.getState())).toEqual('');
        expect(getUserLocations(store.getState())).toEqual([]);
    });

    it('Fetch locations action creator works correctly', () => {
        store.dispatch(fetchLocations(provinces));
        expect(getLocationsOfLevel(store.getState(), PROVINCE)).toEqual(provinces);
        expect(getLocations(store.getState())).toEqual(provinces);
    });

    it('Fetch user location details action creator works correctly', () => {
        store.dispatch(fetchUserLocations(userLocationDetails));
        expect(getUserLocations(store.getState())).toEqual(userLocationDetails);
    });

    it('remove locations actions works correctly', () => {
        store.dispatch(fetchLocations(provinces));
        store.dispatch(removeLocations);
        expect(getLocationsOfLevel(store.getState(), PROVINCE)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), DISTRICT)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), COMMUNE)).toEqual([]);
        expect(getLocationsOfLevel(store.getState(), VILLAGE)).toEqual([]);
    });

    it('data in the store is not overriden', () => {
        store.dispatch(fetchLocations(provinces));
        expect(getLocationsOfLevel(store.getState(), PROVINCE)).toEqual(provinces);
        expect(getLocations(store.getState())).toEqual(provinces);
        store.dispatch(fetchLocations(districts));
        expect(getLocationsOfLevel(store.getState(), PROVINCE)).toEqual(provinces);
        expect(getLocationsOfLevel(store.getState(), DISTRICT)).toEqual(districts);
    });
});
