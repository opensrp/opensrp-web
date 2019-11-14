import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import MotherWeightChart from '..';
import store from '../../../store/index';
import { WeightMonthYear } from '../../ReportTable';

jest.genMockFromModule('highcharts');
jest.mock('highcharts');

const history = createBrowserHistory();
// export interface WeightMonthYear {
//   weight: number;
//   month: number;
//   year: number;
// }

const weights = [
  {
    month: 20,
    weight: 10,
    year: 2019,
  },
  {
    month: 8,
    weight: 10,
    year: 2019,
  },
  {
    month: 28,
    weight: 9,
    year: 2019,
  },
] as WeightMonthYear[];
describe('MotherWeightChart', () => {
  it('must render without crashing', () => {
    shallow(<MotherWeightChart weights={weights} />);
  });
  it('must render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <MotherWeightChart weights={weights} />
        </Router>
      </Provider>
    );
    expect(toJson(wrapper.find('#chart-wrapper'))).toMatchSnapshot();
  });
});
