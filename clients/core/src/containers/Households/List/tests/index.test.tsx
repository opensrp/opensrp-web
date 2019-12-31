import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../store';
import householdsReducer, { reducerName as householdsReducerName } from '../../../../store/ducks/households';
import { HouseholdList, HouseholdListProps } from '../index';

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

    it('works correctly with the redux store', () => {
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
});
