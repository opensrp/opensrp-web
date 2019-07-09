import reducerRegistry from '@onaio/redux-reducer-registry';
import { create } from 'domain';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import reducer, { fetchClients, reducerName } from '../../../../store/ducks/clients';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import ConnectedClientsList, { ClientList } from '../clientList';

reducerRegistry.register(reducerName, reducer);

describe('containers/clients/list/ClientList', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const mock: any = jest.fn();
    const props = {
      clientService: mock,
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
      clientService: mock,
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
      clientService: mock,
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
