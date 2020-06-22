import React from 'react';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import ConnectedManifestReleases, { ManifestReleases } from '../index';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import reducer, { fetchManifestReleases, releasesReducerName } from '../../../ducks/manifestReleases';
import { fixManifestReleases } from '../../../ducks/tests.ts/fixtures';
import toJson from 'enzyme-to-json';

/** register the reducers */
reducerRegistry.register(releasesReducerName, reducer);

const history = createBrowserHistory();

const baseURL = 'https://test-example.com/rest';
const endpoint = 'manifest';
const props = {
    baseURL,
    currentUrl: '/releases',
    endpoint,
    formUploadUrl: '/upload',
    getPayload: getFetchOptions,
    LoadingComponent: <div>Loading</div>,
    uploadTypeUrl: 'file',
};

describe('components/ManifestReleases', () => {
    it('renders without crashing', () => {
        shallow(<ManifestReleases {...props} />);
    });

    it('renders without crashing when connected to store', async () => {
        store.dispatch(fetchManifestReleases(fixManifestReleases));
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

        expect(wrapper.find('.tbody .tr').length).toEqual(fixManifestReleases.length);
        const viewFiledCell = wrapper
            .find('.tbody .tr')
            .at(0)
            .find('.td')
            .at(3)
            .find('a');
        expect(toJson(viewFiledCell)).toMatchSnapshot();
        expect(viewFiledCell.text()).toEqual('View Files');
    });
});
