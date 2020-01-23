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
    removeHouseholdsAction,
} from '../../../../store/ducks/households';
import ConnectedHouseholdList, { HouseholdList, HouseholdListProps } from '../index';
import * as fixtures from '../../../../store/ducks/tests/fixtures';
import * as householdDucks from '../../../../store/ducks/households';

reducerRegistry.register(householdsReducerName, householdsReducer);

jest.mock('../../../../configs/env');
describe('containers/households/list/Householdlist', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        // TODO - dispatch actions that clean the store here.
    });

    it('renders without crashing', () => {
        const listMock = jest.fn(async () => fixtures.households);
        const classMock = jest.fn(() => ({
            list: listMock,
        }));

        // TODO - Do we have to mock the action creators here??? why are we mocking them out?
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: classMock as any,
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };
        shallow(<HouseholdList {...props} />);
    });

    // TODO - I think this test is a proper subset `render household-list container correctly`
    it('renders correctly', () => {
        const listMock = jest.fn(async () => fixtures.households);
        const classMock = jest.fn(() => ({
            list: listMock,
        }));

        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: classMock as any,
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };
        const wrapper = mount(
            <Provider store={store}>
                <HouseholdList {...props} />
            </Provider>,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchHouseholds([fixtures.household1]));
        store.dispatch(setTotalRecords(23));

        // TODO - you also want to make sure we are not making api calls here, so either mock out the service or use jest-fetch-mock

        let wrapper = mount(
            <Provider store={store}>
                <ConnectedHouseholdList />
            </Provider>,
        );
        let foundProps = wrapper.find('HouseholdList').props() as any;
        expect(foundProps.householdsArray).toEqual([fixtures.household1]);
        expect(foundProps.totalRecordsCount).toEqual(23);

        // trying to remove households and match with props.
        store.dispatch(removeHouseholds());
        wrapper = mount(
            <Provider store={store}>
                <ConnectedHouseholdList />
            </Provider>,
        );

        foundProps = wrapper.find('HouseholdList').props() as any;
        expect(foundProps.householdsArray).toEqual([]);
        wrapper.unmount();
    });

    it('render household-list container correctly', async () => {
        const listMock = jest.fn(async () => fixtures.households);
        const classMock = jest.fn(() => ({
            list: listMock,
        }));
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: classMock as any,
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };

        const wrapper = mount(<HouseholdList {...props} />);

        // initially the loading icon would show
        const loadingComponent = wrapper.find('.lds-ripple-parent');
        expect(loadingComponent.length).toBe(1);

        // showing household-list container
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        const householdListContainer = wrapper.find('.household-title');
        expect(householdListContainer.length).toBe(1);
        // TODO - you also want to look at the rendered html if the data that supposed to be rendered.
        wrapper.unmount();
    });

    //TODO - Am not quite sure what's happening here but i don't think this belongs here, tests for selectors working as supposed to are supposed to be the dux module
    it('selectors are working as expected', () => {
        const mountComponent = () => {
            const wrapper = mount(
                <Provider store={store}>
                    <ConnectedHouseholdList />
                </Provider>,
            );
            const householdListWrapper = wrapper.find('HouseholdList');
            expect(householdListWrapper.length).toBe(1);
            const householdListProps: HouseholdListProps = householdListWrapper.props() as HouseholdListProps;
            return { householdListWrapper, householdListProps, wrapper };
        };
        // Adding list of households to the store
        mountComponent().householdListProps.fetchHouseholdsActionCreator(fixtures.households);

        // Mounting the container again to get the effect of the previous call
        const householdListProps = mountComponent().householdListProps;

        // matching the expected result
        expect(householdListProps.householdsArray).toEqual(fixtures.households);
    });

    // TODO -(nitpick) test titles should say why/what you are testing not how you are doing it, a better title for this test-case could be selectors are called with correct arguments
    // TODO - the other ones are very okay.
    it('spy on selectors', () => {
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
    });
});
