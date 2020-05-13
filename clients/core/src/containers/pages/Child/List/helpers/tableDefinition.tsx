/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
import { Child } from '../../../../../store/ducks/child';
import { CHILD_PROFILE_URL, VIEW } from '../../../../../constants';
// Child specific configurable table columns
export const useChildTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: () => <></>,
                columns: [
                    { Header: 'Identifier', accessor: 'baseEntityId', disableSortBy: true },
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
                        Header: 'Location',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Age',
                        accessor: 'attributes.dynamicProperties.age_year_part',
                    },
                    {
                        Header: 'Gender',
                        accessor: 'gender',
                    },
                    {
                        Header: 'Last Contact Date',
                        accessor: 'attributes.dynamicProperties.last_contact_date',
                    },

                    {
                        Header: 'Risk',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Immunization status',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Child>): ReturnType<React.FC> => (
                            <Link to={`${CHILD_PROFILE_URL}/${values.baseEntityId}`}>{VIEW}</Link>
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
