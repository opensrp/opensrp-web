import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../../index';
import reducer, {
    getChildArray,
    getChildListById,
    reducerName as childReducerName,
    removeChildList,
    fetchChildList,
    setTotalRecords,
    getTotalRecords,
    getChildById,
} from '../child';
import * as fixtures from '../tests/fixtures';
import { values } from 'lodash';
reducerRegistry.register(childReducerName, reducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeChildList());
    });

    it('selectors work for empty initialState', () => {
        expect(getChildListById(store.getState())).toEqual({});
        expect(getChildArray(store.getState())).toEqual([]);
    });

    it('fetches child-list correctly', () => {
        store.dispatch(fetchChildList([fixtures.child1, fixtures.child2]));
        expect(getChildListById(store.getState())).toEqual({
            '906fc91h-4cce-412a-8327-ca2315ekoeo9': fixtures.child1,
            '406fc91h-4cce-412a-8327-ca2315ekoeo9': fixtures.child2,
        });
        expect(getChildArray(store.getState())).toEqual(values([fixtures.child1, fixtures.child2]));
        expect(getChildById(store.getState(), '406fc91h-4cce-412a-8327-ca2315ekoeo9')).toEqual(fixtures.child2);
    });

    it('Adds new child-list to store instead of overwriting existing ones', () => {
        store.dispatch(fetchChildList([fixtures.child1, fixtures.child2]));
        let numberOfChild = getChildArray(store.getState()).length;
        expect(numberOfChild).toEqual(2);

        store.dispatch(fetchChildList([fixtures.child3]));
        numberOfChild = getChildArray(store.getState()).length;
        expect(numberOfChild).toEqual(3);
    });

    it('removes child-list', () => {
        store.dispatch(fetchChildList(fixtures.childList));
        let numberOfChild = getChildArray(store.getState()).length;
        expect(numberOfChild).toEqual(3);

        store.dispatch(removeChildList());
        numberOfChild = getChildArray(store.getState()).length;
        expect(numberOfChild).toEqual(0);
    });

    it('sets total records', () => {
        store.dispatch(setTotalRecords(3));
        let numberOfRecords = getTotalRecords(store.getState());
        expect(numberOfRecords).toEqual(3);

        store.dispatch(setTotalRecords(0));
        numberOfRecords = getTotalRecords(store.getState());
        expect(numberOfRecords).toEqual(0);
    });
});
