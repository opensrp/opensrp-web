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
