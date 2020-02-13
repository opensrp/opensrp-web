import { get, keyBy, values, Dictionary } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { FlexObject } from '../../../helpers/utils';
/** describes primary required properties for a object from opensrp
 * extend this to create generic types for objects.
 */
export interface BaseDux {
    type: 'Client';
    baseEntityId: string;
}

// actions

/** FETCHED action type */
export const FETCHED = 'opensrp/reducer/items/FETCHED';
/** REMOVE action type */
export const REMOVE = 'opensrp/reducer/items/REMOVE';
/** SET_TOTAL_RECORDS action type */
export const SET_TOTAL_RECORDS = 'opensrp/reducer/items/SET_TOTAL_RECORDS';

/** interface for authorize action
 *  generic type - item type being handled by this function
 */
export interface FetchAction<GenericType> extends AnyAction {
    itemsById: Dictionary<GenericType>;
    type: typeof FETCHED;
    reducerName: string;
}

/** Interface for removeAction */
interface RemoveAction extends AnyAction {
    itemsById: {};
    type: typeof REMOVE;
    reducerName: string;
}

/** Interface for setTotalRecordsAction */
interface SetTotalRecordsAction extends AnyAction {
    totalRecords: number;
    type: typeof SET_TOTAL_RECORDS;
    reducerName: string;
}

/** Create type for objects reducer actions */
export type ItemsActionTypes<GenericType> = FetchAction<GenericType> | RemoveAction | AnyAction;

// factory methods for action creators

/** creates the action creator
 * GenericType - generic type - object type being handled by this function
 * @param {string} reducerName - generic name of reducer
 * @returns {(itemsList: GenericType[] = []): FetchAction<GenericType>} - the action creator
 */
export function fetchFactory<GenericType extends BaseDux>(reducerName: string) {
    /** Fetch action creator
     * @param {item []} objectsList - objects array to add to store
     * @return {FetchAction} - an action to add objects to redux store
     */
    return (itemsList: GenericType[] = []): FetchAction<GenericType> => ({
        itemsById: keyBy<GenericType>(itemsList, (item: GenericType) => item.baseEntityId),
        type: FETCHED,
        reducerName,
    });
}

/** removeAction action ; action creator factory
 * @param {string} reducerName - name of reducer
 * @returns {(): RemoveAction} - the action creator
 */
export const removeFactory = (reducerName: string) => (): RemoveAction => ({
    itemsById: {},
    type: REMOVE,
    reducerName,
});

/** creates actions to set total records */
export function setTotalRecordsFactory(reducerName: string) {
    /** setTotalRecords action
     * @param {number} totalCount -  the number of records got form api
     */
    return (totalCount: number): SetTotalRecordsAction => ({
        totalRecords: totalCount,
        type: SET_TOTAL_RECORDS,
        reducerName,
    });
}

// The reducer

/** interface for object state in redux store
 * GenericType - generic type - objects type being handled by this function
 */
interface ObjectState<GenericType> {
    itemsById: { [key: string]: GenericType };
}

/** Create an immutable object state
 * GenericType - generic type - object type being handled by this function
 */
export type ImmutableObjectState<GenericType> = ObjectState<GenericType> &
    SeamlessImmutable.ImmutableObject<ObjectState<GenericType>>;

/** initial state */
const initialState = SeamlessImmutable({
    itemsById: {},
    totalRecords: 0,
});

/** factory function to create reducer
 * GenericType - generic type - object type being handled by this function
 */
export const reducerFactory = <GenericType>(reducerName: string) =>
    /** the items reducer function */
    function reducer(
        state: ImmutableObjectState<GenericType> = initialState,
        action: ItemsActionTypes<GenericType>,
    ): ImmutableObjectState<GenericType> {
        const actionReducerName = action.reducerName;
        if (reducerName !== actionReducerName) {
            return state;
        }
        switch (action.type) {
            case FETCHED:
                return SeamlessImmutable({
                    ...state,
                    itemsById: { ...state.itemsById, ...action.itemsById },
                });
            case REMOVE:
                return SeamlessImmutable({
                    ...state,
                    itemsById: action.itemsById,
                });
            case SET_TOTAL_RECORDS:
                return SeamlessImmutable({
                    ...state,
                    totalRecords: action.totalRecords,
                });
            default:
                return state;
        }
    };

// Selectors

/** factory function that creates selector
 * GenericType - generic type - object type being handled by this function
 *  @param {string} reducerName - the reducerName
 *  @returns {((state: Partial<Store>) => Dictionary<GenericType>)}
 */
export const getItemsByIdFactory = <GenericType>(
    reducerName: string,
): ((state: Partial<Store>) => Dictionary<GenericType>) => {
    /** returns all items in the store as values whose keys are their respective ids
     * @param {Partial<Store>} state - the redux store
     */
    return function(state: Partial<Store>): Dictionary<GenericType> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (state as any)[reducerName].itemsById;
    };
};

/** factory function that creates selector
 * GenericType - generic type - object type being handled by this function
 * @param {string} reducerName - name of the reducer
 * @returns {(state: Partial<Store>): GenericType[]}
 */
export const getItemsArrayFactory = <GenericType>(reducerName: string) =>
    /** gets an array of objects
     * @param {Partial<Store>} state - the redux store
     * @return {Item[]} - an array of objs
     */
    function(state: Partial<Store>): GenericType[] {
        const getItemsById = getItemsByIdFactory<GenericType>(reducerName);
        return values<GenericType>(getItemsById(state));
    };

/** factory function that creates selector
 * GenericType - generic type - object type being handled by this function
 * @param {string} - reducerName -  name of reducer
 * @returns {(state: Partial<Store>, id: string): GenericType | null}
 */
export const getItemByIdFactory = <GenericType>(reducerName: string) =>
    /** get a specific item by their id
     * @param {Partial<Store>} state - the redux store
     * @return {Item | null} a obj if the id is found else null
     */
    function(state: Partial<Store>, id: string): GenericType | null {
        return get(getItemsByIdFactory<GenericType>(reducerName)(state), id) || null;
    };

/** factory function that creates selector
 * GenericType - generic type - object type being handled by this function
 * @param {string} reducerName -  name of reducer
 * @returns {(state: Partial<Store<any, AnyAction>>) => number}
 */
export const getTotalRecordsFactory = (reducerName: string) =>
    /** returns the count of all records present in server
     * @param {Partial<Store>} state - the redux store
     * @return { number } - total records value from the store
     */
    function(state: Partial<Store>): number {
        return (state as FlexObject)[reducerName].totalRecords;
    };
