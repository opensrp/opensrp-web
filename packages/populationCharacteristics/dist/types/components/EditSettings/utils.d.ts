import { Setting } from 'populationCharacteristics/src/ducks/settings';
import { SettingValue } from '../../helpers/types';
import { Store } from 'redux';
import { getFetchOptions } from '@opensrp/server-service';
import { ToastOptions } from 'react-toastify';
/**
 * Update redux store after a successful response from the API
 * if a setting is edited
 * @param row - the setting object
 * @param value - the selected value for the setting
 * @param state - the redux store
 * @param fetchSettings - the redux action
 * @param activeLocationId - the active location id
 */
export declare const onEditSuccess: (state: Partial<Store<any, import("redux").AnyAction>>, row: Setting, value: SettingValue, fetchSettings: (settings: Setting[] | undefined, locId: string, replace?: boolean) => import("../../ducks/settings").FetchLocSettingsAction, activeLocationId: string) => void;
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
export declare const editSetting: (state: Partial<Store<any, import("redux").AnyAction>>, row: Setting, value: SettingValue, v2BaseUrl: string, settingsEndpoint: string, getPayload: typeof getFetchOptions, fetchSettings: (settings: Setting[] | undefined, locId: string, replace?: boolean) => import("../../ducks/settings").FetchLocSettingsAction, activeLocationId: string, customAlert?: ((message: string, options: ToastOptions) => void) | undefined) => Promise<false | void>;
