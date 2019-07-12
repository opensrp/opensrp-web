import reducerRegistry from '@onaio/redux-reducer-registry';
import { values } from 'lodash';
import { FlushThunks } from 'redux-testkit';
import * as rawClientFixture from '../../../services/clients/tests/fixtures';
import store from '../../index';
import reducer, {
  fetchClients,
  getClientById,
  getClients,
  getClientsArray,
  getClientsIdArray,
  reducerName,
} from '../clients';
import { extractClient } from '../clients';
import * as fixtures from '../tests/fixtures';

reducerRegistry.register(reducerName, reducer);

describe('reducers/clients', () => {
  let flushThunks;

  beforeEach(() => {
    flushThunks = FlushThunks.createMiddleware();
    jest.resetAllMocks();
  });

  it('selectors work for empty initialState', () => {
    expect(getClients(store.getState())).toEqual({});
    expect(getClientsArray(store.getState())).toEqual([]);
    expect(getClientsIdArray(store.getState())).toEqual([]);
    expect(getClientById(store.getState(), 'some-id')).toBeNull();
  });

  it('fetches clients correctly', () => {
    store.dispatch(fetchClients([fixtures.client1, fixtures.client2]));
    expect(getClients(store.getState())).toEqual({
      '9b67a82d-dac7-40c0-85aa-e5976339a6b6': {
        firstName: 'Khumpai',
        gender: '',
        id: '9b67a82d-dac7-40c0-85aa-e5976339a6b6',
        lastContactDate: '',
        lastName: 'Family',
        location: '',
        middleName: '',
        type: 'Client',
      },
      'a30116d5-0612-419e-9b93-00c87df4ffbb': {
        firstName: 'Pramoj',
        gender: '',
        id: 'a30116d5-0612-419e-9b93-00c87df4ffbb',
        lastContactDate: '',
        lastName: 'Khumpai',
        location: '',
        middleName: '',
        type: 'Client',
      },
    });
    expect(getClientsArray(store.getState())).toEqual(values([fixtures.client1, fixtures.client2]));
    expect(getClientsIdArray(store.getState())).toEqual(
      [fixtures.client1, fixtures.client2].map(client => client.id)
    );
    expect(getClientById(store.getState(), '9b67a82d-dac7-40c0-85aa-e5976339a6b6')).toEqual({
      firstName: 'Khumpai',
      gender: '',
      id: '9b67a82d-dac7-40c0-85aa-e5976339a6b6',
      lastContactDate: '',
      lastName: 'Family',
      location: '',
      middleName: '',
      type: 'Client',
    });
  });

  it('extracts clients correctly', () => {
    const { rawClient1 } = rawClientFixture;
    const expected = {
      firstName: 'Khumpai',
      gender: 'Male',
      id: '9b67a82d-dac7-40c0-85aa-e5976339a6b6',
      lastContactDate: '',
      lastName: 'Family',
      location: '',
      middleName: '',
      type: 'Client',
    };
    expect(extractClient(rawClient1)).toEqual(expected);
  });
});
