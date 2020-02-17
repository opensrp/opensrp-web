import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import clientReducer, {
    fetchClients,
    getClientById,
    getClientsArray,
    getClientsById,
    reducerName as clientReducerName,
    removeClients,
} from '../clients';
import * as fixtures from '../tests/fixtures';

reducerRegistry.register(clientReducerName, clientReducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeClients());
    });

    it('selectors work for empty initialState', () => {
        expect(getClientsById(store.getState())).toEqual({});
        expect(getClientsArray(store.getState())).toEqual([]);
        expect(getClientById(store.getState(), 'some-id')).toBeNull();
    });

    it('fetches clients correctly', () => {
        store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
        expect(getClientsById(store.getState())).toEqual({
            '71ad460c-bf76-414e-9be1-0d1b2cb1bce8': fixtures.client1,
            '7d97182f-d623-4553-8651-5a29d2fe3f0b': fixtures.client2,
        });
        expect(getClientsArray(store.getState())).toEqual(values([fixtures.client1, fixtures.client2]));
        expect(getClientById(store.getState(), '71ad460c-bf76-414e-9be1-0d1b2cb1bce8')).toEqual(fixtures.client1);
    });

    it('removes clients', () => {
        store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
        let numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);

        store.dispatch(removeClients());
        numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(0);
    });

    it('Adds new clients to store instead of overwriting existing ones', () => {
        store.dispatch(removeClients());
        store.dispatch(fetchClients([fixtures.client1]));
        let numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);

        store.dispatch(fetchClients([fixtures.client2]));
        numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);
    });
});
