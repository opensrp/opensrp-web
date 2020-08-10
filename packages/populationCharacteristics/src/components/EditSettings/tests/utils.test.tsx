import reducerRegistry, { store } from '@onaio/redux-reducer-registry';
import { onEditSuccess } from '../utils';
import { setting1, setting2, setting3, setting4, locHierarchy } from './fixtures';
import locationReducer, { fetchLocs, locationReducerName } from '../../../ducks/locations';
import settingsReducer, { fetchLocSettings, settingsReducerName } from '../../../ducks/settings';

reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(locationReducerName, locationReducer);

describe('src/components/EditSettings/utils/onEditSuccess', () => {
    beforeAll(() => {
        store.dispatch(fetchLocs(locHierarchy));
        store.dispatch(fetchLocSettings([setting1, setting2], '02ebbc84-5e29-4cd5-9b79-c594058923e9'));
        store.dispatch(fetchLocSettings([setting2, setting3, setting4], '8340315f-48e4-4768-a1ce-414532b4c49b'));
    });
    it('updates store correctly for inherited setting', async () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting4, 'inherit', mockFetchSettings, setting4.locationId);
        expect(mockFetchSettings).toBeCalledWith(
            [{ ...setting4, inheritedFrom: '02ebbc84-5e29-4cd5-9b79-c594058923e9' }],
            setting4.locationId,
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
            [{ ...setting1, value: 'true', inheritedFrom: '' }],
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

    it('it does not update store if value is equal to the current value', () => {
        const mockFetchSettings = jest.fn();

        onEditSuccess(store.getState(), setting2, 'true', mockFetchSettings, setting2.locationId);
        expect(mockFetchSettings).not.toBeCalled();
    });
});
