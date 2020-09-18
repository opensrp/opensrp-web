import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import { FlushThunks } from 'redux-testkit';
import reducer, { settingsReducerName, getLocSettings, fetchLocSettings, removeLocSettingAction } from '..';
import { allSettings } from './fixtures';

reducerRegistry.register(settingsReducerName, reducer);
const locId = '75af7700-a6f2-448c-a17d-816261a7749a';

describe('reducers/settings', () => {
    beforeEach(() => {
        FlushThunks.createMiddleware();
        jest.resetAllMocks();
    });

    it('should have initial state', () => {
        expect(getLocSettings(store.getState(), locId)).toEqual([]);
    });

    it('should fetch settings', () => {
        // dispatch locations
        store.dispatch(fetchLocSettings(allSettings, locId));
        // get location settings
        expect(getLocSettings(store.getState(), locId)).toEqual(allSettings);
    });

    it('should update single setting', () => {
        // Fetch settings
        store.dispatch(fetchLocSettings(allSettings, locId));
        expect(getLocSettings(store.getState(), locId)).toEqual(allSettings);

        // Update setting
        const updatedSetting = { ...allSettings[0], editing: true, value: 'true' };
        store.dispatch(fetchLocSettings([updatedSetting], locId));
        // Setting should now be updated in store
        expect(getLocSettings(store.getState(), locId)).toEqual([
            updatedSetting,
            ...allSettings.slice(0, 0),
            ...allSettings.slice(0 + 1, allSettings.length),
        ]);
    });

    it('replaces the settings for the location correctly', () => {
        // Fetch settings
        store.dispatch(fetchLocSettings(allSettings, locId));
        expect(getLocSettings(store.getState(), locId)).toEqual(allSettings);
        // Now replace settings
        store.dispatch(fetchLocSettings([allSettings[0]], locId, true));
        expect(getLocSettings(store.getState(), locId)).toEqual([allSettings[0]]);
    });

    it('should clear settings', () => {
        // Fetch settings
        store.dispatch(fetchLocSettings(allSettings, locId));
        expect(getLocSettings(store.getState(), locId)).toEqual(allSettings);
        // Now clear settings
        store.dispatch(removeLocSettingAction());
        expect(getLocSettings(store.getState(), locId)).toEqual([]);
    });
});
