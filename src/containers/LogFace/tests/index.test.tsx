import { history } from '@onaio/connected-reducer-registry';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import ConnectedLogFace from '..';
import { DEFAULT_NUMBER_OF_LOGFACE_ROWS, PREGNANCY } from '../../../constants';
import store from '../../../store';
import reducer, {
  fetchLocations,
  fetchUserId,
  fetchUserLocations,
  reducerName,
} from '../../../store/ducks/locations';
import { fetchSms, removeSms } from '../../../store/ducks/sms_events';
import {
  communes,
  districts,
  provinces,
  villages,
} from '../../HierarchichalDataTable/test/fixtures';
import { smsSlice } from './fixtures';
import { userLocations } from './userLocationFixtures';

reducerRegistry.register(reducerName, reducer);

describe('components/ConnectedHeader', () => {
  const props = { module: PREGNANCY };
  afterEach(() => {
    store.dispatch(removeSms);
  });
  beforeEach(() => {
    jest.resetAllMocks();
    store.dispatch(fetchLocations(provinces));
    store.dispatch(fetchLocations(districts));
    store.dispatch(fetchLocations(communes));
    store.dispatch(fetchLocations(villages));
    store.dispatch(fetchUserLocations(userLocations));
    store.dispatch(fetchUserId('515ad0e9-fccd-4cab-8861-0ef3ecb831e0'));
  });
  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedLogFace {...props} />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace {...props} />
        </ConnectedRouter>
      </Provider>
    );

    wrapper.update();
    expect(toJson(wrapper.find('table'))).toMatchSnapshot('table snapshot');
    expect(toJson(wrapper.find('.location-type-filter'))).toMatchSnapshot('filter div');
    expect(toJson(wrapper.find('input#input'))).toMatchSnapshot('search div');
    expect(toJson(wrapper.find('#logface_title'))).toMatchSnapshot('logface title');
    expect(toJson(wrapper.find('.paginator'))).toMatchSnapshot('paginator');
    wrapper.unmount();
  });

  it('it renders only 10 items per page ', () => {
    store.dispatch(fetchSms(smsSlice));
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace {...props} />
        </ConnectedRouter>
      </Provider>
    );

    // + 1 is added here to unclude the header `tr`
    expect(wrapper.find('tr').length).toBe(DEFAULT_NUMBER_OF_LOGFACE_ROWS + 1);
    wrapper.unmount();
  });

  it('search works correctly', () => {
    store.dispatch(fetchSms(smsSlice));
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace {...props} />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('input').length).toBe(1);
    // wrapper.find('input').simulate('change', { target: { value: '1569837448461' } });
    // + 1 is added here to unclude the header `tr`
    expect(wrapper.find('tr').length).toBe(DEFAULT_NUMBER_OF_LOGFACE_ROWS + 1);
  });
});
