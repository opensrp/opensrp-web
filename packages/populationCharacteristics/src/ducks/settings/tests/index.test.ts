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
        const updatedSetting = { ...allSettings[0], editing: true };
        updatedSetting.value = false;
        allSettings[0] = updatedSetting;
        store.dispatch(fetchLocSettings([updatedSetting], locId));
        expect(getLocSettings(store.getState(), locId)).toEqual(allSettings);
    });

    it('should clear settings', () => {
        // dispatch locations
        store.dispatch(fetchLocSettings(allSettings, locId));
        store.dispatch(removeLocSettingAction());
        // get location settings
        expect(getLocSettings(store.getState(), locId)).toEqual([]);
    });
});
