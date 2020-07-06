import reducerRegistry from '@onaio/redux-reducer-registry';
import {
    locationReducerName,
    locationsReducer,
    settingsReducer,
    settingsReducerName,
    fetchLocSettings,
    fetchLocs,
} from '@opensrp/population-characteristics';
import { OpenSRPService } from '@opensrp/server-service';
import { mount, shallow } from 'enzyme';
import flushPromises from 'flush-promises';
import { createBrowserHistory } from 'history';
import React from 'react';
import { act } from 'react-dom/test-utils';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import { EditServerSettings } from '..';
import store from '../../../../../store';
import { allSettings, locHierarchy } from './fixtures';

const history = createBrowserHistory();

/** register the reducers */
reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(locationReducerName, locationsReducer);

describe('containers/pages/ConfigForm/manifest/draftFiles', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        shallow(<EditServerSettings />);
    });

    it('renders table correctly', async () => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings(allSettings, '75af7700-a6f2-448c-a17d-816261a7749a'));
        store.dispatch(fetchLocSettings([allSettings[1]], '8400d475-3187-46e4-8980-7c6f0a243495'));
        const mockList = jest.fn();
        const mockUpdate = jest.fn();
        const mockRead = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve({ locations: locHierarchy }))
            .mockReturnValueOnce(Promise.resolve(allSettings));
        OpenSRPService.prototype.read = mockRead;
        mockRead.mockReturnValueOnce(Promise.resolve(locHierarchy));
        OpenSRPService.prototype.update = mockUpdate;
        mockUpdate.mockReturnValueOnce(Promise.resolve({}));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <EditServerSettings />
                </Router>
            </Provider>,
        );
        await act(async () => {
            await flushPromises();
            wrapper.update();
        });
        const helmet = Helmet.peek();
        expect(helmet.title).toEqual('Server Settings');
        // page header
        expect(wrapper.find('.title h4').text()).toEqual('Server Settings (ME)');
        // table rendered
        expect(wrapper.find('ListView').length).toEqual(1);
        expect(wrapper.find('ListView').props()).toMatchSnapshot();
        expect(wrapper.find('tbody tr').length).toEqual(allSettings.length);
        // search bar rendered
        expect(wrapper.find('SearchForm').length).toEqual(1);
        // location hierarchy rendered
        expect(wrapper.find('LocationMenu').length).toEqual(1);
    });
});
