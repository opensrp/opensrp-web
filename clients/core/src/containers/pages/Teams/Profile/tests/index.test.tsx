import { shallow } from 'enzyme';
import { createLocation, createMemoryHistory } from 'history';
import * as React from 'react';
import { match } from 'react-router';
import { TeamProfile } from '../index';

// import { Provider } from 'react-redux';
// import store from '../../../../../store';
import { removeTeamMembers, fetchTeamMembers } from '../../../../../store/ducks/teamMembers';
import { fetchTeams } from '../../../../../store/ducks/teams';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';

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
});
