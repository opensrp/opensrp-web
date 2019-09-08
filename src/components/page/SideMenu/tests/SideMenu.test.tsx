import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import SideMenu from '../SideMenu';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faChartLine, faCog } from '@fortawesome/free-solid-svg-icons';
library.add(faUser);
library.add(faChartLine);
library.add(faCog);

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
    expect(toJson(wrapper.find('SideMenu'))).toMatchSnapshot();
    wrapper.unmount();
  });
});
