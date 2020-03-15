/** bootstrap tabled component abstracting the jsx part when using
 * the react-table component
 */
import * as React from 'react';
import {
    Column,
    useSortBy,
    useTable,
    ColumnInstance,
    UseSortByColumnProps,
    Cell,
    UseTableHeaderGroupProps,
    Row,
} from 'react-table';
import { PLEASE_DEFINE_SOME_COLUMNS } from './constants';

/** props for the OpenSRPTable component */
interface OpenSRPTableProps<T extends object> {
    /** a memoized list of columns  */
    tableColumns: Column<T>[];
    /** the data to be rendered in table */
    data: T[];
}

/** Default props for openSRPTable component */
// Having trouble typing this to OpenSRPTableProps
const defaultOpenSRPTableProps = {
    data: [],
    tableColumns: [
        {
            Header: PLEASE_DEFINE_SOME_COLUMNS,
            accessor: '',
        },
    ],
};

/** describe the column instance after including hooks. */
interface ActualColumnInstance<D extends object> extends ColumnInstance<D>, UseSortByColumnProps<D> {}

/** the component definition */
function OpenSRPTable<T extends object>(
    props: OpenSRPTableProps<T> = defaultOpenSRPTableProps,
): ReturnType<React.FC<T>> {
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
                    {headerGroups.map((headerGroup: UseTableHeaderGroupProps<T>, idx: number) => (
                        <tr key={`thead-tr-${idx}`} {...headerGroup.getHeaderGroupProps()}>
                            {headerGroup.headers.map((c: ColumnInstance<T>, index: number) => {
                                const column = (c as unknown) as ActualColumnInstance<T>;
                                return (
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
                                );
                            })}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row: Row<T>, i: number) => {
                        prepareRow(row);
                        return (
                            <tr key={`tbody-tr-${i}`} {...row.getRowProps()}>
                                {row.cells.map((cell: Cell<T>, index: number) => {
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
        </div>
    );
}

export { OpenSRPTable };
