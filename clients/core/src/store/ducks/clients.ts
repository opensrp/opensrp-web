import { FlexObject } from '../../helpers/utils';
import {
    fetchActionCreatorFactory,
    removeFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from './baseDux';

/** Interface for client object as received from clientServices */
export interface Client {
    type: 'Client';
    baseEntityId: string;
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
export const fetchClients = fetchActionCreatorFactory<Client>(reducerName, 'baseEntityId');
export const removeClients = removeFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// Selectors
export const getClientsById = getItemsByIdFactory<Client>(reducerName);
export const getClientsArray = getItemsArrayFactory<Client>(reducerName);
export const getClientById = getItemByIdFactory<Client>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
