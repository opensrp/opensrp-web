import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import MockDate from 'mockdate';
import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ConnectedCompartments, { childrenAgeRangeFilterFunction, filterByDateInNextNWeeks } from '..';
import {
    NBC_AND_PNC,
    NEWBORN_REPORT,
    NUTRITION,
    NUTRITION_REGISTRATION,
    NUTRITION_REPORT,
    PREGNANCY,
    PREGNANCY_REGISTRATION,
    SMS_FILTER_FUNCTION,
} from '../../../constants';
import locationsReducer, {
    fetchLocations,
    fetchUserId,
    fetchUserLocations,
    reducerName as locationsReducerName,
} from '../../../store/ducks/locations';
import smsReducer, { fetchSms, reducerName as smsReducerName, SmsData } from '../../../store/ducks/sms_events';
import store from '../../../store/index';
import { communes, districts, provinces, villages } from '../../HierarchichalDataTable/test/fixtures';
import { userLocations } from '../../LogFace/tests/userLocationFixtures';
import { smsDataFixtures } from './fixtures';

const history = createBrowserHistory();
reducerRegistry.register(smsReducerName, smsReducer);
reducerRegistry.register(locationsReducerName, locationsReducer);

describe('Compartments', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(fetchLocations(provinces));
        store.dispatch(fetchLocations(districts));
        store.dispatch(fetchLocations(communes));
        store.dispatch(fetchLocations(villages));
        store.dispatch(fetchUserLocations(userLocations));
        store.dispatch(fetchUserId('515ad0e9-fccd-4cab-8861-0ef3ecb831e0'));
    });
    it('must render without crashing', () => {
        shallow(
            <Provider store={store}>
                <ConnectedCompartments
                    filterArgs={
                        [
                            (smsData: SmsData) => {
                                return smsData.sms_type === PREGNANCY_REGISTRATION;
                            },
                        ] as SMS_FILTER_FUNCTION[]
                    }
                    module={PREGNANCY}
                />
            </Provider>,
        );
    });
    it('must render correctly for pregnancy module', () => {
        store.dispatch(fetchSms([]));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedCompartments
                        filterArgs={
                            [
                                (smsData: SmsData) => {
                                    return smsData.sms_type === PREGNANCY_REGISTRATION;
                                },
                            ] as SMS_FILTER_FUNCTION[]
                        }
                        module={PREGNANCY}
                    />
                </Router>
            </Provider>,
        );

        // compartment title should have the correct text
        expect(toJson(wrapper.find('#compartment_title'))).toMatchSnapshot('compartment title');

        // the sub-heading right below the title
        expect(toJson(wrapper.find('#breadcrumb'))).toMatchSnapshot('subtitle');

        // ensure 0 data circle cards are found
        expect(wrapper.find('DataCircleCard')).toHaveLength(0);

        // ensure that we find a Ripple loader
        expect(wrapper.find('Ripple')).toHaveLength(1);

        expect(wrapper.find('div.compartment-wrapper.compartments').find('Row')).toHaveLength(2);
    });

    it('must display the correct data', () => {
        // find sms_types PREGNANCY_REGISTRATION and change their lmp_edd to be a date in the future.
        for (const dataItem in smsDataFixtures) {
            if (smsDataFixtures[dataItem].sms_type === PREGNANCY_REGISTRATION) {
                smsDataFixtures[dataItem].lmp_edd = new Date(new Date().getTime() + 10 * 86400000);
            }
        }

        store.dispatch(fetchSms(smsDataFixtures));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedCompartments
                        filterArgs={
                            [
                                (smsData: SmsData) => {
                                    return smsData.sms_type === PREGNANCY_REGISTRATION;
                                },
                            ] as SMS_FILTER_FUNCTION[]
                        }
                        module={PREGNANCY}
                    />
                </Router>
            </Provider>,
        );

        expect(
            wrapper
                .find('DataCircleCard')
                .at(0)
                .props(),
        ).toMatchSnapshot();
        expect(
            wrapper
                .find('DataCircleCard')
                .at(1)
                .props(),
        ).toMatchSnapshot();
        expect(
            wrapper
                .find('DataCircleCard')
                .at(2)
                .props(),
        ).toMatchSnapshot();
    });
    it('must render correctly for Nutrition module', () => {
        store.dispatch(fetchSms(smsDataFixtures));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedCompartments
                        filterArgs={
                            [
                                (smsData: SmsData) => {
                                    return (
                                        smsData.sms_type === NUTRITION_REPORT ||
                                        smsData.sms_type === NUTRITION_REGISTRATION
                                    );
                                },
                            ] as SMS_FILTER_FUNCTION[]
                        }
                        module={NUTRITION}
                    />
                </Router>
            </Provider>,
        );

        expect(
            wrapper
                .find('DataCircleCard')
                .at(0)
                .props(),
        ).toMatchSnapshot();
        expect(
            wrapper
                .find('DataCircleCard')
                .at(1)
                .props(),
        ).toMatchSnapshot();
    });

    it('must render correctly for NBC_AND_PNC module', () => {
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedCompartments
                        filterArgs={
                            [
                                (smsData: SmsData) => {
                                    return smsData.sms_type === NEWBORN_REPORT;
                                },
                            ] as SMS_FILTER_FUNCTION[]
                        }
                        module={NBC_AND_PNC}
                    />
                </Router>
            </Provider>,
        );

        expect(
            wrapper
                .find('DataCircleCard')
                .at(0)
                .props(),
        ).toMatchSnapshot();
        expect(
            wrapper
                .find('DataCircleCard')
                .at(1)
                .props(),
        ).toMatchSnapshot();
    });
});

describe('components/Compartments/childrenAgeRangeFilterFunction', () => {
    it('returns the correct sms data items within range', () => {
        MockDate.set(new Date('01/01/2020').getTime());
        const smsData = ([
            { date_of_birth: new Date('01/01/2019').getTime() },
            { date_of_birth: new Date('01/01/2019').getTime() },
            { date_of_birth: new Date('01/20/2019').getTime() },
            { date_of_birth: new Date('01/20/2016').getTime() },
        ] as unknown) as SmsData[];
        expect(smsData.filter(childrenAgeRangeFilterFunction(0, 2)).length).toEqual(2);
        expect(smsData.filter(childrenAgeRangeFilterFunction(0, 3)).length).toEqual(2);
        expect(smsData.filter(childrenAgeRangeFilterFunction(0, 10)).length).toEqual(3);
        MockDate.reset();
    });
});

describe('components/Copartments/filterByDateInNextNWeeks', () => {
    it('returns the correct sms data items within range', () => {
        MockDate.set(new Date('01/01/2020').getTime());
        const smsData = ([
            { lmp_edd: '01/02/2020' },
            { lmp_edd: '01/03/2020' },
            { lmp_edd: '01/05/2020' },
            { lmp_edd: '01/15/2020' },
            { lmp_edd: '01/08/2020' },
            { lmp_edd: '01/09/2020' },
            { lmp_edd: '01/12/2020' },
            { lmp_edd: '04/08/2020' },
            { lmp_edd: '04/09/2020' },
            { lmp_edd: '05/12/2020' },
            { lmp_edd: '07/08/2020' },
            { lmp_edd: '02/09/2020' },
            { lmp_edd: '10/12/2020' },
        ] as unknown) as SmsData[];
        expect(smsData.filter(filterByDateInNextNWeeks(1)).length).toEqual(3);
        expect(smsData.filter(filterByDateInNextNWeeks(2)).length).toEqual(6);
        expect(smsData.filter(filterByDateInNextNWeeks(3)).length).toEqual(7);
        expect(smsData.filter(filterByDateInNextNWeeks(6)).length).toEqual(8);
        expect(smsData.filter(filterByDateInNextNWeeks(15)).length).toEqual(10);
        expect(smsData.filter(filterByDateInNextNWeeks(20)).length).toEqual(11);
        expect(smsData.filter(filterByDateInNextNWeeks(25)).length).toEqual(11);
    });
});
