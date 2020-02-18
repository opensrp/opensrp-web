/* eslint-disable react/prop-types */
import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationState } from '@onaio/pagination';
import { ExtendingOptions } from '.';
import { START, PREVIOUS, LOADING, ELLIPSIS, NEXT, LAST } from '../../constants';

/** describe the helper functions that add domain logic to the dispatch function */
interface ActionCreatorsWrapperFn {
    (): void;
}

/** describes props that bootstrapJSX will receive */
export interface Props {
    paginationState: PaginationState<ExtendingOptions>;
    nextPage: ActionCreatorsWrapperFn;
    firstPage: ActionCreatorsWrapperFn;
    lastPage: ActionCreatorsWrapperFn;
    goToPage: (page: number) => void;
    previousPage: ActionCreatorsWrapperFn;
    canNextPage: boolean;
    canPreviousPage: boolean;
    fetchMoreApiData?: () => Promise<void>;
}

/** JSX only Wrapper for bootstrap pagination component*/
export const BootstrapJSX: React.FC<Props> = props => {
    const {
        paginationState,
        nextPage,
        firstPage,
        lastPage,
        goToPage,
        previousPage,
        canNextPage,
        canPreviousPage,
        fetchMoreApiData,
    } = props;

    return (
        <React.Fragment>
            <Pagination aria-label="pagination" size="md">
                <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label={`${START}`}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => firstPage()}
                    >
                        <span aria-hidden="true">{START}</span>
                        <span className="sr-only">{START}</span>
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label={`${PREVIOUS}`}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => previousPage()}
                    >
                        <span aria-hidden="true">{PREVIOUS}</span>
                        <span className="sr-only">{PREVIOUS}</span>
                    </PaginationLink>
                </PaginationItem>
                {paginationState.pagesToDisplay.map((page: string, index: number) => {
                    return (
                        <PaginationItem
                            key={index}
                            className={`page-item ${
                                paginationState.currentPage === parseInt(page, 10) ? ' active' : ''
                            }`}
                        >
                            {/* tslint:disable-next-line:jsx-no-lambda */}
                            <PaginationLink
                                className="page-link"
                                href="#"
                                onClick={(): void => goToPage(parseInt(page, 10))}
                            >
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                {paginationState.showEndingEllipsis && (
                    <PaginationItem className={`page-item`}>
                        {paginationState.ellipsisIsLoading ? (
                            `${LOADING}`
                        ) : (
                            <PaginationLink
                                className={`page-link`}
                                href="#"
                                aria-label={`${ELLIPSIS}`}
                                // tslint:disable-next-line: jsx-no-lambda
                                onClick={(): Promise<void> | undefined => fetchMoreApiData && fetchMoreApiData()}
                            >
                                . . .
                            </PaginationLink>
                        )}
                    </PaginationItem>
                )}
                <PaginationItem className={`page-item  ${canNextPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label={`${NEXT}`}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => nextPage()}
                    >
                        <span aria-hidden="true">{NEXT}</span>
                        <span className="sr-only">{NEXT}</span>
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        href="#"
                        aria-label={`${LAST}`}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => lastPage()}
                    >
                        <span aria-hidden="true">{LAST}</span>
                        <span className="sr-only">{LAST}</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </React.Fragment>
    );
};
