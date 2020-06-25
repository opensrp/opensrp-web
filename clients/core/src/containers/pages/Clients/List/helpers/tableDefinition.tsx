import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
import { Client } from '../../../../../store/ducks/clients';
import { CLIENT_PROFILE_URL } from '../../../../../constants';

// Client specific configurable table columns
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useClientTableColumns = () => {
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
                        Header: 'Age',
                        accessor: 'attributes.dynamicProperties.age_year_part',
                    },
                    {
                        Header: 'Gender',
                        accessor: 'gender',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Location',
                        accessor: '',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Last Contact',
                        accessor: 'attributes.dynamicProperties.last_contact_date',
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Client>): ReturnType<React.FC> => (
                            <Link to={`${CLIENT_PROFILE_URL}/${values.baseEntityId}`}>view</Link>
                        ),
                        Header: 'Actions',
                        accessor: '',
                        disableSortBy: true,
                    },
                ],
                id: 'clienttableCrumb',
            },
        ],
        [],
    );
};
