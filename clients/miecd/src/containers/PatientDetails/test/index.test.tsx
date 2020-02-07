import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import PatientDetails from '..';
import smsReducer, { reducerName } from '../../../store/ducks/sms_events';
import store from '../../../store/index';

// /** register the superset reducer */
reducerRegistry.register(reducerName, smsReducer);

const history = createBrowserHistory();

jest.genMockFromModule('highcharts');
jest.mock('highcharts');
const props = {
    match: {
        params: { patient_id: '0' },
        url: 'nutrition',
    },
};

describe('PatientDetails', () => {
    it('Renders without crashing', () => {
        shallow(
            <Provider store={store}>
                <Router history={history}>
                    <PatientDetails {...props} />
                </Router>
            </Provider>,
        );
    });
    it('must render correctly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <PatientDetails {...props} />
                </Router>
            </Provider>,
        );
    });
});
