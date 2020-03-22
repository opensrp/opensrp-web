import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import * as React from 'react';
import { Provider } from 'react-redux';
import ConnectedClientsList, { ClientList, ClientListProps } from '..';
import store from '../../../../../store';
import reducer, { fetchClients, reducerName, removeClients, setTotalRecords } from '../../../../../store/ducks/clients';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import { MemoryRouter } from 'react-router';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');
describe('containers/clients/list/ClientList', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let opensrpServiceMock: any;
    beforeEach(() => {
        jest.resetAllMocks();
        const listMock = jest.fn(async () => {
            return { clients: fixtures.clients, total: fixtures.clients.length };
        });
        opensrpServiceMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            clientsArray: fixtures.clients,
            fetchClientsActionCreator: fetchClients,
            removeClients: mock,
            totalRecords: 0,
            setTotalRecords: mock,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = shallow(<ClientList {...props} />);
        expect(wrapper.length).toBe(1);
    });

    it('renders correctly', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            clientsArray: fixtures.clients,
            fetchClientsActionCreator: fetchClients,
            removeClients: mock,
            totalRecords: 0,
            setTotalRecords: mock,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(<ClientList {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('renders correctly when clientsArray is an empty array', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            clientsArray: [],
            fetchClientsActionCreator: mock,
            removeClients: mock,
            totalRecords: 0,
            setTotalRecords: mock,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(<ClientList {...props} />);
        expect(toJson(wrapper.find('Ripple'))).toMatchSnapshot('Ripple Loader');
        wrapper.unmount();
    });

    it('works correctly with the redux store', () => {
        store.dispatch(fetchClients(fixtures.clients));
        const mock: jest.Mock = jest.fn();
        const props = {
            fetchClientsActionCreator: mock,
            removeClients: mock,
            totalRecords: 0,
            setTotalRecords: mock,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedClientsList {...props} />
                );
            </Provider>,
        );
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('calls openSRPService with the correct params', () => {
        const mock: jest.Mock = jest.fn();
        const props = {
            fetchClientsActionCreator: mock,
            removeClients: mock,
            totalRecords: 0,
            setTotalRecords: mock,
            opensrpService: opensrpServiceMock,
        };
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedClientsList {...props} />
            </Provider>,
        );
        expect(opensrpServiceMock.mock.calls[0][0]).toEqual('https://test.smartregister.org/opensrp/rest/');
        wrapper.unmount();
    });

    it(' should update the props after server call', async () => {
        const props: ClientListProps = {
            clientsArray: [],
            fetchClientsActionCreator: fetchClients,
            removeClients: removeClients,
            opensrpService: opensrpServiceMock,
            totalRecords: 0,
            setTotalRecords: setTotalRecords,
        };
        const wrapper = mount(
            <Provider store={store}>
                <MemoryRouter initialEntries={['/']} keyLength={0}>
                    <ConnectedClientsList {...props} />
                </MemoryRouter>
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        const foundProps = wrapper.find('ClientList').props() as any;
        expect(foundProps.totalRecords as number).toBe(7);
        wrapper.unmount();
    });
});
