import { FlexObject } from '../../helpers/utils';
import {
    BaseDux,
    fetchFactory,
    removeFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from './baseDux';

/** Interface for client object as received from clientServices */
export interface Client extends BaseDux {
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
export const fetchClients = fetchFactory<Client>(reducerName);
export const removeClients = removeFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// Selectors
export const getClientsById = getItemsByIdFactory<Client>(reducerName);
export const getClientsArray = getItemsArrayFactory<Client>(reducerName);
export const getClientById = getItemByIdFactory<Client>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
