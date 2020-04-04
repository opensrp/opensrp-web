import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import ConnectedClientsList, { ClientList } from '..';
import store from '../../../../../store';
import reducer, { reducerName, removeClients } from '../../../../../store/ducks/clients';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import { Helmet } from 'react-helmet';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');

const apiEmptyResponse = {
    clients: [],
    total: 0,
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('jest-fetch-mock');

describe('containers/clients/list/ClientList', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let openSRPServiceMock: any;
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeClients());
        const listMock = jest.fn(async () => {
            return { clients: fixtures.clients, total: fixtures.clients.length };
        });
        openSRPServiceMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props = {
            clientsArray: [],
            totalRecords: 0,
            service: openSRPServiceMock,
        };
        shallow(<ClientList {...props} />);
    });

    it('renders correctly', () => {
        const props = {
            clientsArray: fixtures.clients,
            totalRecords: fixtures.clients.length,
            service: openSRPServiceMock,
        };
        const wrapper = mount(<ClientList {...props} />);
        // page title
        expect(wrapper.find('.household-title').text()).toMatchInlineSnapshot();
        // html document title
        const helmet = Helmet.peek();
        expect(helmet.title).toEqual('ALL Clients PAge');

        expect(wrapper.find('ClientTable').text()).toMatchSnapshot('Clients Table');
        wrapper.unmount();
    });

    it('renders correctly when clientsArray is an empty array', async () => {
        fetch.once(JSON.stringify(apiEmptyResponse));
        const wrapper = mount(<ClientList />);
        await new Promise(resolve => setImmediate(resolve));
        const rippleWrapper = wrapper.find('Ripple');
        expect(rippleWrapper.length).toEqual(1);
        wrapper.unmount();
    });

    it('works correctly with the redux store', async () => {
        const apiResponse = { clients: fixtures.clients, total: fixtures.clients.length };
        fetch.once(JSON.stringify(apiResponse));
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedClientsList />
            </Provider>,
        );

        await new Promise(resolve => setImmediate(resolve));

        const passedProps = wrapper.find('ClientList').props() as any;
        expect(passedProps.clientsArray).toEqual(fixtures.clients);
        expect(passedProps.totalRecords).toEqual(fixtures.clients.length);

        wrapper.unmount();
    });

    it('calls openSRPService with the correct params', async () => {
        fetch.once(JSON.stringify(apiEmptyResponse));
        const wrapper = mount(
            <Provider store={store}>
                <ConnectedClientsList />
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        expect(fetch.mock.calls).toEqual([]);

        wrapper.unmount();
    });
});
