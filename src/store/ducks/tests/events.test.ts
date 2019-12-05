import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import store from '../../index';
import eventReducer, {
  fetchEvents,
  getEventsArray,
  getEventsById,
  reducerName as eventReducerName,
} from '../events';

import * as fixtures from '../tests/fixtures';

reducerRegistry.register(eventReducerName, eventReducer);

describe('reducers/clients', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('events selectors work for empty initialState', () => {
    expect(getEventsById(store.getState())).toEqual({});
    expect(getEventsArray(store.getState())).toEqual([]);
  });

  it('fetches events correctly', () => {
    store.dispatch(fetchEvents(fixtures.events));
    expect(getEventsArray(store.getState())).toEqual(values(fixtures.events));
  });

  it('fetches events correctly', () => {
    store.dispatch(fetchEvents([fixtures.event1, fixtures.event2]));
    expect(getEventsById(store.getState())).toEqual({
      '5e8b72c5-0b36-9d7d-829f-279d1482c96a': fixtures.event2,
      '6e8b72c5-0b36-4e46-829f-8ujd1482c96a': fixtures.event1,
    });
  });
});
