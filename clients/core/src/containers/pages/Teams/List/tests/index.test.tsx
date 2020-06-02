import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import ConnectedTeamList, { TeamList, TeamListProps } from '..';
import store from '../../../../../store';
import reducer, { reducerName, removeTeams, setTotalRecords, fetchTeams } from '../../../../../store/ducks/teams';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');

const history = createBrowserHistory();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('jest-fetch-mock');

describe('containers/teams/list/TeamList', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let openSRPServiceMock: any;
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeTeams());
        const listMock = jest.fn(async () => {
            return fixtures.teamList;
        });
        openSRPServiceMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props: TeamListProps = {
            teamsArray: [],
            fetchTeamsCreator: fetchTeams,
            removeTeamsCreator: removeTeams,
            service: openSRPServiceMock,
            totalRecords: 0,
            setTotalRecordsCreator: setTotalRecords,
        };
        shallow(<TeamList {...props} />);
    });

    it('renders correctly', async () => {
        const props: TeamListProps = {
            teamsArray: [],
            fetchTeamsCreator: fetchTeams,
            removeTeamsCreator: removeTeams,
            service: openSRPServiceMock,
            totalRecords: 0,
            setTotalRecordsCreator: setTotalRecords,
        };
        const wrapper = mount(
            <Router history={history}>
                <TeamList {...props} />
            </Router>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        expect(wrapper.find('TeamTable').text()).toMatchSnapshot('TeamTable');
        wrapper.unmount();
    });

    it('renders correctly when team is an empty ', async () => {
        fetch.once(JSON.stringify([])).once(JSON.stringify([]));
        const wrapper = mount(
            <Router history={history}>
                <TeamList />
            </Router>,
        );
        const rippleWrapper = wrapper.find('Ripple');
        expect(rippleWrapper.length).toEqual(1);
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(wrapper.find('Ripple').length).toEqual(0);
        wrapper.unmount();
    });

    it('works correctly with the redux store', async () => {
        const apiResponse = fixtures.teamList;
        fetch.once(JSON.stringify(apiResponse)).once(JSON.stringify(apiResponse));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedTeamList />
                </Router>
            </Provider>,
        );

        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        const passedProps = wrapper.find('TeamList').props() as TeamListProps;
        expect(passedProps.teamsArray).toEqual(fixtures.teamList);

        wrapper.unmount();
    });
});
