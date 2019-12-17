import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Helmet } from 'react-helmet';
import ConnectedANCListView, { ANCListProps, ANCListView } from '../../list';
import { OpenSRPService } from '../../../../../services/opensrp';
import store from '../../../../../store';
import * as clientDux from '../../../../../store/ducks/clients';
import { allANC } from './fixtures';

// tslint:disable-next-line: no-var-requires
const fetch = require('jest-fetch-mock');

const signal = new AbortController().signal;

const props: ANCListProps = {
  ANCArray: [],
  fetchClientsCreator: clientDux.fetchClients,
  service: OpenSRPService,
};

describe('src/containers/pages/ANC', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    fetch.resetMocks();
  });

  it('renders without crashing', async () => {
    fetch.once(JSON.stringify([]));
    await new Promise(resolve => setImmediate(resolve));
    shallow(<ANCListView {...props} />);
  });

  it('renders correctly', async () => {
    fetch.once(JSON.stringify([]));
    // unresolved fetch request.
    const wrapper = mount(<ANCListView {...props} />);
    expect(wrapper.find('ANCTable').length).toEqual(0);
    expect(wrapper.find('Ripple').length).toEqual(1);

    // resolve fetch
    await new Promise(resolve => setImmediate(resolve));
    expect(wrapper.find('ANCTable').length).toEqual(1);

    // we are setting title
    const helmet = Helmet.peek();
    expect(helmet.title).toEqual(``);
  });

  it('works correctly with store', async () => {
    fetch.once(JSON.stringify([]));
    store.dispatch(clientDux.fetchClients(allANC));
    const wrapper = mount(<ConnectedANCListView {...props} />);

    await new Promise(resolve => setImmediate(resolve));

    const passedProps = wrapper.find('ANCListView').props();
    expect((passedProps as ANCListProps).ANCArray).toEqual(allANC);
  });

  it('makes the correct api calls', async () => {
    fetch.once(JSON.stringify(allANC));
    const wrapper = mount(<ConnectedANCListView {...props} />);

    await new Promise(resolve => setImmediate(resolve));
    expect(fetch.mock.calls[0]).toEqual([]);
  });

  it('renders correctly on error', async () => {
    fetch.mockRejectOnce(new Error('Any Error'));
    // unresolved fetch request.
    const wrapper = mount(<ANCListView {...props} />);
    expect(wrapper.find('ANCTable').length).toEqual(0);
    expect(wrapper.find('Ripple').length).toEqual(1);

    // resolve fetch
    await new Promise(resolve => setImmediate(resolve));
    expect.assertions(3);
  });
});

describe('src/containers/pages/ANC', () => {
  // any tests below this one, that's dependent on the selectors will break.
  it('selectors are called with correct args', async () => {
    const getClientsArrayMock = jest.spyOn(clientDux, 'getClientsArray');
    fetch.once(JSON.stringify(allANC));

    mount(<ConnectedANCListView {...props} />);

    await new Promise(resolve => setImmediate(resolve));

    expect(getClientsArrayMock).toHaveBeenCalledWith({});
  });
});
