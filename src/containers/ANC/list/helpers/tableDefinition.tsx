import { useMemo } from 'react';
import React from 'react';
import { Link } from 'react-router-dom';
import { Column } from 'react-table';

// ANC specific configurable table columns
export const createColumns = () => {
  return [
    {
      /** placeholder for location table crumb */
      // TODO - the location tableCrumb will be a render prop
      Header: () => (
        <>
          <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
              <li className="breadcrumb-item">
                <a href="#">Kenya</a>
              </li>
              <li className="breadcrumb-item">
                <a href="#">Nairobi</a>
              </li>
              <li className="breadcrumb-item active" aria-current="page">
                Kilimani
              </li>
            </ol>
          </nav>
        </>
      ),
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
          Header: 'Location',
          accessor: '',
          disableSortBy: true,
        },
        {
          Header: 'Age',
          accessor: 'attributes.age',
        },
        {
          Header: 'EDD',
          accessor: 'attributes.edd',
        },
        {
          Header: 'Gestation Age',
          accessor: '',
        },
        {
          Header: 'Last Contact Date',
          accessor: 'attributes.last_contact_record_date',
        },

        {
          Header: 'Risk Category',
          accessor: '',
          disableSortBy: true,
        },
        {
          Cell: ({ row: { index } }: any) => <Link to="#">View</Link>,
          Header: 'Actions',
          accessor: '',
          disableSortBy: true,
        },
      ],
      id: 'tableCrumb',
    },
  ];
};
