import { shallow, mount } from 'enzyme';
import { createLocation, createMemoryHistory } from 'history';
import * as React from 'react';
import { match, MemoryRouter } from 'react-router';
import ConnectedTeamProfile, { TeamProfile } from '../index';

import { Provider } from 'react-redux';
import store from '../../../../../store';
import teamMember, {
    removeTeamMembers,
    fetchTeamMembers,
    reducerName as teamMemberReducer,
} from '../../../../../store/ducks/teamMembers';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import reducerRegistry from '@onaio/redux-reducer-registry';
import team, { fetchTeams, reducerName as teamsReducer } from '../../../../../store/ducks/teams';

// /** register the team reducer */
reducerRegistry.register(teamsReducer, team);

/** register the teamMember reducer */
reducerRegistry.register(teamMemberReducer, teamMember);

const history = createMemoryHistory();
const path = `/household-profile/:id/`;

const matchVariable: match<{ id: string }> = {
    isExact: false,
    params: { id: fixtures.team1.identifier },
    path,
    url: path.replace(':id', fixtures.team1.identifier),
};

const location = createLocation(matchVariable.url);

jest.mock('../../../../../configs/env');
describe('containers/households/Profile', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const memberListMock = jest.fn(async () => {
            return fixtures.teamMemberList;
        });

        const teamMock = jest.fn(async () => {
            return fixtures.team1;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        classMock = jest.fn((a, b, c) => {
            return {
                list: b === 'organization' ? teamMock : memberListMock,
            };
        });
    });

    it('renders without crashing', () => {
        const props = {
            members: [],
            fetchTeam: fetchTeams,
            fetchMembers: fetchTeamMembers,
            removeMembers: removeTeamMembers,
            opensrpService: classMock,
            history,
            team: fixtures.team1,
            location,
            match: matchVariable,
        };
        const component = shallow(<TeamProfile {...props} />);
        const wrapper = component.find('#teamProfile');
        expect(wrapper.length).toBe(1);
    });

    it('should render the member table', () => {
        const props = {
            members: fixtures.teamMemberList,
            fetchTeam: fetchTeams,
            fetchMembers: fetchTeamMembers,
            removeMembers: removeTeamMembers,
            opensrpService: classMock,
            history,
            team: fixtures.team1,
            location,
            match: matchVariable,
        };
        const component = mount(
            <MemoryRouter initialEntries={['/']} keyLength={0}>
                <TeamProfile {...props} />
            </MemoryRouter>,
        );
        const wrapper = component.find('MemberTable');
        expect(wrapper.length).toBe(1);
    });

    it('should render when team is null', () => {
        const props = {
            members: [],
            fetchTeam: fetchTeams,
            fetchMembers: fetchTeamMembers,
            removeMembers: removeTeamMembers,
            opensrpService: classMock,
            history,
            team: null,
            location,
            match: matchVariable,
        };
        const component = shallow(<TeamProfile {...props} />);
        const wrapper = component.find('#teamProfile');
        expect(wrapper.length).toBe(0);
    });

    it('should work with store', async () => {
        store.dispatch(fetchTeams(fixtures.teamList));
        store.dispatch(fetchTeamMembers(fixtures.teamMemberList));
        const props = {
            members: [],
            fetchTeam: fetchTeams,
            fetchMembers: fetchTeamMembers,
            removeMembers: removeTeamMembers,
            opensrpService: classMock,
            history,
            team: null,
            location,
            match: matchVariable,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedTeamProfile {...props} />
                </MemoryRouter>
            </Provider>,
        );

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        await new Promise((resolve: any) => setImmediate(resolve));
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
        wrapper.unmount();
    });
});
