import { SETTINGS_INHERIT } from '../../constants';
import { Setting, fetchLocSettings } from 'populationCharacteristics/src/ducks/settings';
import { SettingValue } from '../../helpers/types';
import { getLocDetails } from '../../ducks/locations';
import { Store } from 'redux';
import { OpenSRPService } from '@opensrp/server-service';
import { getFetchOptions } from '@opensrp/server-service';
import { ToastOptions } from 'react-toastify';
import { preparePutData } from '../..//helpers/utils';

/**
 * Update redux store after a successful response from the API
 * if a setting is edited
 * @param row - the setting object
 * @param value - the selected value for the setting
 * @param state - the redux store
 * @param fetchSettings - the redux action
 * @param activeLocationId - the active location id
 */
export const onEditSuccess = (
    state: Partial<Store>,
    row: Setting,
    value: SettingValue,
    fetchSettings: typeof fetchLocSettings,
    activeLocationId: string,
) => {
    if (row.value === value) {
        return;
    }

    if (value !== SETTINGS_INHERIT) {
        // We set the new value and make sure to override inheritedFrom
        // to none
        fetchSettings([{ ...row, value, inheritedFrom: '' }], activeLocationId);
    } else {
        // Get the parent of this location
        const locationDetails = getLocDetails(state, row.locationId);
        const parentId = locationDetails.node.parentLocation?.locationId;

        if (parentId) {
            fetchSettings([{ ...row, inheritedFrom: parentId }], activeLocationId);
        }
    }
};

/**
 * Update setting by calling the OpenSRP endpoint and updating the store if the update is
 * a success
 * @param state - redux store
 * @param row - the setting object
 * @param value - the new value
 * @param v2BaseUrl - OpenSRP base URL
 * @param settingsEndpoint - the endpoint
 * @param getPayload - options that are to be added to openSRPService fetch request
 * @param fetchSettings - redux action
 * @param activeLocationId - active location id
 * @param customAlert - a custom toast alert
 */
export const editSetting = async (
    state: Partial<Store>,
    row: Setting,
    value: SettingValue,
    v2BaseUrl: string,
    settingsEndpoint: string,
    getPayload: typeof getFetchOptions,
    fetchSettings: typeof fetchLocSettings,
    activeLocationId: string,
    customAlert?: (message: string, options: ToastOptions) => void,
) => {
    if (value === row.value) {
        return false;
    }

    if (value === SETTINGS_INHERIT) {
        const deleteUrl = `${settingsEndpoint}${row.settingMetadataId}`;
        const clientService = new OpenSRPService(v2BaseUrl, deleteUrl, getPayload);

        await clientService
            .delete()
            .then(() => {
                onEditSuccess(state, row, value, fetchSettings, activeLocationId);
            })
            .catch(error => {
                customAlert && customAlert(String(error), { type: 'error' });
            });
    } else {
        const data = preparePutData(row, value);

        if (activeLocationId !== row.locationId) {
            data.locationId = activeLocationId;
            delete data.uuid;
            delete data._id;
            const clientService = new OpenSRPService(v2BaseUrl, settingsEndpoint, getPayload);
            await clientService
                .create(data)
                .then(() => {
                    onEditSuccess(state, row, value, fetchSettings, activeLocationId);
                })
                .catch(error => {
                    customAlert && customAlert(String(error), { type: 'error' });
                });
        } else {
            const putUrl = `${settingsEndpoint}${row.settingMetadataId}`;
            const clientService = new OpenSRPService(v2BaseUrl, putUrl, getPayload);
            await clientService
                .update(data)
                .then(() => {
                    onEditSuccess(state, row, value, fetchSettings, activeLocationId);
                })
                .catch(error => {
                    customAlert && customAlert(String(error), { type: 'error' });
                });
        }
    }
};
