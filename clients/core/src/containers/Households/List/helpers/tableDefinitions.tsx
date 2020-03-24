/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { UseTableCellProps } from 'react-table';
import { Household } from '../../../../store/ducks/households';
import { VIEW, HOUSEHOLD_PROFILE_URL } from '../../../../constants';

// Household specific configurable table columns
export const useHouseholdTableColumns = () => {
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
                        Header: 'Family Name',
                        accessor: 'lastName',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Head of Household',
                        accessor: 'attributes.dynamicProperties.family_head',
                        disableSortBy: true,
                    },

                    {
                        Header: 'Phone',
                        accessor: 'attributes.dynamicProperties.phone_number',
                        disableSortBy: true,
                    },
                    {
                        Header: 'Registered Date',
                        accessor: 'dateCreated',
                    },
                    {
                        Header: 'Members',
                        accessor: 'attributes.dynamicProperties.member_count',
                    },
                    {
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Household>): ReturnType<React.FC> => (
                            <Link to={`${HOUSEHOLD_PROFILE_URL}/${values.baseEntityId}`}>{VIEW}</Link>
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
