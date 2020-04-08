/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
// import { Child } from '../../../../../store/ducks/child';
import { LOCATIONS_URL } from '../../../../../constants';
// Location specific configurable table columns
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useLocationTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: (): ReturnType<React.FC> => <></>,
                columns: [
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<any>): ReturnType<React.FC> => (
                            <Link to={`/${values.baseEntityId}`}>{LOCATIONS_URL}</Link>
                        ),
                        Header: 'Province',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Identifier',
                        accessor: 'firstName',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Tag',
                        accessor: 'lastName',
                        disableSortBy: true,
                    },

                    {
                        Header: 'Parent Location',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<any>): ReturnType<React.FC> => (
                            <Link to={`/${values.baseEntityId}`}>{LOCATIONS_URL}</Link>
                        ),
                        Header: 'Actions',
                        accessor: '',
                        disableSortBy: true,
                    },
                ],
                id: 'tableCrumb',
            },
        ],
        [],
    );
};
