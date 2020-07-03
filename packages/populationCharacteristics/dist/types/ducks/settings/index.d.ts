import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Dictionary } from '@onaio/utils';
/** reducer name */
export declare const settingsReducerName = "populationCharacteristics";
/** SETTING_FETCHED action type */
export declare const LOC_SETTINGS_FETCHED = "settings/location/SETTINGS_FETCHED";
/** REMOVE_SETTING action_type */
export declare const REMOVE_LOC_SETTINGS = "settings/location/REMOVE_SETTINGS";
/** interface for settings */
export interface Setting {
    editing?: boolean;
    key: string;
    value: boolean | string;
    label: string;
    description: string;
    inheritedFrom: string;
    uuid: string;
    settingsId: string;
    settingIdentifier: string;
    settingMetadataId: string;
    locationId: string;
    providerId?: string;
    v1Settings: boolean;
    resolveSettings: boolean;
    documentId: string;
    serverVersion: number;
    team?: string;
    teamId?: string;
    type: string;
}
export declare type SettingStorage = Dictionary<Setting | {}>;
/** FetchLocSettingsAction interface for LOC_SETTINGS_FETCHED */
export interface FetchLocSettingsAction extends AnyAction {
    settingsByLocId: {
        [key: string]: SettingStorage;
    };
    type: typeof LOC_SETTINGS_FETCHED;
    locId: string;
}
/** removeLocSettingsAction interface for REMOVE_LOC_SETTINGS */
interface RemoveLocSettingsAction extends AnyAction {
    type: typeof REMOVE_LOC_SETTINGS;
    settingsByLocId: {};
}
/** interface for settings state */
export interface LocSettingState {
    settingsByLocId: {
        [key: string]: SettingStorage;
    } | {};
}
/** immutable location settings state */
export declare type ImmutableLocSettingState = LocSettingState & SeamlessImmutable.ImmutableObject<LocSettingState>;
/** Create type for Settings reducer actions */
export declare type LocSettingsTypes = FetchLocSettingsAction | RemoveLocSettingsAction | AnyAction;
/** the Settings reducer function */
export default function reducer(state: ImmutableLocSettingState | undefined, action: LocSettingsTypes): ImmutableLocSettingState;
/** removeLocSettingAction */
export declare const removeLocSettingAction: () => {
    settingsByLocId: {};
    type: string;
};
/** fetchLocSettings */
export declare const fetchLocSettings: (settings: Setting[] | undefined, locId: string) => FetchLocSettingsAction;
/** getLocSettings - get get location settings
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {[Setting]} array of Setting
 */
export declare function getLocSettings(state: Partial<Store>, locId: string): Setting[] | [];
export {};
