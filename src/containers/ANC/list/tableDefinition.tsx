import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTable } from 'react-table';
import { Row } from 'reactstrap';
import { Client } from '../../../store/ducks/clients';

// ANC specific configurable table columns
export const useColumns = () => {
  return useMemo(
    () => [
      {
        /** placeholder for location table crumb */
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
          },
          {
            Header: 'Last Name',
            accessor: 'lastName',
          },

          {
            Header: 'Location',
            accessor: '',
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
          },
          {
            Cell: ({ row: { index } }: any) => <Link to="#">View</Link>,
            Header: 'Actions',
            accessor: '',
          },
        ],
        id: 'tableCrumb',
      },
    ],
    []
  );
};

interface ANCTableProps {
  tableColumns: any;
  data: Client[];
}

const ANCTable: React.FC<ANCTableProps> = props => {
  const { tableColumns, data } = props;
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns: tableColumns,
    data,
  });

  return (
    <div>
      <Row>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup, idx) => (
              <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column, index) => (
                  // Add the sorting props to control sorting. For this example
                  // we can add them into the header props
                  <th key={`thead-th-${index}`} {...column.getHeaderProps()}>
                    {column.render('Header')}
                    {/* Add a sort direction indicator */}
                    {/* <span>{column.isSorted ? (column.isSortedDesc ? ' 🔽' : ' 🔼') : ''}</span> */}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr key={`tbody-tr-${i}`} {...row.getRowProps()}>
                  {row.cells.map((cell: any, index: number) => {
                    return (
                      <td key={'tbody-td-${index}'} {...cell.getCellProps()}>
                        {cell.render('Cell')}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <br />
        <div>Showing all rows</div>
      </Row>
    </div>
  );
};

const defaultANCTableProps: ANCTableProps = {
  data: [],
  tableColumns: {
    Header: 'Please Define some columns',
    accessor: '',
  },
};

ANCTable.defaultProps = defaultANCTableProps;

export { ANCTable };
