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

    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
