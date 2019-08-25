import reducerRegistry from '@onaio/redux-reducer-registry';
import { values, keyBy } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import store from '../../index';
import reducer, {
  fetchHouseholds,
  getHouseholdById,
  getHouseholds,
  getHouseholdsArray,
  Household,
  reducerName,
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
});
