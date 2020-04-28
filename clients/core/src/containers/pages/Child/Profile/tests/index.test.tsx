import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import store from '../../../../../store';
import childReducer, {
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
import { createMemoryHistory, createLocation } from 'history';
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

jest.mock('../../../../../configs/env');
describe('containers/child/profile/childProfile', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const childMock = jest.fn(async () => {
            return fixtures.childList;
        });

        const eventMock = jest.fn(async () => {
            return [fixtures.event4, fixtures.event5];
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        classMock = jest.fn((a, b, c) => {
            return {
                list: b === 'client/search' ? childMock : eventMock,
            };
        });
    });

    it('renders without crashing', () => {
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
            opensrpService: classMock,
        };
        shallow(<ChildProfile {...props} />);
    });

    it('renders correctly', () => {
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
            opensrpService: classMock,
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
            opensrpService: classMock,
        };
        const wrapper = mount(<ChildProfile {...props} />);
        expect(toJson(wrapper.find('Ripple'))).toMatchSnapshot('Ripple Loader');
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchChildList(fixtures.childList));
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
            opensrpService: classMock,
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

    it('calls the server and then render basic-info and current register correctly', async () => {
        const props = {
            child: [],
            events: [],
            fetchChild: fetchChildList,
            removeChild: removeChildList,
            fetchEvents,
            removeEvents,
            location,
            match: matchVariable,
            history,
            opensrpService: classMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <Router>
                    <ConnectedChildProfile {...props} />
                </Router>
                );
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(wrapper.find('.register-section').length).toMatchSnapshot();
        wrapper.unmount();
    });
});
