import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { keyBy } from 'lodash';

/** reducer name */
export const reducerName = 'populationCharacteristics';

/** SETTING_FETCHED action type */
export const LOC_SETTINGS_FETCHED = 'settings/location/SETTINGS_FETCHED';
/** REMOVE_SETTING action_type */
export const REMOVE_LOC_SETTINGS = 'settings/location/REMOVE_SETTINGS';

/** interface for settings */
export interface Setting {
    description: string;
    label: string;
    value: boolean;
    key: string;
    type: string;
    identifier: string;
    team_Id: string;
    team: string;
    provider_id: string;
    locationId: string;
}

export interface SettingStorage {
    [key: string]: Setting;
}

/** FetchLocSettingsAction interface for LOC_SETTINGS_FETCHED */
export interface FetchLocSettingsAction extends AnyAction {
    settingsByLocId: { [key: string]: SettingStorage };
    type: typeof LOC_SETTINGS_FETCHED;
}

/** removeLocSettingsAction interface for REMOVE_LOC_SETTINGS */
interface RemoveLocSettingsAction extends AnyAction {
    type: typeof REMOVE_LOC_SETTINGS;
    settingsByLocId: {};
}

/** interface for settings state */
export interface LocSettingState {
    settingsByLocId: { [key: string]: SettingStorage };
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
export default function reducer(
    state = initialState,
    action: LocSettingsTypes,
    locId: string,
): ImmutableLocSettingState {
    switch (action.type) {
        case LOC_SETTINGS_FETCHED:
            return SeamlessImmutable({
                ...state,
                settingsByLocId: {
                    ...state.settingsByLocId,
                    [locId]: { ...state.settingsByLocId[locId], ...action.settingsByLocId[locId] },
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
export const removeLocSettingAction: RemoveLocSettingsAction = {
    settingsByLocId: {},
    type: REMOVE_LOC_SETTINGS,
};

/** fetchLocSettings */
export const fetchLocSettings = (settings: Setting[] = [], locId: string): FetchLocSettingsAction => ({
    settingsByLocId: {
        [locId]: keyBy(
            settings.map((set: Setting) => set),
            setting => setting.identifier,
        ),
    },
    type: LOC_SETTINGS_FETCHED,
});

/** getLocSettings - get get location settings
 * @param {Partial<Store>} state - the redux store
 * @param {locId} string - the location id
 * @returns {[Setting]} array of Setting
 */
export function getLocSettings(state: Partial<Store>, locId: string): [Setting] {
    const allLocSettings = (state as any)[reducerName].settingsByLocId[locId];
    return Object.keys(allLocSettings).map((key: string) => allLocSettings[key]) as [Setting];
}
