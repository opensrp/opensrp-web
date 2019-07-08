import reducerRegistry from '@onaio/redux-reducer-registry';
import { create } from 'domain';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import fetchMock = require('fetch-mock');
import { createBrowserHistory } from 'history';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from '../../../../store';
import reducer, { fetchClients, reducerName } from '../../../../store/ducks/clients';
import ConnectedClientsList, { ClientsList } from '../clientList';

reducerRegistry.register(reducerName, reducer);

const history = createBrowserHistory();

describe('containers/clients/list/ClientList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const mock: any = jest.fn();
    const props = {
      history,
      location: mock,
      match: mock,
    };
    shallow(<ClientsList {...props} />);
  });

  it('renders without crashing', () => {
    const mock: any = jest.fn();
  });

  it('works correctly with the redux store', () => {
    const mock: any = jest.fn();
  });
});
