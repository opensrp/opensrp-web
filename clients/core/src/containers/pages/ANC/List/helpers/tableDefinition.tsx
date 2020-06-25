import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps, CellProps } from 'react-table';
import { ANCClientType } from '../../../../../store/ducks/anc';
import { ANC_PROFILE_URL, VIEW } from '../../../../../constants';
import { readableDate } from '../../../../../helpers/utils';
// ANC specific configurable table columns
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useANCTableColumns = (): any => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: (): ReturnType<React.FC> => <></>,
                columns: [
                    { Header: 'Identifier', accessor: 'identifiers.opensrp_id', disableSortBy: true },
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
                        // eslint-disable-next-line react/display-name
                        Cell: ({ cell: { value } }: CellProps<object>): string => readableDate(value),
                    },
                    {
                        Header: 'Gestational age',
                        accessor: 'attributes.dynamicProperties.gestational_age',
                        // eslint-disable-next-line react/display-name
                        Cell: ({ cell: { value } }: CellProps<object>): string => readableDate(value),
                    },

                    {
                        Header: 'Last Contact',
                        accessor: 'attributes.dynamicProperties.last_contact_date',
                        // eslint-disable-next-line react/display-name
                        Cell: ({ cell: { value } }: CellProps<object>): string => readableDate(value),
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
