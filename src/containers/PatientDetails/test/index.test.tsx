import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { PatientDetails } from '..';
import store from '../../../store/index';

const history = createBrowserHistory();

jest.genMockFromModule('highcharts');
jest.mock('highcharts');

describe('PatientDetails', () => {
  it('Renders without crashing', () => {
    shallow(<PatientDetails />);
  });
  it('must render correctly', () => {
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <PatientDetails />
        </Router>
      </Provider>
    );
  });
});
