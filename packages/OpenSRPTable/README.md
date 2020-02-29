# Opensrp Table

This provides a grid component that can be used to display data on a page.
It adds an extra abstraction layer over [react-table](https://github.com/tannerlinsley/react-table#readme) that makes it much easier to use within the more limited scope of opensrp-web. Currently it only re-exposes the sorting api from react-table.

## Installation

```node
yarn add @opensrp/opensrp-table
```

### Options

-   **tableColumns**(Column as defined by [react-table](https://github.com/tannerlinsley/react-table#readme)
    -   **required**
    -   A memoized array of columns, see example below
-   **data**(< T >)
    -   **required**
    -   an array of items to be displayed on the grid

#### an example

```typescript
import React from 'react';
import { OpenSRPTable } from '@opensrp-table';

export const useColumns = () => {
    return React.useMemo(() => [
        {
            Header: 'First Name',
            accessor: 'firstName',
        },
        {
            Header: 'Last Name',
            accessor: 'lastName',
        },
    ]);
};

const data = [
    { firstName: 'Soap', lastName: 'MacTavish' },
    { firstName: 'captain', lastName: 'Price' },
];

const CustomTable: React.FC<ANCTableProps> = () => {
    return <ReactTable {...{ data, tableColumns: useColumns() }} />;
};
```
