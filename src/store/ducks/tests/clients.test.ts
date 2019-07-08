import reducerRegistry from '@onaio/redux-reducer-registry';
import { FlushThunks } from 'redux-testkit';
import store from '../../index';
import reducer, {
  fetchClients,
  getClientById,
  getClients,
  getClientsArray,
  getClientsIdArray,
  reducerName,
} from '../clients';

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
    store.dispatch(fetchClients([])); // put fixtures here
  });

  it('saves clients correctly', () => {
    store.dispatch(fetchClients([])); // put fixture here
  });
});
