import { history } from '@onaio/connected-reducer-registry';
import { ConnectedRouter } from 'connected-react-router';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import ConnectedLogFace from '..';
import store from '../../../store';
import { fetchSms } from '../../../store/ducks/sms_events';
import { smsSlice } from './fixtures';

describe('components/ConnectedHeader', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(
      <Provider store={store}>
        <ConnectedLogFace />
      </Provider>
    );
  });

  it('renders correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedLogFace />
      </Provider>
    );
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
          <ConnectedLogFace />
        </ConnectedRouter>
      </Provider>
    );
    // 11 here is to include the header
    expect(wrapper.find('tr').length).toBe(11);
    wrapper.unmount();
  });

  it('next and previous pagination buttons work correctly', () => {
    store.dispatch(fetchSms(smsSlice));
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('#next').length).toBe(1);
    expect(wrapper.find('#previous').length).toBe(0);
    wrapper.find('#next').simulate('click');
    expect(wrapper.find('#previous').length).toBe(1);
    wrapper.unmount();
  });

  it('search works correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <ConnectedRouter history={history}>
          <ConnectedLogFace />
        </ConnectedRouter>
      </Provider>
    );

    expect(wrapper.find('input').length).toBe(1);
    wrapper.find('input').simulate('change', { target: { value: '1569837448461' } });
    expect(wrapper.find('tr').length).toBe(11);
  });
});
