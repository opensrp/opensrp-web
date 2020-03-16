/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
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
                    // {
                    //     // eslint-disable-next-line react/display-name
                    //     Cell: ({ row: { index } }) => <Link to="#">View</Link>,
                    //     Header: 'Actions',
                    //     accessor: '',
                    //     disableSortBy: true,
                    // },
                ],
                id: 'tableCrumb',
            },
        ],
        [],
    );
};
