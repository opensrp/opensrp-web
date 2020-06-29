/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { LocationTag } from '../../../../store/ducks/locationTag';
import { UseTableCellProps } from 'react-table';
// Child specific configurable table columns
export const useLocationTagTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: '',
                columns: [
                    { Header: 'Id', accessor: 'id', disableSortBy: true },
                    {
                        Header: 'Name',
                        accessor: 'name',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Description',
                        accessor: 'description',
                        disableSortBy: true,
                    },
                    // {
                    //     // eslint-disable-next-line react/display-name
                    //     Cell: ({ row: { values } }: UseTableCellProps<LocationTag>): React.ReactNode => (
                    //         <label>{values.active ? 'Active' : 'Deactive'}</label>
                    //     ),
                    //     Header: 'Status',
                    //     accessor: 'active',
                    //     disableSortBy: true,
                    // },
                ],
                id: 'locationTagtableCrumb',
            },
        ],
        [],
    );
};
