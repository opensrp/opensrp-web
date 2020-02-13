import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../../index';
import eventReducer, {
    fetchEvents,
    getEventsArray,
    getEventsById,
    reducerName as eventReducerName,
    removeEventsAction,
} from '../events';

import * as fixtures from './fixtures';

reducerRegistry.register(eventReducerName, eventReducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeEventsAction());
    });

    it('events selectors work for empty initialState', () => {
        expect(getEventsById(store.getState())).toEqual({});
        expect(getEventsArray(store.getState())).toEqual([]);
    });

    it('selectors work correctly on non-empty state', () => {
        // also how reducer handles actions on empty state.
        store.dispatch(fetchEvents(fixtures.events));
        expect(getEventsById(store.getState())).toEqual({
            [fixtures.event1.baseEntityId]: fixtures.event1,
            [fixtures.event2.baseEntityId]: fixtures.event2,
            [fixtures.event3.baseEntityId]: fixtures.event3,
        });
        expect(getEventsArray(store.getState())).toEqual(fixtures.events);
    });

    it('reducer handles unknown types graciously', () => {
        const initialState = store.getState();
        store.dispatch({
            ...fetchEvents(fixtures.events),
            type: 'UnknownType',
        });
        expect(store.getState()).toEqual(initialState);
    });

    it('fetch events works correctly on non-empty state', () => {
        store.dispatch(fetchEvents([fixtures.event1]));
        expect(getEventsArray(store.getState()).length).toEqual(1);
        store.dispatch(fetchEvents([fixtures.event2]));
        expect(getEventsArray(store.getState()).length).toEqual(2);
    });

    it('remove events action works', () => {
        store.dispatch(fetchEvents([fixtures.event1, fixtures.event2]));
        expect(getEventsById(store.getState())).toEqual({
            '5e8b72c5-0b36-9d7d-829f-279d1482c96a': fixtures.event2,
            '6e8b72c5-0b36-4e46-829f-8ujd1482c96a': fixtures.event1,
        });
        store.dispatch(removeEventsAction());
        expect(getEventsArray(store.getState())).toEqual([]);
    });
});
