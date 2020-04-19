/** headless component for pagination */
import { useState, useEffect } from 'react';

/** makes sure any received page number is within 1 through to totalPages
 * @param pageNumber - the selected page number
 * @param allPages -  the total number of pages
 */
export const sanitizeNumber = (pageNumber: number, allPages: number): number =>
    Math.min(Math.max(1, pageNumber), Math.max(allPages, 1));

/** options for usePagination hook */
export interface PaginationOptions {
    totalRecords: number;
    pageSize: number;
}
/**describes the state created by hook */
export interface PaginationState {
    totalPages: number;
    pageSize: number;
    totalRecords: number;
}

/** default state */
const defaultPaginationState = {
    totalRecords: 0,
    pageSize: 0,
    totalPages: 0,
};

/** hook to expose page mutating helper logic to the calling component */
export function usePagination({ totalRecords = 0, pageSize = 1 }: PaginationOptions) {
    const totalPages = Math.ceil(totalRecords / pageSize); // division by zero error

    // const combinedReducer = reducerCombiner(reducer);
    const [state, dispatch] = useState<PaginationState>(defaultPaginationState);
    const [currentPage, setCurrentPage] = useState<number>(1);

    const nextPage = () => setCurrentPage(sanitizeNumber(currentPage + 1, totalPages));
    const firstPage = () => setCurrentPage(sanitizeNumber(1, totalPages));
    const lastPage = () => setCurrentPage(sanitizeNumber(totalPages, totalPages));
    const previousPage = () => setCurrentPage(sanitizeNumber(currentPage - 1, totalPages));
    const goToPage = (pageNumber: number) => setCurrentPage(sanitizeNumber(pageNumber, totalPages));

    const canPreviousPage = currentPage > 1;
    const canNextPage = currentPage < totalPages;

    const paginationState = {
        ...state,
        currentPage,
    };

    useEffect(() => {
        goToPage(1);
    }, [totalRecords]);

    return {
        canNextPage,
        canPreviousPage,
        dispatch,
        firstPage,
        goToPage,
        lastPage,
        nextPage,
        paginationState,
        previousPage,
    };
}
