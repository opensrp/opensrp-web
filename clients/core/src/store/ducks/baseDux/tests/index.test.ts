import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../../index';
import {
    reducerFactory,
    fetchActionCreatorFactory,
    getItemByIdFactory,
    getItemsArrayFactory,
    getItemsByIdFactory,
    removeActionCreatorFactory,
    setTotalRecordsFactory,
    getTotalRecordsFactory,
} from '..';
import * as fixtures from '../../tests/fixtures';
import { FlexObject } from '../../../../helpers/utils';
import ANCReducer, {
    reducerName as ANCReducerName,
    fetchANC,
    getANCById,
    getAllANCArray,
    getAllANCById,
    removeANCAction,
    setTotalANCRecords,
    getTotalANCRecords,
} from '../../anc';

interface TestClient {
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

const customReducerName = 'opensrp-web/client-type/base';

const baseReducer = reducerFactory<TestClient>(customReducerName);

reducerRegistry.register(customReducerName, baseReducer);
reducerRegistry.register(ANCReducerName, ANCReducer);

const getBaseClientsById = getItemsByIdFactory<TestClient>(customReducerName);
const getBaseClientById = getItemByIdFactory<TestClient>(customReducerName);
const getBaseClientsArray = getItemsArrayFactory<TestClient>(customReducerName);
const fetchBaseClients = fetchActionCreatorFactory<TestClient>(customReducerName, 'baseEntityId');
const removeBaseClientsAction = removeActionCreatorFactory(customReducerName);
const setBaseTotalRecords = setTotalRecordsFactory(customReducerName);
const getBaseTotalRecords = getTotalRecordsFactory(customReducerName);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeBaseClientsAction());
        store.dispatch(removeANCAction());
    });

    it('selectors work for empty initialState', () => {
        expect(getBaseClientsById(store.getState())).toEqual({});
        expect(getBaseClientsArray(store.getState())).toEqual([]);
        expect(getBaseClientById(store.getState(), 'some-id')).toBeNull();
        expect(getANCById(store.getState(), 'some-id')).toBeNull();
        expect(getAllANCArray(store.getState())).toEqual([]);
        expect(getAllANCById(store.getState())).toEqual({});
    });

    it('fetches clients correctly', () => {
        store.dispatch(fetchBaseClients([fixtures.client1, fixtures.client2] as TestClient[]));
        store.dispatch(fetchANC([fixtures.ANCClient1, fixtures.ANCClient2]));
        expect(getBaseClientsById(store.getState())).toEqual({
            '71ad460c-bf76-414e-9be1-0d1b2cb1bce8': fixtures.client1,
            '7d97182f-d623-4553-8651-5a29d2fe3f0b': fixtures.client2,
        });
        expect(getBaseClientsArray(store.getState())).toEqual(values([fixtures.client1, fixtures.client2]));
        expect(getBaseClientById(store.getState(), '71ad460c-bf76-414e-9be1-0d1b2cb1bce8')).toEqual(fixtures.client1);
        expect(getAllANCById(store.getState())).toEqual({
            'f1a3e6ee-58d2-4d5c-9588-5e2658abe21c': fixtures.ANCClient1,
            '564fce60-29c8-4a9d-b99b-6a74411a1457': fixtures.ANCClient2,
        });
        expect(getAllANCArray(store.getState())).toEqual(values([fixtures.ANCClient1, fixtures.ANCClient2]));
        expect(getANCById(store.getState(), 'f1a3e6ee-58d2-4d5c-9588-5e2658abe21c')).toEqual(fixtures.ANCClient1);
    });

    it('removes clients correctly', () => {
        store.dispatch(fetchBaseClients([fixtures.client1, fixtures.client2] as TestClient[]));
        let numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);
        store.dispatch(fetchANC([fixtures.ANCClient1, fixtures.ANCClient2]));
        let numberOfANC = getAllANCArray(store.getState()).length;
        expect(numberOfANC).toEqual(2);

        store.dispatch(removeBaseClientsAction());
        numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(0);

        store.dispatch(removeANCAction());
        numberOfANC = getAllANCArray(store.getState()).length;
        expect(numberOfANC).toEqual(0);
    });

    it('dispatches clients correctly on non-empty state', () => {
        store.dispatch(removeBaseClientsAction());
        store.dispatch(fetchBaseClients([fixtures.client1] as TestClient[]));
        let numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);

        store.dispatch(fetchBaseClients([fixtures.client2] as TestClient[]));
        numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(2);

        store.dispatch(fetchANC([fixtures.ANCClient1]));
        let numberOfANC = getAllANCArray(store.getState()).length;
        expect(numberOfANC).toEqual(1);

        store.dispatch(fetchANC([fixtures.ANCClient2]));
        numberOfANC = getAllANCArray(store.getState()).length;
        expect(numberOfANC).toEqual(2);
    });

    it('should not save the same object twice', () => {
        store.dispatch(removeBaseClientsAction());
        store.dispatch(fetchBaseClients([fixtures.client1] as TestClient[]));
        let numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);

        store.dispatch(fetchBaseClients([fixtures.client1] as TestClient[]));
        numberOfClients = getBaseClientsArray(store.getState()).length;
        expect(numberOfClients).toEqual(1);
    });

    it('sets total records correctly', () => {
        store.dispatch(setBaseTotalRecords(5));
        expect(getBaseTotalRecords(store.getState())).toEqual(5);
        store.dispatch(setBaseTotalRecords(10));
        expect(getBaseTotalRecords(store.getState())).toEqual(10);
        expect(getTotalANCRecords(store.getState())).toEqual(0);

        store.dispatch(setTotalANCRecords(4));
        expect(getBaseTotalRecords(store.getState())).toEqual(10);
        expect(getTotalANCRecords(store.getState())).toEqual(4);

        store.dispatch(setTotalANCRecords(9));
        expect(getTotalANCRecords(store.getState())).toEqual(9);
    });
});
