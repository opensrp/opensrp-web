import React from 'react';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import _ from 'lodash';
import { EditSetings, ConnectedEditSetings } from '..';
import settingsReducer, {
    reducerName as settingsReducerName,
    fetchLocSettings,
    removeLocSettingAction,
} from '../../ducks/settings';
import locationReducer, { fetchLocs, reducerName as LocsReducerName } from '../../ducks/locations';
import { locHierarchy } from '../../ducks/locations/tests/fixtures';
import { allSettings } from '../../ducks/settings/tests/fixtures';
import { updateDate } from './fixtures';

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
    settingsEndpoint: 'settings',
};

describe('components/Editsettings', () => {
    afterAll(() => {
        _.debounce = actualDebounce;
    });

    it('renders without crashing', () => {
        shallow(<EditSetings {...props} />);
    });

    it('renders correctly when connected to store', async () => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings(allSettings, '75af7700-a6f2-448c-a17d-816261a7749a'));
        const mockList = jest.fn();
        const mockUpdate = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve(allSettings));
        OpenSRPService.prototype.update = mockUpdate;
        mockUpdate.mockReturnValueOnce(Promise.resolve({}));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );

        await flushPromises();
        wrapper.update();
        expect(wrapper.find('.title h4').text()).toEqual('Server Settings (ME)');
        expect(wrapper.find('ListView').props()).toMatchSnapshot();

        expect(wrapper.find('tbody tr').length).toEqual(2);

        // edit button works correctly
        const editButton = wrapper.find('.popup a').at(0);
        expect(editButton.text()).toEqual('Edit');
        expect(wrapper.find('.popup .show').length).toEqual(0);
        editButton.simulate('click');
        wrapper.update();
        expect(wrapper.find('.popup .show').length).toEqual(1);
        // false is checked
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
        wrapper
            .find('.show div')
            .at(0)
            .simulate('click');
        await flushPromises();
        wrapper.update();
        expect(mockUpdate).toHaveBeenCalledWith(updateDate);
        // true is now checked
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
        store.dispatch(fetchLocSettings(allSettings, '75af7700-a6f2-448c-a17d-816261a7749a'));
        store.dispatch(fetchLocSettings([allSettings[1]], '8400d475-3187-46e4-8980-7c6f0a243495'));
        const mockList = jest.fn();
        const mockUpdate = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve(allSettings));
        OpenSRPService.prototype.update = mockUpdate;
        mockUpdate.mockReturnValueOnce(Promise.resolve({}));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );

        await flushPromises();
        wrapper.update();

        expect(wrapper.find('tbody tr').length).toEqual(2);
        expect(wrapper.find('.locations').length).toEqual(1);

        expect(
            wrapper
                .find('.locations span')
                .at(0)
                .text(),
        ).toEqual('ME');
        wrapper.find('.locations').simulate('click');
        wrapper.update();
        expect(wrapper.find('.popup .show').length).toEqual(1);
        expect(wrapper.find('.popup .show div').text()).toEqual('Lobi');
        // click child location
        wrapper.find('.popup .show div').simulate('click');
        wrapper.update();
        expect(wrapper.find('.locations').length).toEqual(2);
        expect(
            wrapper
                .find('.locations')
                .at(0)
                .find('span')
                .at(0)
                .text(),
        ).toEqual('ME');
        expect(
            wrapper
                .find('.locations')
                .at(1)
                .find('span')
                .at(0)
                .text(),
        ).toEqual('Lobi');
        expect(wrapper.find('tbody tr').length).toEqual(1);
        // go back to previous location
        wrapper
            .find('.locations')
            .at(0)
            .simulate('click');
        wrapper.update();
        expect(wrapper.find('.locations').length).toEqual(1);

        // test search
        const search = wrapper.find('SearchForm input');
        search.simulate('input', { target: { value: 'test search' } });
        wrapper.update();
        expect(wrapper.find('tbody tr').length).toEqual(0);
        search.simulate('input', { target: { value: 'Undernourished prevalence' } });
        wrapper.update();
        expect(wrapper.find('tbody tr').length).toEqual(1);
    });

    it('renders correctly when no data', async () => {
        store.dispatch(removeLocSettingAction());
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([], '75af7700-a6f2-448c-a17d-816261a7749a'));
        const mockList = jest.fn();
        const mockUpdate = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve(locHierarchy))
            .mockReturnValueOnce(Promise.resolve([]));
        OpenSRPService.prototype.update = mockUpdate;
        mockUpdate.mockReturnValueOnce(Promise.resolve({}));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedEditSetings {...props} />
                </Router>
            </Provider>,
        );
        expect(wrapper.find('.no-data').text()).toEqual('No data found');
    });
});
