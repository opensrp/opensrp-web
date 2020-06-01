import { FlexObject } from '../../helpers/utils';
import {
    fetchActionCreatorFactory,
    removeActionCreatorFactory,
    setTotalRecordsFactory,
    reducerFactory,
    getItemsByIdFactory,
    getItemsArrayFactory,
    getItemByIdFactory,
    getTotalRecordsFactory,
} from './baseDux';

/** Interface for team object as received from teamServices */
export interface Team {
    id: number;
    identifier: string;
    active: boolean;
    name: string;
    type: {
        [key: string]: FlexObject[];
    };
}

/** The reducer name */
export const reducerName = 'opensrp-web/admin/teams';

/** Team Reducer */
const reducer = reducerFactory<Team>(reducerName);

// action creators
export const fetchTeams = fetchActionCreatorFactory<Team>(reducerName, 'id');
export const removeTeams = removeActionCreatorFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// Selectors
export const getTeamsById = getItemsByIdFactory<Team>(reducerName);
export const getTeamsArray = getItemsArrayFactory<Team>(reducerName);
export const getTeamById = getItemByIdFactory<Team>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
