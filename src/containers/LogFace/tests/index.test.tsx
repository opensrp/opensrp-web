import { authenticateUser } from '@onaio/session-reducer';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import ConnectedLogFace from '..';
import store from '../../../store';

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
    expect(toJson(wrapper.find('Table'))).toMatchSnapshot('table snapshot');
    expect(toJson(wrapper.find('.location-type-filter'))).toMatchSnapshot('filter div');
    expect(toJson(wrapper.find('input#input'))).toMatchSnapshot('search div');
    expect(toJson(wrapper.find('#logface_title'))).toMatchSnapshot('logface title');
    wrapper.unmount();
  });
});
