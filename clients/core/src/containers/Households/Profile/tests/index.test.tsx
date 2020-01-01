import { shallow } from 'enzyme';
import { createLocation, createMemoryHistory } from 'history';
import * as React from 'react';
import { match } from 'react-router';
import { household1 } from '../../../../store/ducks/tests/fixtures';
import { HouseholdProfile, HouseholdProfileProps } from '../index';

const history = createMemoryHistory();
const path = `/household/profile/:id/`;

const matchVariable: match<{ id: string }> = {
    isExact: false,
    params: { id: '1' },
    path,
    url: path.replace(':id', '1'),
};

const location = createLocation(matchVariable.url);

jest.mock('../../../../configs/env');
describe('containers/households/Profile', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const props: HouseholdProfileProps = {
            events: [],
            fetchClientActionCreator: jest.fn(),
            fetchEventsActionCreator: jest.fn(),
            fetchMembersActionCreator: jest.fn(),
            history,
            household: household1,
            location,
            match: matchVariable,
            members: [],
            opensrpService: jest.fn(),
            removeMembersActionCreator: jest.fn(),
        };
        const component = shallow(<HouseholdProfile {...props} />);
        const wrapper = component.find('#householdProfile');
        expect(wrapper.length).toBe(1);
    });
});
