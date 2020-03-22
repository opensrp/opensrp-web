import React, { useMemo, ReactElement } from 'react';
import { Link } from 'react-router-dom';
import { FlexObject } from '../../../../../helpers/utils';

const actionsCell = ({ row: { index } }: FlexObject): ReactElement => (
    // TODO - modify the link to point to profile
    <Link to="#" key={index}>
        View
    </Link>
);

// Client specific configurable table columns
export const useClientTableColumns = () => {
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
                        Cell: actionsCell,
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
