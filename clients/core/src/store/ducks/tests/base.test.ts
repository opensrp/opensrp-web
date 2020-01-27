import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import {
    reducerFactory,
    fetchClientsFactory,
    getClientByIdFactory,
    getClientsArrayFactory,
    getClientsByIdFactory,
    removeClientsAction,
    BaseClient,
} from '../baseClient';
import * as fixtures from '../tests/fixtures';
import { FlexObject } from '../../../helpers/utils';

interface TestClient extends BaseClient {
    type: 'Client';
    dateCreated: number;
    serverVersion: number;
    clientApplicationVersion: number;
    clientDatabaseVersion: number;
    baseEntityId: string;
    identifiers: { [key: string]: string | null };
    addresses: FlexObject[];
    attributes: FlexObject;
    firstName: string;
    lastName: string;
    birthdate: number;
    middleName?: string;
    birthdateApprox: boolean;
    deathdateApprox: boolean;
    gender?: string;
    relationships: {
        [key: string]: string[];
    };
    _id: string;
    _rev: string;
}

const customReducerName = 'base';

const baseReducer = reducerFactory<TestClient>();

reducerRegistry.register(customReducerName, baseReducer);

const getClientsById = getClientsByIdFactory<TestClient>(customReducerName);
const getClientById = getClientByIdFactory<TestClient>(customReducerName);
const getClientsArray = getClientsArrayFactory<TestClient>(customReducerName);
const fetchClients = fetchClientsFactory<TestClient>();

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeClientsAction);
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

    it('removes clients correctly', () => {
        store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
        let numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);

        store.dispatch(removeClientsAction);
        numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(0);
    });

    it('dispatches clients correctly on non-empty state', () => {
        store.dispatch(removeClientsAction);
        store.dispatch(fetchClients([fixtures.client1]));
        let numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);

        store.dispatch(fetchClients([fixtures.client2]));
        numberOfClients = getClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);
    });
});
