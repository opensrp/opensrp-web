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
} from '../../../../store/ducks/households';
import ConnectedHouseholdList, { HouseholdList, HouseholdListProps } from '../index';
import * as fixtures from '../../../../store/ducks/tests/fixtures';

reducerRegistry.register(householdsReducerName, householdsReducer);

jest.mock('../../../../configs/env');
describe('containers/households/list/Householdlist', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: jest.fn(),
            removeHouseholdsActionCreator: jest.fn(),
            setTotalRecordsActionCreator: jest.fn(),
            totalRecordsCount: 0,
        };
        shallow(<HouseholdList {...props} />);
    });

    it('renders correctly', () => {
        const props: HouseholdListProps = {
            fetchHouseholdsActionCreator: jest.fn(),
            householdsArray: [],
            opensrpService: jest.fn(),
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
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedHouseholdList />
            </Provider>,
        );
        const foundProps = wrapper.find('HouseholdList').props() as any;
        expect(foundProps.householdsArray).toEqual([fixtures.household1]);
        wrapper.unmount();
    });
});
