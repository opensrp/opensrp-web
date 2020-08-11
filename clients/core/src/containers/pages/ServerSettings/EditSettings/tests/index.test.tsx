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
import toJson from 'enzyme-to-json';

jest.mock('../../../../../configs/env');

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

    it('renders table correctly', () => {
        /* eslint-disable-next-line @typescript-eslint/no-var-requires */
        const envModule = require('../../../../../configs/env');
        envModule.OPENSRP_API_BASE_URL = 'https://anc-stage.smartregister.org/opensrp/rest/';
        envModule.OPENSRP_API_V2_BASE_URL = 'https://anc-stage.smartregister.org/opensrp/rest/v2/';

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <EditServerSettings />
                </Router>
            </Provider>,
        );

        const helmet = Helmet.peek();
        expect(helmet.title).toEqual('Server Settings');
        expect(wrapper.find('Connect(EditSetings)').props()).toMatchSnapshot();
    });
});
