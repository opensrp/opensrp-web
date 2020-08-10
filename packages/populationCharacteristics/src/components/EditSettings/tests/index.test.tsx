import React from 'react';
import { mount, shallow } from 'enzyme';
import { act } from 'react-dom/test-utils';
import { createBrowserHistory } from 'history';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import _ from 'lodash';
import { EditSetings, ConnectedEditSetings } from '..';
import settingsReducer, {
    settingsReducerName,
    fetchLocSettings,
    removeLocSettingAction,
} from '../../../ducks/settings';
import locationReducer, { fetchLocs, locationReducerName as LocsReducerName } from '../../../ducks/locations';
import { locHierarchy, allSettings2, setting3, setting4 } from './fixtures';
import { setting1, setting2 } from './fixtures';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(LocsReducerName, locationReducer);

const actualDebounce = _.debounce;
const customDebounce = (callback: any) => callback;
_.debounce = customDebounce;

const history = createBrowserHistory();

const restBaseURL = 'https://test-example.com/opensrp/rest/';
const baseURL = 'https://test-example.com/opensrp/';

const props = {
    baseURL,
    getPayload: getFetchOptions,
    locationsEndpoint: 'location-tree',
    restBaseURL,
    secAuthEndpoint: 'security/authenticate',
    settingsEndpoint: 'settings/',
    v2BaseUrl: 'https://test-example.com/opensrp/rest/v2/',
};

describe('components/Editsettings', () => {
    afterAll(() => {
        _.debounce = actualDebounce;
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        shallow(<EditSetings {...props} />);
    });

    it('renders correctly when connected to store', async () => {
        const allSettings = [setting1, setting2];
        const mockList = jest.fn();
        const mockRead = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve({ locations: locHierarchy }))
            .mockReturnValueOnce(Promise.resolve(allSettings));
        OpenSRPService.prototype.read = mockRead;
        mockRead.mockReturnValueOnce(Promise.resolve(locHierarchy));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );
        await act(async () => {
            await flushPromises();
            wrapper.update();
        });

        expect(mockList).toHaveBeenCalledTimes(2);
        expect(mockList.mock.calls[1]).toEqual([
            {
                identifier: 'population_characteristics',
                locationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
                resolve: true,
                serverVersion: 0,
            },
        ]);

        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings(allSettings, '02ebbc84-5e29-4cd5-9b79-c594058923e9'));
        wrapper.update();
        expect(wrapper.find('.title h4').text()).toEqual('Server Settings (Uganda)');
        expect(wrapper.find('ListView').props()).toMatchSnapshot();

        expect(wrapper.find('tbody tr').length).toEqual(2);

        // edit button works correctly
        const editButton = wrapper.find('.popup a').at(0);
        expect(editButton.text()).toEqual('Edit');
        expect(wrapper.find('.popup .show').length).toEqual(0);

        editButton.simulate('click');
        wrapper.update();
        expect(wrapper.find('.popup .show').length).toEqual(1);
        // Set to yes is not checked
        expect(
            wrapper
                .find('.show div')
                .at(0)
                .find('.check').length,
        ).toEqual(0);
        // Set to no is checked
        expect(
            wrapper
                .find('.show div')
                .at(1)
                .find('.check').length,
        ).toEqual(1);

        //click set to no nothing happens
        await act(async () => {
            wrapper
                .find('.show div')
                .at(1)
                .simulate('click');
            wrapper.update();
        });
        expect(
            wrapper
                .find('.show div')
                .at(0)
                .find('.check').length,
        ).toEqual(0);
        expect(
            wrapper
                .find('.show div')
                .at(1)
                .find('.check').length,
        ).toEqual(1);

        // click set to yes
        await act(async () => {
            wrapper
                .find('.show div')
                .at(0)
                .simulate('click');
            await flushPromises();
            wrapper.update();
        });
        expect(fetch).toHaveBeenCalledWith(
            `https://test-example.com/opensrp/rest/v2/settings/${setting1.settingMetadataId}`,
            {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                body: JSON.stringify({
                    _id: setting1.settingMetadataId,
                    description: setting1.description,
                    identifier: 'population_characteristics',
                    key: setting1.key,
                    label: setting1.label,
                    locationId: setting1.locationId,
                    uuid: setting1.uuid,
                    settingsId: setting1.documentId,
                    type: setting1.type,
                    value: 'true',
                    team: setting1.team,
                    teamId: setting1.teamId,
                    providerId: setting1.providerId,
                }),
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer hunter2',
                    'content-type': 'application/json;charset=UTF-8',
                },
                method: 'PUT',
            },
        );

        // Set to yes is now checked
        expect(
            wrapper
                .find('.show div')
                .at(0)
                .find('.check').length,
        ).toEqual(1);
        expect(
            wrapper
                .find('.show div')
                .at(1)
                .find('.check').length,
        ).toEqual(0);
    });

    it('location menu works correctly', async () => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([setting1, setting2], '02ebbc84-5e29-4cd5-9b79-c594058923e9'));
        store.dispatch(fetchLocSettings([setting2, setting3, setting4], '8340315f-48e4-4768-a1ce-414532b4c49b'));
        const mockList = jest.fn();
        const mockUpdate = jest.fn();
        const mockRead = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve({ locations: locHierarchy }))
            .mockReturnValueOnce(Promise.resolve([setting1, setting2]))
            .mockReturnValue(Promise.resolve([setting2, setting3, setting4]));
        OpenSRPService.prototype.read = mockRead;
        mockRead.mockReturnValueOnce(Promise.resolve(locHierarchy));
        OpenSRPService.prototype.update = mockUpdate;
        mockUpdate.mockReturnValueOnce(Promise.resolve({}));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );
        await act(async () => {
            await flushPromises();
            wrapper.update();
        });

        expect(wrapper.find('tbody tr').length).toEqual(2);
        expect(wrapper.find('.locations').length).toEqual(1);

        expect(
            wrapper
                .find('.locations span')
                .at(0)
                .text(),
        ).toEqual('Uganda');
        await act(async () => {
            wrapper.find('.locations').simulate('click');
        });
        wrapper.update();
        expect(wrapper.find('.popup .show').length).toEqual(1);
        expect(wrapper.find('.popup .show div').text()).toEqual('Kampala');
        // click child location
        await act(async () => {
            wrapper.find('.popup .show div').simulate('click');
        });
        wrapper.update();
        expect(wrapper.find('ListView').props()).toMatchSnapshot();
        expect(wrapper.find('.locations').length).toEqual(2);
        expect(
            wrapper
                .find('.locations')
                .at(0)
                .find('span')
                .at(0)
                .text(),
        ).toEqual('Uganda');
        expect(
            wrapper
                .find('.locations')
                .at(1)
                .find('span')
                .at(0)
                .text(),
        ).toEqual('Kampala');
        expect(wrapper.find('tbody tr').length).toEqual(3);

        // inhert setting works correctly
        const editButton = wrapper.find('.popup a').at(1);
        expect(editButton.text()).toEqual('Edit');
        expect(wrapper.find('.popup .show').length).toEqual(0);

        editButton.simulate('click');
        wrapper.update();
        expect(wrapper.find('.popup .show').length).toEqual(1);

        await act(async () => {
            wrapper
                .find('.show div')
                .at(2)
                .simulate('click');
            await flushPromises();
            wrapper.update();
        });
        expect(fetch).toHaveBeenCalledWith(
            `https://test-example.com/opensrp/rest/v2/settings/${setting2.settingMetadataId}`,
            {
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer hunter2',
                    'content-type': 'application/json;charset=UTF-8',
                },
                method: 'DELETE',
            },
        );

        // go back to previous location
        wrapper
            .find('.locations')
            .at(0)
            .simulate('click');
        wrapper.update();
        expect(wrapper.find('.locations').length).toEqual(1);

        // test search
        const search = wrapper.find('SearchForm input');
        await act(async () => {
            search.simulate('input', { target: { value: 'test search' } });
        });
        wrapper.update();
        expect(wrapper.find('tbody tr').length).toEqual(3);

        await act(async () => {
            search.simulate('input', { target: { value: '    ' } });
        });
        wrapper.update();
        expect(wrapper.find('tbody tr').length).toEqual(3);

        await act(async () => {
            search.simulate('input', { target: { value: 'Undernourished prevalence' } });
        });
        wrapper.update();
        await flushPromises();
        expect(wrapper.find('tbody tr').length).toEqual(1);
    });

    it('renders correctly when no data', async () => {
        store.dispatch(removeLocSettingAction());
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([], '75af7700-a6f2-448c-a17d-816261a7749a'));
        const mockList = jest.fn();
        const mockRead = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve({ locations: locHierarchy }))
            .mockReturnValueOnce(Promise.resolve([setting1, setting2]));
        OpenSRPService.prototype.read = mockRead;
        mockRead.mockReturnValueOnce(Promise.resolve(locHierarchy));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );
        await act(async () => {
            await flushPromises();
            wrapper.update();
        });
        expect(wrapper.find('.no-data').text()).toEqual('No data found');
    });
});
