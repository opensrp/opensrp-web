import reducerRegistry from '@onaio/redux-reducer-registry';
import { keyBy, values } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import store from '../../index';
import reducer, {
  fetchHouseholds,
  getHouseholdById,
  getHouseholds,
  getHouseholdsArray,
  Household,
  reducerName,
  removeHouseholdsAction,
} from '../households';
/** Used the client fixtures as test since the interface for houshold is same as client */
import * as fixtures from '../tests/fixtures';

reducerRegistry.register(reducerName, reducer);

describe('reducers/households', () => {
  let flushThunks;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    jest.resetAllMocks();
  });

  it('selectors work for empty initialState', () => {
    expect(getHouseholds(store.getState())).toEqual({});
    expect(getHouseholdsArray(store.getState())).toEqual([]);
    expect(getHouseholdById(store.getState(), 'unkonwn-id')).toBeNull();
  });

  it('fetches households correctly', () => {
    store.dispatch(fetchHouseholds(fixtures.clients));
    expect(getHouseholds(store.getState())).toEqual(
      keyBy(fixtures.clients, (household: Household) => household._id)
    );
    expect(getHouseholdsArray(store.getState())).toEqual(values(fixtures.clients));
    expect(getHouseholdById(store.getState(), 'a30116d5-0612-419e-9b93-00c87df4ffbb')).toEqual(
      fixtures.client2
    );
  });

  it('removes households', () => {
    store.dispatch(fetchHouseholds([fixtures.client1, fixtures.client2, fixtures.client3]));
    let numberOfHouseholds: number = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(3);

    store.dispatch(removeHouseholdsAction);
    numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(0);
  });

  it('Adds new households to store instead of overwriting existing ones', () => {
    store.dispatch(removeHouseholdsAction);
    store.dispatch(fetchHouseholds([fixtures.client1, fixtures.client2]));
    let numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(2);

    store.dispatch(fetchHouseholds([fixtures.client3, fixtures.client4, fixtures.client5]));
    numberOfHouseholds = getHouseholdsArray(store.getState()).length;
    expect(numberOfHouseholds).toEqual(5);
  });
});
