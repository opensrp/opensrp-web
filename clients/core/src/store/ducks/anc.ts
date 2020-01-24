import {
    reducerFactory,
    BaseClient,
    fetchClientsFactory,
    removeClientsAction,
    getClientsArrayFactory,
    getClientByIdFactory,
    getClientsByIdFactory,
} from './base';
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
const ANCReducer = reducerFactory<ANCClientType>();

// action
/** actionCreator returns action to to add anc records to store */
const fetchANC = fetchClientsFactory<ANCClientType>();

// selectors
const getAllANCById = getClientsByIdFactory<ANCClientType>(reducerName);
const getANCById = getClientByIdFactory<ANCClientType>(reducerName);
const getAllANCArray = getClientsArrayFactory<ANCClientType>(reducerName);

export {
    reducerName,
    removeClientsAction as removeANCAction,
    ANCReducer,
    getAllANCArray,
    getANCById,
    getAllANCById,
    fetchANC,
};
