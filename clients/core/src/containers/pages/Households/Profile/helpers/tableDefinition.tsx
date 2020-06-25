/* eslint-disable react/prop-types */
import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { VIEW, CHILD_URL, CHILD_PROFILE_URL, CLIENT_PROFILE_URL } from '../../../../../constants';
import { UseTableCellProps } from 'react-table';
import { Client } from '../../../../../store/ducks/clients';
import { calculateAgeFromBirthdate } from '../../../../../helpers/utils';
// Child specific configurable table columns
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
export const useMemberTableColumns = () => {
    return useMemo(
        () => [
            {
                /** placeholder for location table crumb */
                // TODO - the location tableCrumb will be a render prop
                // eslint-disable-next-line react/display-name
                Header: (): React.ReactNode => <></>,
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
                        // eslint-disable-next-line react/display-name
                        Cell: ({ row: { values } }: UseTableCellProps<Client>): ReturnType<React.FC> => (
                            <>{calculateAgeFromBirthdate(values.birthdate)}</>
                        ),
                        Header: 'Age',
                        accessor: 'birthdate',
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
                                {console.log({ values })}
                                {calculateAgeFromBirthdate(values.birthdate) < 6 ? (
                                    <Link to={`${CHILD_PROFILE_URL}/${values.baseEntityId}`}>{VIEW}</Link>
                                ) : (
                                    <Link to={`${CLIENT_PROFILE_URL}/${values.baseEntityId}`}>{VIEW}</Link>
                                )}
                            </>
                        ),
                        Header: 'Actions',
                        accessor: 'baseEntityId',
                        disableSortBy: true,
                    },
                ],
                id: 'tableCrumb',
            },
        ],
        [],
    );
};
