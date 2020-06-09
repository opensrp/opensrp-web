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

/** Interface for team member object */
export interface TeamMember {
    identifier: string;
    active: boolean;
    name: string;
    userId: string;
    username: string;
}

/** The reducer name */
export const reducerName = 'opensrp-web/admin/team-members';

/** TeamMember Reducer */
const reducer = reducerFactory<TeamMember>(reducerName);

// action creators
export const fetchTeamMembers = fetchActionCreatorFactory<TeamMember>(reducerName, 'identifier');
export const removeTeamMembers = removeActionCreatorFactory(reducerName);
export const setTotalRecords = setTotalRecordsFactory(reducerName);

// Selectors
export const getTeamMembersById = getItemsByIdFactory<TeamMember>(reducerName);
export const getTeamMembersArray = getItemsArrayFactory<TeamMember>(reducerName);
export const getTeamMemberById = getItemByIdFactory<TeamMember>(reducerName);
export const getTotalRecords = getTotalRecordsFactory(reducerName);

export default reducer;
