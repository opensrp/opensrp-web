import { SETTINGS_INHERIT } from '../../constants';
import { Setting, fetchLocSettings, getLocSettings } from '../../ducks/settings';
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
    if (value !== SETTINGS_INHERIT) {
        // We set the new value and make sure to override inheritedFrom
        // to none
        fetchSettings([{ ...row, editing: false, value, inheritedFrom: '' }], activeLocationId);
    } else {
        // Get the parent of active location and get the parent setting matching
        // the setting we are editing and inherit its value
        const locationDetails = getLocDetails(state, activeLocationId);
        const parentId = locationDetails.node.parentLocation?.locationId;

        if (parentId) {
            const parentSettings = getLocSettings(state, parentId);

            if (parentSettings.length) {
                let inheritedValue = row.value;
                let settingFound = false;
                let i = 0;

                while (!settingFound && i < parentSettings.length) {
                    const currentSetting = parentSettings[i];

                    if (currentSetting.key === row.key) {
                        inheritedValue = currentSetting.value;
                        settingFound = true;
                    }

                    i += 1;
                }

                if (settingFound) {
                    fetchSettings(
                        [{ ...row, editing: false, value: inheritedValue, inheritedFrom: parentId }],
                        activeLocationId,
                    );
                }
            }
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
    if ((value === SETTINGS_INHERIT && row.inheritedFrom) || (value === row.value && !row.inheritedFrom)) {
        return;
    }

    const endPoint =
        value === SETTINGS_INHERIT || activeLocationId === row.locationId
            ? `${settingsEndpoint}${row.settingMetadataId}`
            : settingsEndpoint;

    if (value === SETTINGS_INHERIT) {
        const clientService = new OpenSRPService(v2BaseUrl, endPoint, getPayload);

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
            const clientService = new OpenSRPService(v2BaseUrl, endPoint, getPayload);
            await clientService
                .create(data)
                .then(() => {
                    onEditSuccess(state, row, value, fetchSettings, activeLocationId);
                })
                .catch(error => {
                    customAlert && customAlert(String(error), { type: 'error' });
                });
        } else {
            const clientService = new OpenSRPService(v2BaseUrl, endPoint, getPayload);
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

/**
 * Checks if the inherited from value is a valid location in the location hierarchy
 * @param state - redux store
 * @param inheritedFrom - the location id the setting inherits from
 */
export const isInheritedFromValid = (state: Partial<Store>, inheritedFrom: string) => {
    const label = getLocDetails(state, inheritedFrom).label;

    if (!label) {
        return false;
    }

    return true;
};

/**
 * Returns the label to display when provided with the inherited from location id
 * @param state - redux store
 * @param inheritedFrom - the location id the setting inherits from
 */

export const getInheritedFromLabel = (state: Partial<Store>, inheritedFrom: string | undefined): string => {
    if (inheritedFrom) {
        const label = getLocDetails(state, inheritedFrom).label;

        if (label) {
            inheritedFrom = label;
        }
    } else {
        inheritedFrom = '_';
    }

    return inheritedFrom;
};
