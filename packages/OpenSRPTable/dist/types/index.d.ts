/** bootstrap tabled component abstracting the jsx part when using
 * the react-table component
 */
import * as React from 'react';
import { Column } from 'react-table';
/** props for the OpenSRPTable component */
interface OpenSRPTableProps<T extends object> {
    /** a memoized list of columns  */
    tableColumns: Column<T>[];
    /** the data to be rendered in table */
    data: T[];
}
/** the component definition */
declare function OpenSRPTable<T extends object>(props?: OpenSRPTableProps<T>): ReturnType<React.FC<T>>;
export { OpenSRPTable };
