import { AnyAction, Store } from 'redux';
import { keyBy, values } from 'lodash';
import { Client } from './clients';
import SeamlessImmutable from 'seamless-immutable';

/** The reducer name */
export const reducerName = 'members';

/** MEMBERS_FETCHED action type */
export const MEMBERS_FETCHED = 'opensrp/reducer/client/MEMBERS_FETCHED';

/** interface for fetch members */
export interface FetchMembersAction extends AnyAction {
    membersById: { [key: string]: Client };
    type: typeof MEMBERS_FETCHED;
}

/** Fetch members action creator
 * @param {Event} members - members to add to store
 * @return {FetchMembersAction} - an action to add members to redux store
 */
export const fetchMembers = (membersList: Client[]): FetchMembersAction => ({
    membersById: keyBy(membersList, (member: Client) => member.baseEntityId),
    type: MEMBERS_FETCHED,
});

/** Create type for client reducer actions */
export type MemberActionTypes = FetchMembersAction | AnyAction;


interface ClientState {
    membersById: { [key: string]: Client };
}

/** Create an immutable client state */
export type ImmutableMemberState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** initial clients-state state */
const initialState: ImmutableMemberState = SeamlessImmutable({
  membersById: {},
});

/** the client reducer function */
export default function reducer(
    state: ImmutableMemberState = initialState,
    action: MemberActionTypes
  ): ImmutableMemberState {
    switch (action.type) {
      case MEMBERS_FETCHED:
        return SeamlessImmutable({
          ...state,
          membersById: action.membersById,
        });
      default:
        return state;
    }
  }

// Selectors

/** returns the members of the client in the store by their ids
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - client objects as values, respective ids as keys
 */
export function getMembersById(state: Partial<Store>): { [key: string]: Client } {
    return (state as any)[reducerName].membersById;
}

/** returns the members of the client as array
 * @param {Partial<Store>} state - the redux store
 * @return { Client } - members array
 */
export function getMembersArray(state: Partial<Store>): Client[] {
    return values((state as any)[reducerName].membersById);
}
  