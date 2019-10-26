import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import MotherWeightChart from '..';
import store from '../../../store/index';

jest.genMockFromModule('highcharts');
jest.mock('highcharts');

const history = createBrowserHistory();

describe('MotherWeightChart', () => {
  it('must render without crashing', () => {
    const props = { weights: [10, 20, 18, 28, 5] };
    shallow(<MotherWeightChart {...props} />);
  });
  it('must render correctly', () => {
    const props = { weights: [10, 20, 18, 28, 5] };
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <MotherWeightChart {...props} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('#chart-wrapper'))).toMatchSnapshot();
  });
});
