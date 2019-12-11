/** bootstrap tabled component abstracting the jsx part when using
 * the react-table component
 */
import React from 'react';
import { Column, useSortBy, useTable } from 'react-table';
import './index.css';

/** props for the ReactTable component */
interface ReactTableProps<T extends object> {
  /** a memorized list of columns  */
  tableColumns: Column[];
  /** the data to be rendered in table */
  data: T[];
}

/** the component definition */
function ReactTable<T extends object>(props: ReactTableProps<T>) {
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
      <table {...getTableProps()} className="table react-table">
        <thead>
          {headerGroups.map((headerGroup, idx) => (
            <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any, index) => (
                <th
                  key={`thead-th-${index}`}
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                >
                  {column.render('Header')}
                  {/* Add a sort direction indicator */}
                  <span>
                    {column.canSort ? (
                      column.isSorted ? (
                        column.isSortedDesc ? (
                          <>&nbsp;&nbsp;&nbsp;↓</>
                        ) : (
                          <>&nbsp;&nbsp;&nbsp;↑</>
                        )
                      ) : (
                        <>&nbsp;&nbsp;&nbsp;↕</>
                      )
                    ) : (
                      ''
                    )}
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
}

const defaultANCTableProps: ReactTableProps<{}> = {
  data: [],
  tableColumns: [
    {
      Header: 'Please Define some columns',
      accessor: '',
    },
  ],
};

ReactTable.defaultProps = defaultANCTableProps;

export { ReactTable };
