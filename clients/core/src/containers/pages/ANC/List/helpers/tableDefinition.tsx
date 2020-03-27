/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
import { ANCClientType } from '../../../../../store/ducks/anc';
import { ANC_PROFILE_URL, VIEW } from '../../../../../constants';
// ANC specific configurable table columns
export const useANCTableColumns = () => {
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
                        Header: 'EDD',
                        accessor: 'attributes.dynamicProperties.edd',
                    },
                    {
                        Header: 'Gestational age',
                        accessor: 'attributes.dynamicProperties.last_contact_date',
                    },

                    {
                        Header: 'Last Contact',
                        accessor: '',
                    },
                    {
                        Header: 'Risk Category',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<ANCClientType>): ReturnType<React.FC> => (
                            <Link to={`${ANC_PROFILE_URL}/${values.baseEntityId}`}>{VIEW}</Link>
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
