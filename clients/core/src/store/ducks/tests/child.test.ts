import reducerRegistry from '@onaio/redux-reducer-registry';
import store from '../../index';
import reducer, { getChildArray, getChildsById, reducerName as childReducerName, removeChildsAction } from '../childs';

reducerRegistry.register(childReducerName, reducer);

describe('reducers/clients', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        store.dispatch(removeChildsAction);
    });

    it('selectors work for empty initialState', () => {
        expect(getChildsById(store.getState())).toEqual({});
        expect(getChildArray(store.getState())).toEqual([]);
    });
});
