import { get, keyBy, values, Dictionary } from 'lodash';
import { AnyAction, Store } from 'redux';
import SeamlessImmutable from 'seamless-immutable';
import { FlexObject } from '../../../helpers/utils';
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
/** SET_TOTAL_RECORDS action type */
export const SET_TOTAL_RECORDS = 'opensrp/reducer/clients/SET_TOTAL_RECORDS';

/** interface for authorize action
 * ClientType - generic type - client type being handled by this function
 */
export interface FetchClientsAction<ClientType> extends AnyAction {
    clientsById: Dictionary<ClientType>;
    type: typeof CLIENTS_FETCHED;
    reducerName: string;
}

/** Interface for removeClientsAction */
interface RemoveClientsAction extends AnyAction {
    clientsById: {};
    type: typeof REMOVE_CLIENTS;
    reducerName: string;
}

/** Interface for setTotalRecordsAction */
interface SetTotalRecordsAction extends AnyAction {
    totalRecords: number;
    type: typeof SET_TOTAL_RECORDS;
    reducerName: string;
}

/** Create type for clients reducer actions */
export type ClientsActionTypes<ClientType> = FetchClientsAction<ClientType> | RemoveClientsAction | AnyAction;

// factory methods for action creators

/** creates the action creator
 * ClientType - generic type - client type being handled by this function
 * @param {string} reducerName - generic name of reducer
 * @returns {(clientsList: ClientType[] = []): FetchClientsAction<ClientType>} - the action creator
 */
export function fetchClientsFactory<ClientType extends BaseClient>(reducerName: string) {
    /** Fetch clients action creator
     * @param {Client []} clientsList - clients array to add to store
     * @return {FetchClientsAction} - an action to add clients to redux store
     */
    return (clientsList: ClientType[] = []): FetchClientsAction<ClientType> => ({
        clientsById: keyBy<ClientType>(clientsList, (client: ClientType) => client.baseEntityId),
        type: CLIENTS_FETCHED,
        reducerName,
    });
}

/** removeClientsAction action ; action creator factory
 * @param {string} reducerName - name of reducer
 * @returns {(): RemoveClientsAction} - the action creator
 */
export const removeClientsFactory = (reducerName: string) => (): RemoveClientsAction => ({
    clientsById: {},
    type: REMOVE_CLIENTS,
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
    totalRecords: 0,
});

/** factory function to create reducer
 * ClientType - generic type - client type being handled by this function
 */
export const reducerFactory = <ClientType>(reducerName: string) =>
    /** the clients reducer function */
    function reducer(
        state: ImmutableClientsState<ClientType> = initialState,
        action: ClientsActionTypes<ClientType>,
    ): ImmutableClientsState<ClientType> {
        const actionReducerName = action.reducerName;
        if (reducerName !== actionReducerName) {
            return state;
        }
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
 * ClientType - generic type - client type being handled by this function
 *  @param {string} reducerName - the reducerName
 *  @returns {((state: Partial<Store>) => Dictionary<ClientType>)}
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
 * @param {string} reducerName - name of the reducer
 * @returns {(state: Partial<Store>): ClientType[]}
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
 * @param {string} - reducerName -  name of reducer
 * @returns {(state: Partial<Store>, id: string): ClientType | null}
 */
export const getClientByIdFactory = <ClientType>(reducerName: string) =>
    /** get a specific client by their id
     * @param {Partial<Store>} state - the redux store
     * @return {Client | null} a client obj if the id is found else null
     */
    function(state: Partial<Store>, id: string): ClientType | null {
        return get(getClientsByIdFactory<ClientType>(reducerName)(state), id) || null;
    };

/** factory function that creates selector
 * ClientType - generic type - client type being handled by this function
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