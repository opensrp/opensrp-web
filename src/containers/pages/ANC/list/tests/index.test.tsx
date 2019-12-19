import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { ANC } from '../../../../../constants';
import { OpenSRPService } from '../../../../../services/opensrp';
import store from '../../../../../store';
import * as clientDux from '../../../../../store/ducks/clients';
import ConnectedANCListView, { ANCListProps, ANCListView } from '../../list';
import { allANC, SelectorState } from './fixtures';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');

const signal = new AbortController().signal;

const history = createBrowserHistory();

const props: ANCListProps = {
  ANCArray: [],
  fetchClientsCreator: clientDux.fetchClients,
  service: OpenSRPService,
};

describe('src/containers/pages/ANC', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
    store.dispatch(clientDux.removeClientsAction);
  });

  it('renders without crashing', async () => {
    fetch.once(JSON.stringify([]));
    await new Promise(resolve => setImmediate(resolve));
    shallow(<ANCListView {...props} />);
  });

  it('renders correctly', async () => {
    fetch.once(JSON.stringify([]));

    const wrapper = mount(<ANCListView {...props} />);
    expect(wrapper.find('ANCTable').length).toEqual(0);
    expect(wrapper.find('Ripple').length).toEqual(1);

    // resolve fetch
    await new Promise(resolve => setImmediate(resolve));

    wrapper.update();
    expect(wrapper.find('ANCTable').length).toEqual(1);

    // are we setting title
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(ANC);
  });

  it('works correctly with store', async () => {
    fetch.once(JSON.stringify([]));
    store.dispatch(clientDux.fetchClients(allANC));
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedANCListView {...props} />
        </Router>
      </Provider>
    );

    await new Promise(resolve => setImmediate(resolve));

    const passedProps = wrapper.find('ANCListView').props();
    expect((passedProps as ANCListProps).ANCArray).toEqual(allANC);
  });

  it('makes the correct api calls', async () => {
    fetch.once(JSON.stringify(allANC));
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ConnectedANCListView {...props} />
        </Router>
      </Provider>
    );

    await new Promise(resolve => setImmediate(resolve));
    expect(fetch.mock.calls[0]).toEqual([
      'https://reveal-stage.smartregister.org/opensrp/rest/client/search',
      {
        headers: {
          accept: 'application/json',
          authorization: 'Bearer null',
          'content-type': 'application/json;charset=UTF-8',
        },
        method: 'GET',
      },
    ]);
  });

  it('renders correctly on error', async () => {
    fetch.mockRejectOnce(new Error('Any Error'));
    // unresolved fetch request.
    const wrapper = mount(<ANCListView {...props} />);
    expect(wrapper.find('ANCTable').length).toEqual(0);
    expect(wrapper.find('Ripple').length).toEqual(1);

    // resolve fetch
    await new Promise(resolve => setImmediate(resolve));
    wrapper.update();

    expect(toJson(wrapper.find('h2'))).toMatchInlineSnapshot(`
      <h2>
        Any Error
      </h2>
    `);
    expect.assertions(3);
  });

  describe('src/containers/pages/ANC', () => {
    // any tests below this one, that's dependent on the selectors will break.
    it('selectors are called with correct args', async () => {
      const getClientsMock = jest.spyOn(clientDux, 'getClientsArray');
      fetch.once(JSON.stringify(allANC));

      mount(
        <Provider store={store}>
          <Router history={history}>
            <ConnectedANCListView {...props} />
          </Router>
        </Provider>
      );

      await new Promise(resolve => setImmediate(resolve));

      expect(getClientsMock).toHaveBeenCalledWith(SelectorState);
    });
  });
});
