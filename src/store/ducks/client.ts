import { AnyAction } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { Client } from './clients';

/** The reducer name */
export const reducerName = 'client';

/** Create type for client reducer actions */
export type ClientActionTypes = AnyAction;

// The reducer

/** interface for client state in redux store */
interface ClientState {
  client: Client;
}

/** Create an immutable client state */
export type ImmutableClientsState = ClientState & SeamlessImmutable.ImmutableObject<ClientState>;

/** the client reducer function */
export default function reducer(
  state: ImmutableClientsState,
  action: ClientsActionTypes
): ImmutableClientsState {
  switch (action.type) {
    default:
      return state;
  }
}
