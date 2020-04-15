/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { VIEW } from '../../../../constants';
import { UseTableCellProps } from 'react-table';
import { Client } from '../../../../store/ducks/clients';
// Child specific configurable table columns
export const useMemberTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: () => <></>,
                columns: [
                    {
                        Header: 'First Name',
                        accessor: 'firstName',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Last Name',
                        accessor: 'lastName',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Age',
                        accessor: 'attributes.dynamicProperties.age_year_part',
                    },

                    {
                        Header: 'Register Status',
                        accessor: 'attributes.dynamicProperties.registration_status',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Client>): ReturnType<React.FC> => (
                            <>
                                <Link to={`#`}>{VIEW}</Link>{' '}
                                <Link className="remove-action" to={`#`}>
                                    Remove
                                </Link>
                            </>
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
