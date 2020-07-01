/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
// import { Child } from '../../../../../store/ducks/child';
import { LOCATIONS_URL, VIEW } from '../../../../../constants';
import { Location } from '../../../../../store/ducks/adminLocation';
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
                        Cell: ({ row: { values } }: UseTableCellProps<Location>): ReturnType<React.FC> => (
                            <Link to={`/${LOCATIONS_URL}/${values.id}`}>{values['properties.name']}</Link>
                        ),
                        Header: 'Location',
                        accessor: 'properties.name',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Identifier',
                        accessor: 'id',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Tag',
                        accessor: 'properties.tagName',
                        disableSortBy: true,
                    },

                    {
                        Header: 'Parent Location',
                        accessor: 'properties.parentName',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Location>): ReturnType<React.FC> => (
                            <Link to={`/${values.baseEntityId}`}>{VIEW}</Link>
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
