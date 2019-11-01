import reducerRegistry from '@onaio/redux-reducer-registry';
import { smsDataFixtures } from '../../../containers/Compartments/test/fixtures';
import store from '../../index';
import reducer, {
  addFilterArgs,
  fetchSms,
  FilterArgs,
  getFilterArgs,
  getFilteredSmsData,
  getSmsData,
  reducerName,
  removeFilterArgs,
  removeSms,
  SmsData,
  smsDataFetched,
} from '../sms_events';

reducerRegistry.register(reducerName, reducer);

describe('reducers/sms_events/store', () => {
  it('must have initial state', () => {
    expect(getSmsData(store.getState())).toEqual([]);
    expect(smsDataFetched(store.getState())).toEqual(false);
  });
});

describe('reducers/sms_events/fetchSms action creator and selector', () => {
  it('must work correctly', () => {
    store.dispatch(fetchSms(smsDataFixtures));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures);
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(removeSms);
  });

  it('must not overwrite data in the store', () => {
    store.dispatch(fetchSms(smsDataFixtures.slice(0, 2)));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures.slice(0, 2));
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(fetchSms(smsDataFixtures.slice(2, 5)));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures.slice(0, 5));
  });
});

describe('reducers/sms_events/addFilterArgs action creator and selector', () => {
  it('must work correctly', () => {
    const filterArgs: FilterArgs = {
      comparator: '!==',
      field: 'height',
      value: 48,
    };
    store.dispatch(addFilterArgs(filterArgs));
    expect(getFilterArgs(store.getState())).toEqual(filterArgs);
    store.dispatch(removeFilterArgs);
    expect(getFilterArgs(store.getState())).toEqual(null);
  });
});

describe('reducers/sms_events/removeSms action', () => {
  it('must work correctly', () => {
    store.dispatch(fetchSms(smsDataFixtures));
    expect(getSmsData(store.getState())).toEqual(smsDataFixtures);
    expect(smsDataFetched(store.getState())).toEqual(true);
    store.dispatch(removeSms);
    expect(getSmsData(store.getState())).toEqual([]);
    expect(smsDataFetched(store.getState())).toEqual(false);
  });
});

describe('reducers/sms_events/getFilteredSmsData', () => {
  beforeAll(() => {
    // put all the fixtures in the store
    store.dispatch(fetchSms(smsDataFixtures));
  });
  it("it must works correctly with '==='", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '===',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height === 48;
      })
    );
  });
  it("it must works correctly with '<='", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '<=',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height <= 48;
      })
    );
  });
  it("it must works correctly with '>='", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '>=',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height >= 48;
      })
    );
  });
  it("it must works correctly with '!=='", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '!==',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height !== 48;
      })
    );
  });
  it("it must works correctly with '>'", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '>',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height > 48;
      })
    );
  });
  it("it must works correctly with '<'", () => {
    expect(
      getFilteredSmsData(store.getState(), {
        comparator: '<',
        field: 'height',
        value: 48,
      })
    ).toEqual(
      smsDataFixtures.filter((element: SmsData) => {
        return element.height < 48;
      })
    );
  });
});
