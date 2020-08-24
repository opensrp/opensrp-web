import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { keyBy } from 'lodash';
import { Dictionary } from '@onaio/utils';

/** reducer name */
export const settingsReducerName = 'populationCharacteristics';

/** SETTING_FETCHED action type */
export const LOC_SETTINGS_FETCHED = 'settings/location/SETTINGS_FETCHED';
/** REMOVE_SETTING action_type */
export const REMOVE_LOC_SETTINGS = 'settings/location/REMOVE_SETTINGS';

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

export type SettingStorage = Dictionary<Setting | {}>;

/** FetchLocSettingsAction interface for LOC_SETTINGS_FETCHED */
export interface FetchLocSettingsAction extends AnyAction {
    settingsByLocId: { [key: string]: SettingStorage };
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
    settingsByLocId: { [key: string]: SettingStorage } | {};
}

/** immutable location settings state */
export type ImmutableLocSettingState = LocSettingState & SeamlessImmutable.ImmutableObject<LocSettingState>;

/** initial location settings state */
const initialState: ImmutableLocSettingState = SeamlessImmutable({
    settingsByLocId: {},
});

/** Create type for Settings reducer actions */
export type LocSettingsTypes = FetchLocSettingsAction | RemoveLocSettingsAction | AnyAction;

/** the Settings reducer function */
export default function reducer(state = initialState, action: LocSettingsTypes): ImmutableLocSettingState {
    switch (action.type) {
        case LOC_SETTINGS_FETCHED:
            const locId: string = action.locId;
            return SeamlessImmutable({
                ...state,
                settingsByLocId: {
                    ...state.settingsByLocId,
                    [locId]: action.replace
                        ? { ...action.settingsByLocId[locId] }
                        : { ...(state.settingsByLocId as any)[locId], ...action.settingsByLocId[locId] },
                },
            });
        case REMOVE_LOC_SETTINGS:
            return SeamlessImmutable({
                ...state,
                settingsByLocId: action.settingsByLocId,
            });
        default:
            return state;
    }
}

/** removeLocSettingAction */
export const removeLocSettingAction = () => ({
    settingsByLocId: {},
    type: REMOVE_LOC_SETTINGS,
});

/** fetchLocSettings */
export const fetchLocSettings = (settings: Setting[] = [], locId: string, replace = false): FetchLocSettingsAction => ({
    settingsByLocId: {
        [locId]: keyBy(
            settings.map((set: Setting) => {
                set['editing'] = set['editing'] ? set['editing'] : false;
                return set;
            }),
            setting => setting.settingMetadataId,
        ),
    },
    type: LOC_SETTINGS_FETCHED,
    locId,
    replace,
});

/** getLocSettings - get get location settings
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {[Setting]} array of Setting
 */
export function getLocSettings(state: Partial<Store>, locId: string): Setting[] | [] {
    const allLocSettings = (state as any)[settingsReducerName].settingsByLocId[locId];
    if (!allLocSettings) return [];
    return Object.keys(allLocSettings).map((key: string) => allLocSettings[key]) as [Setting];
}
