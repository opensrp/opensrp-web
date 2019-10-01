import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SubMenu, { SubMenuProps } from '..';

const history = createBrowserHistory();

describe('components/page/SubMenu', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props: SubMenuProps = {
      childNavs: [],
      identifier: 'CLIENT',
      isCollapseMenuActive: true,
      isExpand: true,
      parentNav: { icon: ['far', 'user'], label: 'All client Records' },
    };
    shallow(
      <Router history={history}>
        <SubMenu {...props} />
      </Router>
    );
  });

  it('renders expanded nav correctly', () => {
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/users' }, { label: 'Roles', url: '/roles' }],
      identifier: 'ADMIN',
      isCollapseMenuActive: true,
      isExpand: true,
      parentNav: { navIcon: ['fas', 'cog'], label: 'Admin' },
    };
    const wrapper = mount(
      <Router history={history}>
        <SubMenu {...props} />
      </Router>
    );
    /** match Users navItem json */
    expect(toJson(wrapper.find('NavItem .nav-item-extend').first())).toMatchSnapshot();
    wrapper.unmount();
  });

  it('renders collapsed nav correctly', () => {
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/404' }],
      identifier: 'ADMIN',
      isCollapseMenuActive: true,
      isExpand: false,
      parentNav: { navIcon: ['fas', 'cog'], label: 'Admin' },
    };
    const wrapper = mount(
      <Router history={history}>
        <SubMenu {...props} />
      </Router>
    );
    expect(toJson(wrapper.find('SubMenu'))).toMatchSnapshot();
    wrapper.unmount();
  });

  it('stimulates click and calls mock function properly', () => {
    const mockCallBack = jest.fn();
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/404' }],
      identifier: 'ADMIN',
      isCollapseMenuActive: true,
      isExpand: false,
      parentNav: { navIcon: ['fas', 'cog'], label: 'Admin' },
      setSideMenuToggle: mockCallBack,
    };
    const wrapper = mount(
      <Router history={history}>
        <SubMenu {...props} />
      </Router>
    );
    wrapper.find('Nav .side-collapse-nav').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    wrapper.find('Nav .side-collapse-nav').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(2);
    wrapper.unmount();
  });\
});
