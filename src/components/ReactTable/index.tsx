import React from 'react';
import { useSortBy, useTable } from 'react-table';
import { Client } from '../../store/ducks/clients';

interface ANCTableProps {
  tableColumns: any;
  data: Client[];
}

const ReactTable: React.FC<ANCTableProps> = props => {
  const { tableColumns, data } = props;
  // Use the state and functions returned from useTable to build your UI
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns: tableColumns,
      data,
    },
    useSortBy
  );

  return (
    <div>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index) => (
                // Add the sorting props to control sorting. For this example
                // we can add them into the header props
                <th
                  key={`thead-th-${index}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.canSort
                      ? column.isSorted
                        ? column.isSortedDesc
                          ? ' ↓'
                          : ' ↑'
                        : '↕'
                      : ''}
                  </span>
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

ReactTable.defaultProps = defaultANCTableProps;

export { ReactTable };
