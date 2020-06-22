import React from 'react';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import ConnectedManifestReleases, { ManifestReleases } from '../index';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import reducer, { releasesReducerName } from '../../../ducks/manifestReleases';
import { fixManifestReleases } from '../../../ducks/tests.ts/fixtures';

/** register the reducers */
reducerRegistry.register(releasesReducerName, reducer);

const history = createBrowserHistory();

const baseURL = 'https://test-example.com/rest';
const currentUrl = '/releases';
const props = {
    baseURL,
    currentUrl,
    endpoint: 'manifest',
    formUploadUrl: '/upload',
    getPayload: getFetchOptions,
    LoadingComponent: <div>Loading</div>,
    uploadTypeUrl: 'file',
};

describe('components/ClientUpload', () => {
    it('renders without crashing', () => {
        shallow(<ManifestReleases {...props} />);
    });

    it('renders without crashing when connected to store', async () => {
        const mockList = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList.mockReturnValueOnce(Promise.resolve(fixManifestReleases));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedManifestReleases {...props} />
                </Router>
            </Provider>,
        );

        await flushPromises();
        wrapper.update();
        expect(wrapper.find('DrillDownTable').props()).toMatchSnapshot();
        expect(wrapper.find('SearchBar').length).toEqual(1);
        expect(
            wrapper
                .find('Row Col')
                .at(1)
                .text(),
        ).toEqual('Upload New File');
    });
});
