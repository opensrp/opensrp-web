import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
import { Team } from '../../../../../store/ducks/teams';
import { TEAM_PROFILE_URL, TEAM_FORM_URL } from '../../../../../constants';

// Client specific configurable table columns
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTeamTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: '',
                columns: [
                    { Header: 'Identifier', accessor: 'identifier', disableSortBy: true },
                    {
                        Header: 'Name',
                        accessor: 'name',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Members',
                        accessor: 'memberCount',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Team>): ReturnType<React.FC> => (
                            <p>{values.active ? 'active' : 'deactive'}</p>
                        ),
                        Header: 'Status',
                        accessor: 'active',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Team>): ReturnType<React.FC> => (
                            <>
                                <Link to={`${TEAM_PROFILE_URL}/${values.identifier}`}>View</Link>{' '}
                                <Link className="edit-action" to={`${TEAM_FORM_URL}/${values.identifier}`}>
                                    Edit
                                </Link>
                            </>
                        ),
                        Header: 'Actions',
                        accessor: 'id',
                        disableSortBy: true,
                    },
                ],
                id: 'teamtableCrumb',
            },
        ],
        [],
    );
};
