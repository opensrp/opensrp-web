/** bootstrap tabled component abstracting the jsx part when using
 * the react-table component
 */
import React from 'react';
import { Column, useSortBy, useTable, ColumnInstance, UseSortByColumnProps, Cell } from 'react-table';
import './index.css';
import { PLEASE_DEFINE_SOME_COLUMNS } from '../../constants';

/** props for the ReactTable component */
interface ReactTableProps<T extends object> {
    /** a memoized list of columns  */
    tableColumns: Column[];
    /** the data to be rendered in table */
    data: T[];
}

const defaultANCTableProps = {
    data: [],
    tableColumns: [
        {
            Header: PLEASE_DEFINE_SOME_COLUMNS,
            accessor: '',
        },
    ],
};

/** describe the column instance after including hooks. */
interface ActualColumnInstance<D extends object = {}> extends ColumnInstance<D>, UseSortByColumnProps<D> {}

/** the component definition */
function ReactTable<T extends object>(props: ReactTableProps<T> = defaultANCTableProps): ReturnType<React.FC<T>> {
    const { tableColumns, data } = props;

    // Use the state and functions returned from useTable to build your UI
    const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable<T>(
        {
            columns: tableColumns,
            data,
        },
        useSortBy,
    );

    return (
        <div>
            <table {...getTableProps()} className="table react-table">
                <thead>
                    {headerGroups.map((headerGroup, idx) => (
                        <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((c: ColumnInstance<T>, index) => {
                                const column = (c as unknown) as ActualColumnInstance<T>;
                                <th key={`thead-th-${index}`} {...column.getHeaderProps(column.getSortByToggleProps())}>
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
                                </th>;
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, i) => {
                        prepareRow(row);
                        return (
                            <tr key={`tbody-tr-${i}`} {...row.getRowProps()}>
                                {row.cells.map((cell: Cell, index: number) => {
                                    return (
                                        <td key={`tbody-td-${index}`} {...cell.getCellProps()}>
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

export { ReactTable };
