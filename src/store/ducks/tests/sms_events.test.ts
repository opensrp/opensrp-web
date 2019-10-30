import reducerRegistry from '@onaio/redux-reducer-registry';
import { smsDataFixtures } from '../../../containers/Compartments/test/fixtures';
import store from '../../index';
import reducer, {
  fetchSms,
  getSmsData,
  reducerName,
  removeSms,
  smsDataFetched,
} from '../sms_events';

reducerRegistry.register(reducerName, reducer);

describe('reducers/sms_events', () => {
  it('should have initial state', () => {
    expect(getSmsData(store.getState())).toEqual([]);
    expect(smsDataFetched(store.getState())).toEqual(false);
  });
  it('fetchSms action creator works correctly', () => {
    store.dispatch(fetchSms(smsDataFixtures));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures);
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(removeSms);
  });
  it('removeSms action works correctly', () => {
    store.dispatch(fetchSms(smsDataFixtures));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures);
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(removeSms);
    expect(getSmsData(store.getState())).toEqual([]);
    expect(smsDataFetched(store.getState())).toEqual(false);
  });
  it('data in the store is not ovewritten', () => {
    store.dispatch(fetchSms(smsDataFixtures.slice(0, 2)));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures.slice(0, 2));
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(fetchSms(smsDataFixtures.slice(2, 5)));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures.slice(0, 5));
  });
});
