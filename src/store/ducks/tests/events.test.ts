import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import eventReducer, {
  fetchEvents,
  getEventsArray,
  reducerName as eventReducerName,
} from '../events';

import * as fixtures from '../tests/fixtures';

reducerRegistry.register(eventReducerName, eventReducer);

describe('reducers/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('fetches events correctly', () => {
    store.dispatch(fetchEvents([fixtures.event1]));
    expect(getEventsArray(store.getState())).toEqual(values([fixtures.event1]));
  });
});
