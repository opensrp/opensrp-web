/* eslint-disable react/prop-types */
import * as React from 'react';
import { ActionTypes, PaginationOptions, PaginationState, usePagination } from '@onaio/pagination';
import { fetchPageNumbers } from './utils';
import { BootstrapJSX } from './JSX';
import { AnyAction } from 'redux';

/** a util function that takes in the usePagination state
 * and uses some of its properties to calculate the pagination pages
 * to be displayed based on the currently selected page
 */
export const fetchPagesToDisplay = (state: PaginationState<ExtendingOptions>): string[] => {
    const { totalRecords, pageNeighbors, pageSize, currentPage } = state;
    return fetchPageNumbers(totalRecords, pageNeighbors, pageSize, currentPage);
};

/** describes the properties that we are going to add to the usePagination hook's state */
export interface ExtendingOptions {
    fetchPagesToDisplay: typeof fetchPagesToDisplay;
    pageNeighbors: number;
    pagesToDisplay: string[];
}

/** custom reducer: adds some properties to state specific to bootstrap ie.
 *  adds the property `pagesToDisplay` to the state so that we can have a limited
 * number of pagination items displayed by the pagination component at any one time
 */
export function bootstrapReducer(
    state: PaginationState<ExtendingOptions>,
    action: ActionTypes<ExtendingOptions, AnyAction>,
): PaginationState<ExtendingOptions> {
    switch (action.type) {
        case 'TO_PAGE':
            const pagesToDisplay = action.changes.fetchPagesToDisplay(action.changes);
            return {
                ...action.changes,
                pagesToDisplay,
            };
        default:
            return state;
    }
}

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
    const initialDisplayedPages = fetchPageNumbers(totalRecords, pageNeighbors, initialPageSize);

    const options: PaginationOptions<ExtendingOptions> = {
        initialState: {
            fetchPagesToDisplay,
            pageNeighbors,
            pagesToDisplay: initialDisplayedPages,
        },
        pageSize: initialPageSize,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        reducer: bootstrapReducer as any,
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

    React.useEffect(() => {
        onPageChangeHandler && onPageChangeHandler(paginationState.currentPage, paginationState.pageSize);
    }, [paginationState.currentPage]);

    return (
        <BootstrapJSX
            {...{
                paginationState,
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
