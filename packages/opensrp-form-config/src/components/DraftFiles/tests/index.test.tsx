import React from 'react';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import ConnectedManifestDraftFiles, { ManifestDraftFiles } from '../index';
import { getFetchOptions, OpenSRPService } from '@opensrp/server-service';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import flushPromises from 'flush-promises';
import reducer, { fetchManifestDraftFiles, draftReducerName } from '../../../ducks/manifestDraftFiles';
import { FixManifestDraftFiles, downloadFile } from '../../../ducks/tests.ts/fixtures';
import toJson from 'enzyme-to-json';
import * as helpers from '../../../helpers/fileDownload';
import _ from 'lodash';

/** register the reducers */
reducerRegistry.register(draftReducerName, reducer);

const history = createBrowserHistory();

const baseURL = 'https://test-example.com/rest/';
const endpoint = 'metadata';
const props = {
    baseURL,
    endpoint,
    downloadEndPoint: 'formDownload',
    fileUploadUrl: '/manifest',
    getPayload: getFetchOptions,
    LoadingComponent: <div>Loading</div>,
    manifestEndPoint: 'manifest',
    releasesUrl: '/manifest/releases',
};

const actualDebounce = _.debounce;
const customDebounce = (callback: any) => callback;
_.debounce = customDebounce;

(global as any).URL.createObjectURL = jest.fn();
(global as any).URL.revokeObjectURL = jest.fn();

describe('components/ManifestReleases', () => {
    afterAll(() => {
        _.debounce = actualDebounce;
    });

    it('renders without crashing', () => {
        shallow(<ManifestDraftFiles {...props} />);
    });

    it('renders without crashing when connected to store', async () => {
        downloadFile.clientForm.json = JSON.stringify(downloadFile.clientForm.json);
        const downloadSpy = jest.spyOn(helpers, 'handleDownload');
        store.dispatch(fetchManifestDraftFiles(FixManifestDraftFiles));
        const mockList = jest.fn();
        OpenSRPService.prototype.list = mockList;
        mockList
            .mockReturnValueOnce(Promise.resolve(FixManifestDraftFiles))
            .mockReturnValueOnce(Promise.resolve(downloadFile));

        const wrapper = mount(
            <Provider store={store}>
                <Router history={history}>
                    <ConnectedManifestDraftFiles {...props} />
                </Router>
            </Provider>,
        );

        await flushPromises();
        wrapper.update();
        expect(wrapper.find('DrillDownTable').props()).toMatchSnapshot();
        expect(wrapper.find('SearchBar').length).toEqual(1);

        expect(wrapper.find('.tbody .tr').length).toEqual(2);
        const downloadFiledCell = wrapper
            .find('.tbody .tr')
            .at(0)
            .find('.td')
            .at(4)
            .find('a');
        expect(toJson(downloadFiledCell)).toMatchSnapshot();

        downloadFiledCell.simulate('click');
        await flushPromises();
        expect(downloadSpy).toHaveBeenCalledWith(downloadFile.clientForm.json, 'reveal-test-file.json');

        // search
        const search = wrapper.find('SearchBar input');
        search.simulate('input', { target: { value: 'test form' } });
        wrapper.update();
        expect(wrapper.find('.tbody .tr').length).toEqual(1);

        // test creating manifest file
        wrapper.find('Button').simulate('click');
        const postData = {
            body:
                '{"json":"{\\"forms_version\\":\\"1.0.27\\",\\"identifiers\\":[\\"reveal-test-file.json\\",\\"test-form-1.json\\"]}"}',
            headers: { Authorization: 'Bearer hunter2', 'Content-Type': 'application/json' },
            method: 'POST',
        };
        expect((global as any).fetch).toHaveBeenCalledWith('https://test-example.com/rest/manifest', postData);
    });
});