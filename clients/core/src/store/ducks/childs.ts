import { get, keyBy, values } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Client } from './clients';

/** The reducer name */
export const reducerName = 'childs';

/** Interface for child object same as client */
export type Child = Client;

/** CHILDS_FETCHED action type */
export const CHILDS_FETCHED = 'opensrp/reducer/childs/CHILDS_FETCHED';
/** REMOVE_CHILDS action type */
export const REMOVE_CHILDS = 'opensrp/reducer/childs/REMOVE_CHILDS';
/** SET_TOTAL_RECORDS action type */
export const SET_TOTAL_RECORDS = 'opensrp/reducer/childs/SET_TOTAL_RECORDS';

/** interface for fetchChildsAction */
interface FetchChildsAction extends AnyAction {
    childsById: { [key: string]: Child };
    type: typeof CHILDS_FETCHED;
}

/** Interface for removeChildsAction */
interface RemoveChildsAction extends AnyAction {
    childsById: {};
    type: typeof REMOVE_CHILDS;
}

/** Interface for setTotalRecordsAction */
interface SetTotalRecordsAction extends AnyAction {
    totalRecords: number;
    type: typeof SET_TOTAL_RECORDS;
}

/** Create type for child reducer actions */
export type ChildActionTypes = FetchChildsAction | RemoveChildsAction | SetTotalRecordsAction | AnyAction;

// action creators
/** Fetch childs action creator
 * @param {Child []} ChildList - childs array to add to store
 * @return {FetchChildsAction} - an action to add childs to redux store
 */
export const fetchChilds = (childList: Child[] = []): FetchChildsAction => ({
    childsById: keyBy(childList, (child: Child) => child.baseEntityId),
    type: CHILDS_FETCHED,
});

/** setTotalRecords action */
export const setTotalRecords = (totalCount: number): SetTotalRecordsAction => ({
    totalRecords: totalCount,
    type: SET_TOTAL_RECORDS,
});

/** removeChilds action */
export const removeChildsAction: RemoveChildsAction = {
    childsById: {},
    type: REMOVE_CHILDS,
};

// actions
export const removeChilds = (): RemoveChildsAction => removeChildsAction;

/** interface for child state in redux store */
interface ChildState {
    childsById: { [key: string]: Child };
    totalRecords: number;
}

/** Create an immutable child state */
export type ImmutableChildState = ChildState & SeamlessImmutable.ImmutableObject<ChildState>;

/** initial child-state */
const initialState: ImmutableChildState = SeamlessImmutable({
    childsById: {},
    totalRecords: 0,
});

/** the child reducer function */
export default function reducer(
    state: ImmutableChildState = initialState,
    action: ChildActionTypes,
): ImmutableChildState {
    switch (action.type) {
        case CHILDS_FETCHED:
            return SeamlessImmutable({
                ...state,
                childsById: { ...state.childsById, ...action.childsById },
            });
        case REMOVE_CHILDS:
            return SeamlessImmutable({
                ...state,
                childsById: action.childsById,
            });
        case SET_TOTAL_RECORDS:
            return SeamlessImmutable({
                ...state,
                totalRecords: action.totalRecords,
            });
        default:
            return state;
    }
}

/** returns all child in the store as values whose keys are their respective ids
 * @param {Partial<Store>} state - the redux store
 * @return { { [key: string] : Child} } - child object as values, respective ids as keys
 */
export function getChildsById(state: Partial<Store>): { [key: string]: Child } {
    return (state as any)[reducerName].childsById;
}

/** gets child as an array of child objects
 * @param {Partial<Store>} state - the redux store
 * @return {Child[]} - an array of childs objs
 */
export function getChildArray(state: Partial<Store>): Child[] {
    return values(getChildsById(state));
}

/** get a specific child by their id
 * @param {Partial<Store>} state - the redux store
 * @return {Child | null} a child obj if the id is found else null
 */
export function getChildById(state: Partial<Store>, id: string): Child | null {
    return get(getChildsById(state), id) || null;
}

/** returns the count of all records present in server
 * @param {Partial<Store>} state - the redux store
 * @return { number } - total records value from the store
 */
export function getTotalRecords(state: Partial<Store>): number {
    return (state as any)[reducerName].totalRecords;
}
