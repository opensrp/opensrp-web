/* eslint-disable react/prop-types */
import * as React from 'react';
import { PaginationOptions, usePagination } from '@onaio/pagination';
import { fetchPageNumbers } from './utils';
import { BootstrapJSX } from './JSX';

/** describes props object to the Pagination component */
export interface Props {
    onPageChangeHandler?(currentPage: number, pageSize: number): void;
    pageNeighbors: number;
    pageSize: number;
    totalRecords: number;
}

/** default props for the pagination component */
const defaultProps: Pick<Props, 'pageNeighbors' | 'pageSize' | 'totalRecords'> = {
    pageNeighbors: 3,
    pageSize: 30,
    totalRecords: 0,
};

/** bootstrap-powered pagination component  */
const Pagination: React.FC<Props> = props => {
    const { onPageChangeHandler, pageNeighbors, pageSize, totalRecords } = props;

    const initialPageSize = pageSize;
    const options: PaginationOptions<{}> = {
        pageSize: initialPageSize,
        totalRecords: totalRecords,
    };

    const {
        paginationState,
        nextPage,
        firstPage,
        lastPage,
        goToPage,
        previousPage,
        canNextPage,
        canPreviousPage,
    } = usePagination(options);

    const pagesToDisplay = fetchPageNumbers(totalRecords, pageNeighbors, pageSize, paginationState.currentPage);
    const customPaginationState = {
        ...paginationState,
        pagesToDisplay,
    };

    React.useEffect(() => {
        onPageChangeHandler && onPageChangeHandler(paginationState.currentPage, paginationState.pageSize);
    }, [paginationState.currentPage, totalRecords]);

    return (
        <BootstrapJSX
            {...{
                paginationState: customPaginationState,
                nextPage,
                firstPage,
                lastPage,
                goToPage,
                previousPage,
                canNextPage,
                canPreviousPage,
            }}
        />
    );
};

Pagination.defaultProps = defaultProps;

export { Pagination };
