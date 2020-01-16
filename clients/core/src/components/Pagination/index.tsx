/* eslint-disable react/prop-types */
import * as React from 'react';
import { ActionTypes, PaginationOptions, PaginationState, usePagination } from '@onaio/pagination';
import { fetchPageNumbers } from './utils';
import { BootstrapJSX } from './JSX';

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
    showEndingEllipsis: boolean;
    ellipsisIsLoading: boolean;
}

// action types strings
export const START_QUERY_FOR_MORE_API_PAGES = 'START_QUERY_FOR_MORE_API_PAGES';
export type START_QUERY_FOR_MORE_API_PAGES = typeof START_QUERY_FOR_MORE_API_PAGES;
export const END_QUERY_FOR_MORE_API_PAGES = 'END_QUERY_FOR_MORE_API_PAGES';
export type END_QUERY_FOR_MORE_API_PAGES = typeof END_QUERY_FOR_MORE_API_PAGES;
export const STOP_SHOWING_ELLIPSIS = 'STOP_SHOWING_ELLIPSIS';
export type STOP_SHOWING_ELLIPSIS = typeof STOP_SHOWING_ELLIPSIS;

/** describes an action that changes the ellipsis-pagination-item status */
interface EllipsisActions {
    type: START_QUERY_FOR_MORE_API_PAGES | END_QUERY_FOR_MORE_API_PAGES | STOP_SHOWING_ELLIPSIS;
    payload: {
        loading: boolean;
        showEllipsis: boolean;
    };
}

/** decides if component gets to show an ellipsis pagination link that once clicked
 * queries the api for the next server page of data
 */
export const canShowEllipsis = (
    state: PaginationState<ExtendingOptions>,
    isThereMoreApiPages: (state: PaginationState<ExtendingOptions>) => Promise<boolean>,
    dispatch: (action: ActionTypes<ExtendingOptions, EllipsisActions>) => void,
): void => {
    const { totalPages, pagesToDisplay, pageNeighbors } = state;
    const lastPageIsInRange = pagesToDisplay.filter((page: string) => totalPages.toString() === page).length > 0;
    const thereIsPaginationItemRoom = pagesToDisplay.length < 1 + 2 * pageNeighbors;

    if (lastPageIsInRange && thereIsPaginationItemRoom) {
        dispatch({
            type: START_QUERY_FOR_MORE_API_PAGES,
            payload: {
                loading: true,
                showEllipsis: true,
            },
        });
        isThereMoreApiPages(state).then((response: boolean) => {
            if (response) {
                dispatch({
                    type: END_QUERY_FOR_MORE_API_PAGES,
                    payload: {
                        loading: false,
                        showEllipsis: true,
                    },
                });
            } else {
                dispatch({
                    type: END_QUERY_FOR_MORE_API_PAGES,
                    payload: {
                        loading: false,
                        showEllipsis: false,
                    },
                });
            }
        });
    } else {
        dispatch({
            type: 'STOP_SHOWING_ELLIPSIS',
            payload: {
                loading: false,
                showEllipsis: false,
            },
        });
    }
};

/** custom reducer: adds some properties to state specific to bootstrap ie.
 *  adds the property `pagesToDisplay` to the state so that we can have a limited
 * number of pagination items displayed by the pagination component at any one time
 */
export function bootstrapReducer(
    state: PaginationState<ExtendingOptions>,
    action: ActionTypes<ExtendingOptions, EllipsisActions>,
): PaginationState<ExtendingOptions> {
    switch (action.type) {
        case 'TO_PAGE':
            const pagesToDisplay = action.changes.fetchPagesToDisplay(action.changes);
            return {
                ...action.changes,
                pagesToDisplay,
            };
        case START_QUERY_FOR_MORE_API_PAGES:
            return {
                ...state,
                showEndingEllipsis: action.payload.showEllipsis,
                ellipsisIsLoading: action.payload.loading,
            };
        case END_QUERY_FOR_MORE_API_PAGES:
            return {
                ...state,
                showEndingEllipsis: action.payload.showEllipsis,
                ellipsisIsLoading: action.payload.loading,
            };
        case STOP_SHOWING_ELLIPSIS:
            return {
                ...state,
                showEndingEllipsis: action.payload.showEllipsis,
                ellipsisIsLoading: action.payload.loading,
            };
        default:
            return state;
    }
}

export interface Props {
    onPageChangeHandler?(currentPage: number, pageSize: number): void;
    pageNeighbors: number;
    pageSize: number;
    totalRecords: number;
    isThereMoreApiPages?: (arg: PaginationState<{}>) => Promise<boolean>;
    fetchMoreApiData?: () => Promise<void>;
}

const defaultProps: Pick<Props, 'pageNeighbors' | 'pageSize' | 'totalRecords'> = {
    pageNeighbors: 3,
    pageSize: 30,
    totalRecords: 0,
};

/** bootstrap-powered pagination component  */
const Pagination: React.FC<Props> = props => {
    const { onPageChangeHandler, pageNeighbors, pageSize, isThereMoreApiPages, totalRecords, fetchMoreApiData } = props;

    const localIsThereMoreApiPages = isThereMoreApiPages ? isThereMoreApiPages : async (): Promise<boolean> => false;

    const initialPageSize = pageSize;
    const initialDisplayedPages = fetchPageNumbers(totalRecords, pageNeighbors, initialPageSize);

    const options: PaginationOptions<ExtendingOptions> = {
        initialState: {
            fetchPagesToDisplay,
            pageNeighbors,
            pagesToDisplay: initialDisplayedPages,
            showEndingEllipsis: false,
            ellipsisIsLoading: false,
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
        dispatch,
    } = usePagination(options);

    React.useEffect(() => {
        canShowEllipsis(paginationState, localIsThereMoreApiPages, dispatch);
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
                fetchMoreApiData,
            }}
        />
    );
};

Pagination.defaultProps = defaultProps;

export { Pagination };
