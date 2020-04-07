import reducerRegistry from '@onaio/redux-reducer-registry';
import { mount, shallow } from 'enzyme';
import * as React from 'react';
import { Provider } from 'react-redux';
import ConnectedClientsList, { ClientList, ClientListProps } from '..';
import store from '../../../../../store';
import reducer, { reducerName, removeClients } from '../../../../../store/ducks/clients';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';
import { Helmet } from 'react-helmet';
import { createBrowserHistory } from 'history';
import { Router } from 'react-router';
import { ALL_CLIENTS } from '../../../../../constants';

reducerRegistry.register(reducerName, reducer);

jest.mock('../../../../../configs/env');

const apiEmptyResponse = {
    clients: [],
    total: 0,
};

const history = createBrowserHistory();
const { signal } = new AbortController();

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
            clients: [],
            totalRecords: 0,
            service: openSRPServiceMock,
        };
        shallow(<ClientList {...props} />);
    });

    it('renders correctly', async () => {
        const props = {
            clients: fixtures.clients,
            totalRecords: fixtures.clients.length,
            service: openSRPServiceMock,
        };
        const wrapper = mount(
            <Router history={history}>
                <ClientList {...props} />
            </Router>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        // expect(toJson(wrapper)).toMatchSnapshot();
        // page title
        expect(wrapper.find('.household-title').text()).toMatchInlineSnapshot(`" All Clients (7)"`);
        // html document title
        const helmet = Helmet.peek();
        expect(helmet.title).toEqual(ALL_CLIENTS);

        expect(wrapper.find('ClientTable').text()).toMatchSnapshot('Clients Table');
        wrapper.unmount();
    });

    it('renders correctly when clients is an empty ', async () => {
        fetch.once(JSON.stringify(apiEmptyResponse)).once(JSON.stringify(apiEmptyResponse));
        const wrapper = mount(
            <Router history={history}>
                <ClientList />
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
        const apiResponse = { clients: fixtures.clients, total: fixtures.clients.length };
        fetch.once(JSON.stringify(apiResponse)).once(JSON.stringify(apiResponse));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedClientsList />
                </Router>
            </Provider>,
        );

        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();

        const passedProps = wrapper.find('ClientList').props() as ClientListProps;
        expect(passedProps.clientsArray).toEqual(fixtures.clients);
        expect(passedProps.totalRecords).toEqual(fixtures.clients.length);

        wrapper.unmount();
    });

    it('calls openSRPService with the correct params', async () => {
        fetch.mockResponse(JSON.stringify(apiEmptyResponse));
        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedClientsList />
                </Router>
            </Provider>,
        );
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/client/searchByCriteria?clientType=clients&pageNumber=1&pageSize=10&gender=&searchText=',
                {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer null',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'GET',
                    signal: signal,
                },
            ],
            [
                'https://test.smartregister.org/opensrp/rest/client/searchByCriteria?clientType=clients&pageNumber=1&pageSize=10&gender=&searchText=',
                {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer null',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'GET',
                    signal: signal,
                },
            ],
        ]);

        const foundProps = wrapper.find('ClientList').props() as ClientListProps;
        expect(foundProps.totalRecords as number).toBe(7);
        wrapper.unmount();
    });
});
