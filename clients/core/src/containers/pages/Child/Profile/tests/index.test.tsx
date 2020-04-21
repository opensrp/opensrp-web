import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../../store';
import childReducer, {
    Child,
    fetchChildList,
    reducerName as childReducerName,
    removeChildList,
} from '../../../../../store/ducks/child';
import eventReducer, {
    fetchEvents,
    reducerName as eventReducerName,
    removeEvents,
} from '../../../../../store/ducks/events';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import ConnectedChildProfile, { ChildProfile } from '../index';
import { CHILD } from '../../../../../constants';
import { createHashHistory, createMemoryHistory, createLocation } from 'history';
import { match } from 'react-router';
import { BrowserRouter as Router } from 'react-router-dom';

reducerRegistry.register(childReducerName, childReducer);
reducerRegistry.register(eventReducerName, eventReducer);

const history = createMemoryHistory();
const path = `/child-profile/:id/`;

const matchVariable: match<{ id: string }> = {
    isExact: false,
    params: { id: '1' },
    path,
    url: path.replace(':id', '1'),
};

const location = createLocation(matchVariable.url);

jest.mock('../../../../configs/env');
describe('containers/child/profile/childProfile', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props = {
            child: fixtures.child1,
            events: fixtures.events,
            fetchChild: fetchChildList,
            removeChild: removeChildList,
            fetchEvents,
            removeEvents,
            location,
            match: matchVariable,
            history,
            opensrpService: opensrpServiceMock,
        };
        shallow(<ChildProfile {...props} />);
    });

    it('renders correctly', () => {
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props = {
            child: fixtures.child1,
            events: fixtures.events,
            fetchChild: fetchChildList,
            removeChild: removeChildList,
            fetchEvents,
            removeEvents,
            location,
            match: matchVariable,
            history,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(
            <Router>
                <ChildProfile {...props} />
            </Router>,
        );
        expect(wrapper.find('ChildProfile').length).toBe(1);
        wrapper.unmount();
    });

    it('renders correctly when clientsArray is an empty array', () => {
        const opensrpServiceMock: jest.Mock = jest.fn();
        const props = {
            child: undefined,
            events: fixtures.events,
            fetchChild: fetchChildList,
            removeChild: removeChildList,
            fetchEvents,
            removeEvents,
            location,
            match: matchVariable,
            history,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(<ChildProfile {...props} />);
        expect(toJson(wrapper.find('Ripple'))).toMatchSnapshot('Ripple Loader');
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchChildList(fixtures.childList));

        const opensrpServiceMock: jest.Mock = jest.fn();
        const props = {
            child: fixtures.child3,
            events: fixtures.events,
            fetchChild: fetchChildList,
            removeChild: removeChildList,
            fetchEvents,
            removeEvents,
            location,
            match: matchVariable,
            history,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedChildProfile {...props} />
                </Router>
                );
            </Provider>,
        );
        expect(wrapper.find('ChildProfile').length).toBe(1);
        wrapper.unmount();
    });
});
