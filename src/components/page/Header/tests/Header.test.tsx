import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import HeaderComponent from '../Header';

const history = createBrowserHistory();

describe('components/page/Header', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const props = {
      authenticated: false,
      user: {
        email: '',
        name: '',
        username: '',
      },
    };
    shallow(
      <Router history={history}>
        <HeaderComponent {...props} />
      </Router>
    );
  });

  it('renders header correctly', () => {
    // can check for certain crucial parts.
    const props = {
      authenticated: false,
      user: {
        email: '',
        name: '',
        username: '',
      },
    };
    const wrapper = mount(
      <Router history={history}>
        <HeaderComponent {...props} />
      </Router>
    );
    // snapshot for the first col; should have the brand-image
    // const brandWrapper = wrapper.find('a.navbar-brand');
    // expect(brandWrapper.length).toEqual(1);
    // expect(toJson(brandWrapper)).toMatchSnapshot('Brand-image');

    // the login/logout
    const accntMgmtWrapper = wrapper.find('NavLink');
    expect(toJson(accntMgmtWrapper)).toMatchSnapshot('Login');
    expect(accntMgmtWrapper.text()).toEqual('Login');

    wrapper.unmount();
  });

  it('renders header correctly when authenticated', () => {
    const props = {
      authenticated: true,
      user: {
        email: 'bob@example.com',
        name: 'Bobbie',
        username: 'RobertBaratheon',
      },
    };
    const wrapper = mount(
      <Router history={history}>
        <HeaderComponent {...props} />
      </Router>
    );

    // the login/logout
    const accntMgmtWrapper = wrapper.find('NavLink');
    expect(toJson(accntMgmtWrapper)).toMatchSnapshot('Sign Out');
    expect(accntMgmtWrapper.text()).toEqual('Sign Out');

    wrapper.unmount();
  });
});
