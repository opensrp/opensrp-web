import {
    reducerFactory,
    BaseClient,
    fetchClientsFactory,
    removeClientsFactory,
    getClientsArrayFactory,
    getClientByIdFactory,
    getClientsByIdFactory,
} from './baseClient';
import { FlexObject } from '../../helpers/utils';

/** describes an ANC client object */
export interface ANCClientType extends BaseClient {
    type: 'Client';
    dateCreated: string;
    serverVersion: number;
    clientApplicationVersion: number;
    clientDatabaseVersion: number;
    baseEntityId: string;
    identifiers: { [key: string]: string | null };
    addresses: FlexObject[];
    attributes: FlexObject;
    firstName: string;
    lastName: string;
    birthdate: string;
    middleName?: string;
    birthdateApprox: boolean;
    deathdateApprox: boolean;
    gender?: string;
    relationships: {
        [key: string]: string[];
    };
    id: string;
    revision: string;
}

/** reducer name for the ANC module */
const reducerName = 'ANC';

/** ANC Reducer */
const reducer = reducerFactory<ANCClientType>(reducerName);

// action
/** actionCreator returns action to to add anc records to store */
const fetchANC = fetchClientsFactory<ANCClientType>(reducerName);

// selectors
const getAllANCById = getClientsByIdFactory<ANCClientType>(reducerName);
const getANCById = getClientByIdFactory<ANCClientType>(reducerName);
const getAllANCArray = getClientsArrayFactory<ANCClientType>(reducerName);
const removeANCAction = removeClientsFactory(reducerName);

export { reducerName, removeANCAction, reducer, getAllANCArray, getANCById, getAllANCById, fetchANC };
