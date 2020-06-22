import React from 'react';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import ConnectedManifestFilesList, { ManifestFilesList } from '../index';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import reducer, { fetchManifestFiles, filesReducerName } from '../../../ducks/manifestFiles';
import { fixManifestFiles } from '../../../ducks/tests.ts/fixtures';

/** register the reducers */
reducerRegistry.register(filesReducerName, reducer);

const history = createBrowserHistory();

const baseURL = 'https://test-example.com/rest';
const props = {
    baseURL,
    downloadEndPoint: 'form-download',
    endpoint: 'form/related',
    fileUploadUrl: 'manifest',
    formVersion: '123',
    getPayload: getFetchOptions,
    isJsonValidator: true,
    LoadingComponent: <div></div>,
    uploadTypeUrl: 'manifest-file',
};

describe('components/manifestFiles', () => {
    it('renders without crashing', () => {
        shallow(<ManifestFilesList {...props} />);
    });

    it('renders without crashing when connected to store', async () => {
        store.dispatch(fetchManifestFiles(fixManifestFiles));
        const mockList = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList.mockReturnValueOnce(Promise.resolve(fixManifestFiles));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedManifestFilesList {...props} />
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

        // to figure out why table is not being loaded
        // expect(wrapper.find('.tbody .tr').length).toEqual(fixManifestFiles.length);
    });
});
