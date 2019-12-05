import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import store from '../../index';
import clientReducer, {
  fetchClients,
  getClientById,
  getClientsArray,
  getClientsById,
  getClientsIdArray,
  getNavigationPage,
  reducerName as clientReducerName,
  removeClientsAction,
  setNavigationPage,
} from '../clients';

import householdReducer, {
  fetchHouseholds,
  getHouseholdById,
  getHouseholdsArray,
  getHouseholdsById,
  getTotalRecords,
  reducerName as houseHoldReducerName,
  removeHouseholdsAction,
  setTotalRecords,
} from '../households';

import * as fixtures from '../tests/fixtures';

reducerRegistry.register(clientReducerName, clientReducer);
reducerRegistry.register(houseHoldReducerName, householdReducer);

describe('reducers/clients', () => {
  let flushThunks;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    jest.resetAllMocks();
    store.dispatch(removeClientsAction);
    store.dispatch(removeHouseholdsAction);
  });

  it('selectors work for empty initialState', () => {
    expect(getClientsById(store.getState())).toEqual({});
    expect(getClientsArray(store.getState())).toEqual([]);
    expect(getClientById(store.getState(), 'some-id')).toBeNull();
    expect(getHouseholdsById(store.getState())).toEqual({});
    expect(getHouseholdsArray(store.getState())).toEqual([]);
    expect(getHouseholdById(store.getState(), 'test-id')).toBeNull();
  });

  it('fetches clients correctly', () => {
    store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
    expect(getClientsById(store.getState())).toEqual({
      '71ad460c-bf76-414e-9be1-0d1b2cb1bce8': fixtures.client1,
      '7d97182f-d623-4553-8651-5a29d2fe3f0b': fixtures.client2,
    });
    expect(getClientsArray(store.getState())).toEqual(values([fixtures.client1, fixtures.client2]));
    expect(getClientById(store.getState(), '71ad460c-bf76-414e-9be1-0d1b2cb1bce8')).toEqual(
      fixtures.client1
    );
  });

  it('removes clients', () => {
    store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
    let numberOfClients = getClientsArray(store.getState()).length;
    expect(numberOfClients).toEqual(2);

    store.dispatch(removeClientsAction);
    numberOfClients = getClientsArray(store.getState()).length;
    expect(numberOfClients).toEqual(0);
  });

  it('Adds new clients to store instead of overwriting existing ones', () => {
    store.dispatch(removeClientsAction);
    store.dispatch(fetchClients([fixtures.client1]));
    let numberOfClients = getClientsArray(store.getState()).length;
    expect(numberOfClients).toEqual(1);

    store.dispatch(fetchClients([fixtures.client2]));
    numberOfClients = getClientsArray(store.getState()).length;
    expect(numberOfClients).toEqual(2);
  });

  it('fetches households correctly', () => {
    store.dispatch(fetchHouseholds([fixtures.household1, fixtures.household2]));
    expect(getHouseholdsById(store.getState())).toEqual({
      '123fc98d-4cce-412a-8327-ca2315efedf3': fixtures.household1,
      '456fc98d-4cce-412a-8327-ca2315efedf3': fixtures.household2,
    });
    expect(getHouseholdsArray(store.getState())).toEqual(
      values([fixtures.household1, fixtures.household2])
    );
    expect(getHouseholdById(store.getState(), '123fc98d-4cce-412a-8327-ca2315efedf3')).toEqual(
      fixtures.household1
    );
  });

  it('Adds new households to store instead of overwriting existing ones', () => {
    store.dispatch(fetchHouseholds([fixtures.household1, fixtures.household2]));
    let numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(2);

    store.dispatch(fetchHouseholds([fixtures.household3]));
    numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(3);
  });

  it('removes Households', () => {
    store.dispatch(fetchHouseholds(fixtures.households));
    let numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(3);

    store.dispatch(removeHouseholdsAction);
    numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(0);
  });

  it('sets total records', () => {
    store.dispatch(setTotalRecords(3));
    let numberOfRecords = getTotalRecords(store.getState());
    expect(numberOfRecords).toEqual(3);

    store.dispatch(setTotalRecords(0));
    numberOfRecords = getTotalRecords(store.getState());
    expect(numberOfRecords).toEqual(0);
  });
});
