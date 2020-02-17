import { FlexObject } from '../../helpers/utils';
import {
    BaseClient,
    reducerFactory,
    getClientsByIdFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
    fetchClientsFactory,
    removeClientsFactory,
    setTotalRecordsFactory,
    getTotalRecordsFactory,
} from './baseClients';

/** Interface for client object as received from clientServices */
export interface Client extends BaseClient {
    dateCreated: number;
    serverVersion: number;
    clientApplicationVersion: number;
    clientDatabaseVersion: number;
    identifiers: { [key: string]: string | null };
    addresses: FlexObject[];
    attributes: FlexObject;
    firstName: string;
    lastName: string;
    birthdate: number;
    middleName?: string;
    birthdateApprox: boolean;
    deathdateApprox: boolean;
    gender?: string;
    relationships: {
        [key: string]: string[];
    };
    _id: string;
    _rev: string;
}

/** The reducer name */
export const reducerName = 'opensrp-web/client-type/clients';

/** Client Reducer */
const reducer = reducerFactory<Client>(reducerName);

// action creators
export const fetchClients = fetchClientsFactory<Client>(reducerName);
export const removeClients = removeClientsFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// Selectors
export const getClientsById = getClientsByIdFactory<Client>(reducerName);
export const getClientsArray = getClientsArrayFactory<Client>(reducerName);
export const getClientById = getClientByIdFactory<Client>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
