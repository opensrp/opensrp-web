import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import { onEditSuccess, editSetting, isInheritedFromValid, getInheritedFromLabel } from '../utils';
import { setting1, setting2, setting3, setting4, locHierarchy, setting5, setting6 } from './fixtures';
import locationReducer, { fetchLocs, locationReducerName } from '../../../ducks/locations';
import settingsReducer, { fetchLocSettings, settingsReducerName, Setting } from '../../../ducks/settings';
import { getFetchOptions } from '@opensrp/server-service';
import flushPromises from 'flush-promises';
import { SettingValue } from '../../../helpers/types';

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(locationReducerName, locationReducer);

/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');

describe('src/components/EditSettings/utils/onEditSuccess', () => {
    beforeAll(() => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([setting1, setting2, setting5], '02ebbc84-5e29-4cd5-9b79-c594058923e9'));
        store.dispatch(
            fetchLocSettings([setting2, setting3, setting4, setting6], '8340315f-48e4-4768-a1ce-414532b4c49b'),
        );
    });
    it('updates store correctly if value is `inherit` and setting does not exist in parent ', () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting4, 'inherit', mockFetchSettings, setting4.locationId);
        expect(mockFetchSettings).not.toBeCalled();
    });

    it('updates store correctly if value is `inherit` and setting exists in parent', () => {
        const mockFetchSettings = jest.fn();
        // Should inherit
        onEditSuccess(store.getState(), setting6, 'inherit', mockFetchSettings, setting6.locationId);
        expect(mockFetchSettings).toBeCalledWith(
            [{ ...setting6, editing: false, value: setting5.value, inheritedFrom: setting5.locationId }],
            setting6.locationId,
        );
    });

    it('does not update store if setting is inherited and parent location does not exist', () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting1, 'inherit', mockFetchSettings, setting1.locationId);
        expect(mockFetchSettings).not.toBeCalled();
    });

    it('updates store correctly if setting is true', () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting1, 'true', mockFetchSettings, setting1.locationId);
        expect(mockFetchSettings).toBeCalledWith(
            [{ ...setting1, editing: false, value: 'true', inheritedFrom: '' }],
            setting1.locationId,
        );
    });

    it('updates store correctly if setting is false', () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting2, 'false', mockFetchSettings, setting2.locationId);
        expect(mockFetchSettings).toBeCalledWith(
            [{ ...setting2, value: 'false', inheritedFrom: '' }],
            setting2.locationId,
        );
    });
});

describe('src/components/EditSettings/utils/editSetting', () => {
    beforeAll(() => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([setting1, setting2], '02ebbc84-5e29-4cd5-9b79-c594058923e9'));
        store.dispatch(fetchLocSettings([setting2, setting3, setting4], '8340315f-48e4-4768-a1ce-414532b4c49b'));
    });

    beforeEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
    });

    const settingsEndpoint = 'settings/';
    const v2BaseUrl = 'https://test-example.com/opensrp/rest/v2/';

    it('does not update setting if value is equal to current value and setting is not inherited', () => {
        const mockFetchSettings = jest.fn();

        editSetting(
            store.getState(),
            setting2,
            setting2.value as SettingValue,
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            setting2.locationId,
        );
        expect(fetch).not.toBeCalled();
    });

    it('does not update setting if value is `inherit` and setting is already inherited', () => {
        const mockFetchSettings = jest.fn();
        editSetting(
            store.getState(),
            setting4,
            'inherit',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            setting4.locationId,
        );
        expect(fetch).not.toHaveBeenCalled();
    });

    it('updates setting if value is `inherit` and setting is not inherited', () => {
        const mockFetchSettings = jest.fn();
        editSetting(
            store.getState(),
            setting2,
            'inherit',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            setting2.locationId,
        );
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
    });

    it('creates setting if active location id is not equal to setting location id', () => {
        const mockFetchSettings = jest.fn();
        const activeLocationId = setting1.locationId;
        editSetting(
            store.getState(),
            setting4,
            'false',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            activeLocationId,
        );
        expect(fetch).toHaveBeenCalledWith('https://test-example.com/opensrp/rest/v2/settings/', {
            'Cache-Control': 'no-cache',
            Pragma: 'no-cache',
            body: JSON.stringify({
                description: setting4.description,
                identifier: 'population_characteristics',
                key: setting4.key,
                label: setting4.label,
                locationId: activeLocationId,
                settingsId: setting4.documentId,
                type: setting4.type,
                value: 'false',
                team: setting4.team,
                teamId: setting4.teamId,
                providerId: setting4.providerId,
            }),
            headers: {
                accept: 'application/json',
                authorization: 'Bearer hunter2',
                'content-type': 'application/json;charset=UTF-8',
            },
            method: 'POST',
        });
    });

    it('updates correctly if active location id is equal to setting location id', () => {
        const mockFetchSettings = jest.fn();
        const activeLocationId = setting4.locationId;
        editSetting(
            store.getState(),
            setting4,
            'false',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            activeLocationId,
        );
        expect(fetch).toHaveBeenCalledWith(
            `https://test-example.com/opensrp/rest/v2/settings/${setting4.settingMetadataId}`,
            {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                body: JSON.stringify({
                    _id: setting4.settingMetadataId,
                    description: setting4.description,
                    identifier: 'population_characteristics',
                    key: setting4.key,
                    label: setting4.label,
                    locationId: setting4.locationId,
                    uuid: setting4.uuid,
                    settingsId: setting4.documentId,
                    type: setting1.type,
                    value: 'false',
                    team: setting4.team,
                    teamId: setting4.teamId,
                    providerId: setting4.providerId,
                }),
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer hunter2',
                    'content-type': 'application/json;charset=UTF-8',
                },
                method: 'PUT',
            },
        );
    });

    it('updates setting if value is equal to current value and setting is inherited', () => {
        const mockFetchSettings = jest.fn();

        editSetting(
            store.getState(),
            setting4,
            setting4.value as SettingValue,
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            setting4.locationId,
        );
        // Setting will have the same value as before but cease to inherit
        expect(fetch).toHaveBeenCalledWith(
            `https://test-example.com/opensrp/rest/v2/settings/${setting4.settingMetadataId}`,
            {
                'Cache-Control': 'no-cache',
                Pragma: 'no-cache',
                body: JSON.stringify({
                    _id: setting4.settingMetadataId,
                    description: setting4.description,
                    identifier: 'population_characteristics',
                    key: setting4.key,
                    label: setting4.label,
                    locationId: setting4.locationId,
                    uuid: setting4.uuid,
                    settingsId: setting4.documentId,
                    type: setting1.type,
                    value: setting4.value,
                    team: setting4.team,
                    teamId: setting4.teamId,
                    providerId: setting4.providerId,
                }),
                headers: {
                    accept: 'application/json',
                    authorization: 'Bearer hunter2',
                    'content-type': 'application/json;charset=UTF-8',
                },
                method: 'PUT',
            },
        );
    });

    it('displays custom alert if updating inherited setting fails', async () => {
        fetch.mockReject('API is down');
        const mockFetchSettings = jest.fn();
        const customAlertMock = jest.fn();
        editSetting(
            store.getState(),
            setting2,
            'inherit',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            setting2.locationId,
            customAlertMock,
        );
        await flushPromises();
        expect(customAlertMock).toHaveBeenCalledWith('API is down', { type: 'error' });
    });

    it('displays custom alert if active location id is not equal to setting location id fails', async () => {
        fetch.mockReject('API is down');
        const mockFetchSettings = jest.fn();
        const customAlertMock = jest.fn();
        const activeLocationId = setting1.locationId;
        editSetting(
            store.getState(),
            setting4,
            'false',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            activeLocationId,
            customAlertMock,
        );
        await flushPromises();
        expect(customAlertMock).toHaveBeenCalledWith('API is down', { type: 'error' });
    });

    it('displays custom alert if active location id is equal to setting location id fails', async () => {
        fetch.mockReject('API is down');
        const mockFetchSettings = jest.fn();
        const customAlertMock = jest.fn();
        const activeLocationId = setting4.locationId;
        editSetting(
            store.getState(),
            setting4,
            'false',
            v2BaseUrl,
            settingsEndpoint,
            getFetchOptions,
            mockFetchSettings,
            activeLocationId,
            customAlertMock,
        );
        await flushPromises();
        expect(customAlertMock).toHaveBeenCalledWith('API is down', { type: 'error' });
    });
});

describe('src/components/EditSettings/utils/isInheritedFromValid', () => {
    beforeAll(() => {
        store.dispatch(fetchLocs(locHierarchy));
    });

    it('should return true if value is a valid location id', () => {
        expect(isInheritedFromValid(store.getState(), '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40')).toEqual(true);
    });

    it('should return false if value is NOT a valid location id', () => {
        expect(isInheritedFromValid(store.getState(), '9188e6d-2ffb-4b25-85f9-b9fbf5010d40')).toEqual(false);
    });
});

describe('src/components/EditSettings/utils/getInheritedFromLabel', () => {
    beforeAll(() => {
        store.dispatch(fetchLocs(locHierarchy));
    });

    it('returns correct label if value is undefine', () => {
        expect(getInheritedFromLabel(store.getState(), undefined)).toEqual('_');
    });

    it('returns correct label if location id is valid', () => {
        expect(getInheritedFromLabel(store.getState(), '4e188e6d-2ffb-4b25-85f9-b9fbf5010d40')).toEqual(
            'Central Division',
        );
    });

    it('returns the value if value if not a valid location id', () => {
        expect(getInheritedFromLabel(store.getState(), '9188e6d-2ffb-4b25-85f9-b9fbf5010d40')).toEqual(
            '9188e6d-2ffb-4b25-85f9-b9fbf5010d40',
        );
    });
});
