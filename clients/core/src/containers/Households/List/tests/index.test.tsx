import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import householdsReducer, {
    reducerName as householdsReducerName,
    fetchHouseholds,
    setTotalRecords,
    removeHouseholds,
} from '../../../../store/ducks/households';
import ConnectedHouseholdList, { HouseholdList, HouseholdListProps } from '../index';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import * as householdDucks from '../../../../store/ducks/households';
import { HOUSEHOLD_URL } from '../../../../constants';
import { createBrowserHistory } from 'history';

reducerRegistry.register(householdsReducerName, householdsReducer);

jest.mock('../../../../configs/env');
describe('containers/households/list/Householdlist', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;

    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeHouseholds());
        store.dispatch(setTotalRecords(0));

        const listMock = jest.fn(async () => fixtures.households);
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: fetchHouseholds,
            householdsArray: [],
            opensrpService: classMock,
            removeHouseholdsActionCreator: removeHouseholds,
            setTotalRecordsActionCreator: setTotalRecords,
            totalRecordsCount: 0,
        };
        shallow(<HouseholdList {...props} />);
    });

    it('works correctly with the redux store', async () => {
        store.dispatch(fetchHouseholds([fixtures.household1]));
        store.dispatch(setTotalRecords(23));

        const props = {
            history: createBrowserHistory(),
            location: jest.fn(),
            match: {
                params: { id: '' },
                path: HOUSEHOLD_URL,
                url: HOUSEHOLD_URL,
            },
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: createBrowserHistory(),
            opensrpService: classMock,
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };

        const wrapper = mount(
            <Provider store={store}>
                <ConnectedHouseholdList {...props} />
            </Provider>,
        );
        let foundProps = wrapper.find('HouseholdList').props() as HouseholdListProps;
        expect(foundProps.householdsArray).toEqual([fixtures.household1]);
        expect(foundProps.totalRecordsCount).toEqual(23);

        // trying to remove households and match with props.
        store.dispatch(removeHouseholds());

        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        foundProps = wrapper.find('HouseholdList').props() as HouseholdListProps;
        expect(foundProps.householdsArray).toEqual([]);
        wrapper.unmount();
    });

    it('render household-list container correctly', async () => {
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: classMock,
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };

        const wrapper = mount(<HouseholdList {...props} />);

        // initially the loading icon would show
        const loadingComponent = wrapper.find('.lds-ripple-parent');
        expect(loadingComponent.length).toBe(1);

        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('selectors are called with correct arguments and intended times', () => {
        const spyOnFetchHouseholds = jest.spyOn(householdDucks, 'fetchHouseholds');
        const spyOnTotalRecords = jest.spyOn(householdDucks, 'setTotalRecords');
        store.dispatch(fetchHouseholds(fixtures.households));
        store.dispatch(setTotalRecords(2));

        mount(
            <Provider store={store}>
                <ConnectedHouseholdList />
            </Provider>,
        );

        expect(spyOnFetchHouseholds).toHaveBeenCalledTimes(1);
        expect(spyOnTotalRecords).toHaveBeenCalledTimes(1);
        expect(spyOnFetchHouseholds).toHaveBeenCalledWith(fixtures.households);
        expect(spyOnTotalRecords).toHaveBeenCalledWith(2);
    });
});
