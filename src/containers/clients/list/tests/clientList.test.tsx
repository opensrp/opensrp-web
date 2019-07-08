import reducerRegistry from '@onaio/redux-reducer-registry';
import { create } from 'domain';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import * as React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import store from '../../../../store';
import reducer, { fetchClients, reducerName } from '../../../../store/ducks/clients';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import ConnectedClientsList, { ClientList } from '../clientList';

reducerRegistry.register(reducerName, reducer);

const history = createBrowserHistory();

describe('containers/clients/list/ClientList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const mock: any = jest.fn();
    const props = {
      clientsArray: fixtures.clients,
      fetchClientsActionCreator: mock,
      location: mock,
      match: mock,
    };
    shallow(<ClientList {...props} />);
  });

  it('renders without crashing', () => {
    const mock: any = jest.fn();
    const props = {
      clientsArray: fixtures.clients,
      fetchClientsActionCreator: mock,
      location: mock,
      match: mock,
    };
    const wrapper = mount(<ClientList {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });

  it('works correctly with the redux store', () => {
    store.dispatch(fetchClients(fixtures.clients));
    const mock: any = jest.fn();
    const props = {
      fetchClientsActionCreator: mock,
      location: mock,
      match: mock,
    };
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedClientsList {...props} />
        );
      </Provider>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
