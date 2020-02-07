import { mount, render, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Highcharts from 'highcharts';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import WeightAndHeightChart from '..';
import store from '../../../store/index';
import { WeightMonthYear } from '../../ReportTable';
import chartArgument from './fixtures';

jest.genMockFromModule('highcharts');
jest.mock('highcharts');

const history = createBrowserHistory();

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

const defaultProps = {
    chartWrapperId: 'wrapper-id',
    legendString: 'legend string',
    title: 'the title',
    units: 'kgs',
    xAxisLabel: 'x axis label',
};

jest.useFakeTimers();

describe('WeightAndHeightChart', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });
    it('must render without crashing', () => {
        shallow(<WeightAndHeightChart weights={weights} {...defaultProps} />);
    });

    it('must render correctly', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <WeightAndHeightChart weights={weights} {...defaultProps} />
                </Router>
            </Provider>,
        );
        expect(toJson(wrapper.find('#wrapper-id'))).toMatchSnapshot();
        wrapper.unmount();
    });

    it('calls hicharts.chart with the correct arguments', async () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <WeightAndHeightChart weights={weights} {...defaultProps} />
                </Router>
            </Provider>,
        );
        jest.runAllTimers();
        const argument1 = (Highcharts.chart as jest.MockedFunction<any>).mock.calls[0][0];
        const argument2 = (Highcharts.chart as jest.MockedFunction<any>).mock.calls[0][1];
        expect(argument1).toEqual('wrapper-id');
        (chartArgument.tooltip as any).formatter = argument2.tooltip.formatter;
        expect(typeof argument2.tooltip.formatter).toBe('function');
        expect(argument2).toEqual(chartArgument);
        wrapper.unmount();
    });
});
