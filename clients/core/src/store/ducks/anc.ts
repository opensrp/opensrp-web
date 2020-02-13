import {
    fetchFactory,
    removeFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
    BaseDux,
} from './baseDux';
import { FlexObject } from '../../helpers/utils';

/** describes an ANC client object */
export interface ANCClientType extends BaseDux {
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
export const reducerName = 'opensrp-web/client-type/ANC';

/** ANC Reducer */
const reducer = reducerFactory<ANCClientType>(reducerName);

// action
/** actionCreator returns action to to add anc records to store */
export const fetchANC = fetchFactory<ANCClientType>(reducerName);
export const removeANCAction = removeFactory(reducerName);
export const setTotalANCRecords = setTotalRecordsFactory(reducerName);

// selectors
export const getAllANCById = getItemsByIdFactory<ANCClientType>(reducerName);
export const getANCById = getItemByIdFactory<ANCClientType>(reducerName);
export const getAllANCArray = getItemsArrayFactory<ANCClientType>(reducerName);
export const getTotalANCRecords = getTotalRecordsFactory(reducerName);

export default reducer;
