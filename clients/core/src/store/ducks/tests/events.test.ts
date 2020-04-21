import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../../index';
import eventReducer, {
    fetchEvents,
    getEventsArray,
    getEventsById,
    reducerName as eventReducerName,
    removeEvents,
} from '../events';

import * as fixtures from './fixtures';

reducerRegistry.register(eventReducerName, eventReducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeEvents());
    });

    it('events selectors work for empty initialState', () => {
        expect(getEventsById(store.getState())).toEqual({});
        expect(getEventsArray(store.getState())).toEqual([]);
    });

    it('selectors work correctly on non-empty state', () => {
        // also how reducer handles actions on empty state.
        store.dispatch(fetchEvents(fixtures.events));
        expect(getEventsById(store.getState())).toEqual({
            [fixtures.event1.formSubmissionId]: fixtures.event1,
            [fixtures.event2.formSubmissionId]: fixtures.event2,
            [fixtures.event3.formSubmissionId]: fixtures.event3,
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
            'f5e0c01d-1d1a-4667-911e-ebc3ac075093': fixtures.event2,
            'f6e0c01d-1d1a-4462-ab56-a83eac075093': fixtures.event1,
        });
        store.dispatch(removeEvents());
        expect(getEventsArray(store.getState())).toEqual([]);
    });
});
