import { get, keyBy, values, Dictionary } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';

/** describes primary required properties for a client object from opensrp
 * extend this to create generic types for clients.
 */
export interface BaseClient {
    type: 'Client';
    baseEntityId: string;
}

// actions

/** CLIENTS_FETCHED action type */
export const CLIENTS_FETCHED = 'opensrp/reducer/clients/CLIENTS_FETCHED';
/** REMOVE_CLIENTS action type */
export const REMOVE_CLIENTS = 'opensrp/reducer/clients/REMOVE_CLIENTS';

/** interface for authorize action
 * ClientType - generic type - client type being handled by this function
 */
export interface FetchClientsAction<ClientType> extends AnyAction {
    clientsById: Dictionary<ClientType>;
    type: typeof CLIENTS_FETCHED;
}

/** Interface for removeClientsAction */
interface RemoveClientsAction extends AnyAction {
    clientsById: {};
    type: typeof REMOVE_CLIENTS;
}

/** Create type for clients reducer actions */
export type ClientsActionTypes<ClientType> = FetchClientsAction<ClientType> | RemoveClientsAction | AnyAction;

// factory methods for action creators

/** creates the action creator
 * ClientType - generic type - client type being handled by this function
 */
export function fetchClientsFactory<ClientType extends BaseClient>() {
    /** Fetch clients action creator
     * @param {Client []} clientsList - clients array to add to store
     * @return {FetchClientsAction} - an action to add clients to redux store
     */
    return (clientsList: ClientType[] = []): FetchClientsAction<ClientType> => ({
        clientsById: keyBy<ClientType>(clientsList, (client: ClientType) => client.baseEntityId),
        type: CLIENTS_FETCHED,
    });
}

// actions

/** removeClientsAction action */
export const removeClientsAction: RemoveClientsAction = {
    clientsById: {},
    type: REMOVE_CLIENTS,
};

// The reducer

/** interface for clients state in redux store
 * ClientType - generic type - client type being handled by this function
 */
interface ClientState<ClientType> {
    clientsById: { [key: string]: ClientType };
}

/** Create an immutable clients state
 * ClientType - generic type - client type being handled by this function
 */
export type ImmutableClientsState<ClientType> = ClientState<ClientType> &
    SeamlessImmutable.ImmutableObject<ClientState<ClientType>>;

/** initial clients-state state */
const initialState = SeamlessImmutable({
    clientsById: {},
});

/** factory function to create reducer
 * ClientType - generic type - client type being handled by this function
 */
export const reducerFactory = <ClientType>() =>
    /** the clients reducer function */
    function reducer(
        state: ImmutableClientsState<ClientType> = initialState,
        action: ClientsActionTypes<ClientType>,
    ): ImmutableClientsState<ClientType> {
        switch (action.type) {
            case CLIENTS_FETCHED:
                return SeamlessImmutable({
                    ...state,
                    clientsById: { ...state.clientsById, ...action.clientsById },
                });
            case REMOVE_CLIENTS:
                return SeamlessImmutable({
                    ...state,
                    clientsById: action.clientsById,
                });
            default:
                return state;
        }
    };

// Selectors

/** factory function that creates selector
 * ClientType - generic type - client type being handled by this function
 */
export const getClientsByIdFactory = <ClientType>(
    reducerName: string,
): ((state: Partial<Store>) => Dictionary<ClientType>) => {
    /** returns all clients in the store as values whose keys are their respective ids
     * @param {Partial<Store>} state - the redux store
     */
    return function(state: Partial<Store>): Dictionary<ClientType> {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (state as any)[reducerName].clientsById;
    };
};

/** factory function that creates selector
 * ClientType - generic type - client type being handled by this function
 */
export const getClientsArrayFactory = <ClientType>(reducerName: string) =>
    /** gets clients as an array of clients objects
     * @param {Partial<Store>} state - the redux store
     * @return {Client[]} - an array of clients objs
     */
    function(state: Partial<Store>): ClientType[] {
        const getClientsById = getClientsByIdFactory<ClientType>(reducerName);
        return values<ClientType>(getClientsById(state));
    };

/** factory function that creates selector
 * ClientType - generic type - client type being handled by this function
 */
export const getClientByIdFactory = <ClientType>(reducerName: string) =>
    /** get a specific client by their id
     * @param {Partial<Store>} state - the redux store
     * @return {Client | null} a client obj if the id is found else null
     */
    function(state: Partial<Store>, id: string): ClientType | null {
        return get(getClientsByIdFactory<ClientType>(reducerName)(state), id) || null;
    };
