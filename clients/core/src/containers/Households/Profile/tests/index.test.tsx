import { shallow, mount } from 'enzyme';
import { createLocation, createMemoryHistory } from 'history';
import * as React from 'react';
import { match, MemoryRouter } from 'react-router';
import { household1 } from '../../../../store/ducks/tests/fixtures';
import ConnectedHouseholdProfile, { HouseholdProfile } from '../index';
import * as fixtures from '../../../../../src/store/ducks/tests/fixtures';
import { fetchClients, removeClients } from '../../../../store/ducks/clients';
import { fetchHouseholds } from '../../../../store/ducks/households';
import { fetchEvents } from '../../../../store/ducks/events';
import { Provider } from 'react-redux';
import store from '../../../../store';

const history = createMemoryHistory();
const path = `/household-profile/:id/`;

const matchVariable: match<{ id: string }> = {
    isExact: false,
    params: { id: fixtures.household1.baseEntityId },
    path,
    url: path.replace(':id', fixtures.household1.baseEntityId),
};

const location = createLocation(matchVariable.url);

jest.mock('../../../../configs/env');
describe('containers/households/Profile', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const clientListMock = jest.fn(async () => {
            return { clients: fixtures.clients, total: 7 };
        });

        const clientMock = jest.fn(async () => {
            return fixtures.households;
        });

        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        classMock = jest.fn((a, b, c) => {
            return {
                list: b === 'client/search' ? clientMock : clientListMock,
            };
        });
    });

    it('renders without crashing', () => {
        const props = {
            events: [],
            fetchClient: fetchHouseholds,
            fetchEvents: fetchEvents,
            fetchMembers: fetchClients,
            removeMembers: removeClients,
            history,
            household: household1,
            location,
            match: matchVariable,
            members: [],
            opensrpService: classMock,
        };
        const component = shallow(<HouseholdProfile {...props} />);
        const wrapper = component.find('#household-profile');
        expect(wrapper.length).toBe(1);
    });

    it('render the basic information and member list correctly', async () => {
        const props = {
            events: [],
            fetchClient: fetchHouseholds,
            fetchEvents: fetchEvents,
            fetchMembers: fetchClients,
            removeMembers: removeClients,
            history,
            household: household1,
            location,
            match: matchVariable,
            members: [],
            opensrpService: classMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedHouseholdProfile {...props} />
                </MemoryRouter>
            </Provider>,
        );

        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(wrapper).toMatchSnapshot();
    });
});
