import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import ANCReducer, { reducerName, fetchANC, getANCById, getAllANCArray, getAllANCById, removeANCAction } from '../anc';
import * as fixtures from '../tests/fixtures';

reducerRegistry.register(reducerName, ANCReducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeANCAction);
    });

    it('selectors work for empty initialState', () => {
        expect(getAllANCById(store.getState())).toEqual({});
        expect(getAllANCArray(store.getState())).toEqual([]);
        expect(getANCById(store.getState(), 'some-id')).toBeNull();
    });

    it('fetches ANC correctly', () => {
        store.dispatch(fetchANC([fixtures.ANCClient1, fixtures.ANCClient2]));
        expect(getAllANCById(store.getState())).toEqual({
            'f1a3e6ee-58d2-4d5c-9588-5e2658abe21c': fixtures.ANCClient1,
            '564fce60-29c8-4a9d-b99b-6a74411a1457': fixtures.ANCClient2,
        });
        expect(getAllANCArray(store.getState())).toEqual(values([fixtures.ANCClient1, fixtures.ANCClient2]));
        expect(getANCById(store.getState(), 'f1a3e6ee-58d2-4d5c-9588-5e2658abe21c')).toEqual(fixtures.ANCClient1);
    });

    it('removes ANC correctly', () => {
        store.dispatch(fetchANC([fixtures.ANCClient1, fixtures.ANCClient2]));
        let numberOfClients = getAllANCArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);

        store.dispatch(removeANCAction);
        numberOfClients = getAllANCArray(store.getState()).length;
        expect(numberOfClients).toEqual(0);
    });

    it('dispatches ANC correctly on non-empty state', () => {
        store.dispatch(fetchANC([fixtures.ANCClient1]));
        let numberOfClients = getAllANCArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);

        store.dispatch(fetchANC([fixtures.ANCClient2]));
        numberOfClients = getAllANCArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);
    });
});
