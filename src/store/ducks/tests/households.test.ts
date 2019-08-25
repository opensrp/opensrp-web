import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import store from '../../index';
import reducer, {
  fetchHouseholds,
  getHouseholdById,
  getHouseholds,
  getHouseholdsArray,
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
});
