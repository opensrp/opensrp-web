import React, { useMemo } from 'react';
import { UseTableCellProps } from 'react-table';
import { Team } from '../../../../../store/ducks/teams';

// Client specific configurable table columns
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useTeamMemberTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: '',
                columns: [
                    { Header: 'Username', accessor: 'username', disableSortBy: true },
                    {
                        Header: 'Name',
                        accessor: 'name',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Team>): ReturnType<React.FC> => (
                            <p>{values.active ? 'active' : 'deactive'}</p>
                        ),
                        Header: 'Active',
                        accessor: 'active',
                        disableSortBy: true,
                    },
                ],
                id: 'teamMembertableCrumb',
            },
        ],
        [],
    );
};
