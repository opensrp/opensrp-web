import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import DataCircleCard from '..';
import store from '../../../store/index';

const history = createBrowserHistory();

describe('DataCircleCard', () => {
  it('must render without crashing', () => {
    const props = { highRisk: 10, lowRisk: 10, noRisk: 10, title: 'test title' };
    shallow(
      <Provider store={store}>
        <Router history={history}>
          <DataCircleCard {...props} />
        </Router>
      </Provider>
    );
  });
  it('must render correctly', () => {
    const props = { highRisk: 10, lowRisk: 10, noRisk: 10, title: 'test title' };
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <DataCircleCard {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('Card'))).toMatchSnapshot();
  });
});
