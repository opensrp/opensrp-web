import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SideMenu from '../SideMenu';

const history = createBrowserHistory();

describe('components/page/SideMenu', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(
      <Router history={history}>
        <SideMenu />
      </Router>
    );
  });

  it('renders header correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <SideMenu />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
