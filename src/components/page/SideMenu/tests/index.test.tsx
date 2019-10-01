import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SideMenu from '..';
import { CLIENT } from '../../../../constants';

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

  it('renders side menu correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <SideMenu />
      </Router>
    );
    /** client Collapse SubMenu renders correctly */
    expect(toJson(wrapper.find('Nav .side-collapse-nav').first())).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders expanded menus correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <SideMenu />
      </Router>
    );
    /** expands first SubMenu */
    wrapper
      .find('Nav .side-collapse-nav')
      .first()
      .simulate('click');
    expect(toJson(wrapper.find('Collapse').first())).toMatchSnapshot();
    /** collapse first SubMenu */
    wrapper
      .find('Nav .side-collapse-nav')
      .first()
      .simulate('click');
    expect(toJson(wrapper.find('Collapse').first())).toMatchSnapshot();
    wrapper.unmount();
  });

  it('manages state correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <SideMenu />
      </Router>
    );
    wrapper.find('SideMenu').simulate('click');
    expect(wrapper.find('SideMenu').state('expandedNavs')).toEqual([]);
    wrapper
      .find('Nav .side-collapse-nav')
      .first()
      .simulate('click');
    expect(wrapper.find('SideMenu').state('expandedNavs')).toEqual([CLIENT]);
    wrapper.unmount();
  });
});
