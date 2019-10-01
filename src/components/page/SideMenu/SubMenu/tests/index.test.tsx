import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import { SubMenu, SubMenuProps } from '..';

const history = createBrowserHistory();

describe('components/page/SubMenu', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props: SubMenuProps = {
      history,
      childNavs: [],
      collapsedModuleLabel: 'All client Records',
      parentNav: { icon: ['far', 'user'], label: 'All client Records' },
    };
    shallow(<SubMenu {...props} />);
  });

  it('renders subMenu correctly when in collapsed state', () => {
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/users' }, { label: 'Roles', url: '/roles' }],
      collapsedModuleLabel: 'Admin',
      parentNav: { icon: ['fas', 'cog'], label: 'Admin' },
    };
    const wrapper = mount(<SubMenu {...props} />);
    // parent nav
    const parentNav = wrapper.find('.collapse-menu-title');
    expect(parentNav.length).toEqual(1);

    // the child navs
    const usersNav = wrapper.find('a[href="/users"]');
    expect(usersNav.length).toEqual(1);

    const rolesNav = wrapper.find('a[href="/roles"]');
    expect(rolesNav.length).toEqual(1);
    wrapper.unmount();
  });

  it('toggles between collapsed and closed state', () => {
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/users' }, { label: 'Roles', url: '/roles' }],
      collapsedModuleLabel: '',
      parentNav: { icon: ['fas', 'cog'], label: 'Admin' },
    };

    const wrapper = mount(<Router history={history} >
    <SubMenu {...props} />)
    </Router>;

    // starts with submenu as closed, not collapsed
    let usersNav = wrapper.find('a[href="/users"]');
    expect(usersNav.length).toEqual(0);

    // clicking on parent nav negates the above
    const parentNav = wrapper.find('.side-collapse-nav');
    expect(parentNav.length).toBeGreaterThanOrEqual(1);
    parentNav.simulate('click');
    wrapper.update();

    // after the collapse childNavs are now visible
    usersNav = wrapper.find('a[href="/users"]');
    expect(usersNav.length).toEqual(1);

    wrapper.unmount();
  });

  it('stimulates click and calls mock function properly', () => {
    const mockCallBack = jest.fn();
    const props: SubMenuProps = {
      childNavs: [{ label: 'Users', url: '/users' }],
      collapsedModuleLabel: 'Admin',
      parentNav: { icon: ['fas', 'cog'], label: 'Admin' },
      setCollapsedModuleLabel: mockCallBack,
    };
    const wrapper = mount(
      <Router history={history}>
        <SubMenu {...props} />
      </Router>
    );
    wrapper.find('Nav .side-collapse-nav').simulate('click');
    expect(mockCallBack.mock.calls.length).toEqual(1);
    wrapper.unmount();
  });
});
