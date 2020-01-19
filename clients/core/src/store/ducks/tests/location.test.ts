import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import householdReducer, { setLocations, reducerName as locationReducer, getLocationHierarchy } from '../locations';

import * as fixtures from '../tests/fixtures';

reducerRegistry.register(locationReducer, householdReducer);

describe('reducers/locations', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it(' selectors work for empty initial state', () => {
        expect(getLocationHierarchy(store.getState())).toEqual({});
    });

    it(' set locations correctly', () => {
        store.dispatch(setLocations(fixtures.location));
        expect(getLocationHierarchy(store.getState())).toEqual(fixtures.location);
    });
});
