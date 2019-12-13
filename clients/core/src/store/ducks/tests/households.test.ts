import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
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

reducerRegistry.register(houseHoldReducerName, householdReducer);

describe('reducers/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    store.dispatch(removeHouseholdsAction);
  });

  it('selectors work for empty initialState', () => {
    expect(getHouseholdsById(store.getState())).toEqual({});
    expect(getHouseholdsArray(store.getState())).toEqual([]);
    expect(getHouseholdById(store.getState(), 'test-id')).toBeNull();
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
