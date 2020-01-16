/* eslint-disable react/prop-types */
import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationState } from '@onaio/pagination';
import { ExtendingOptions } from '.';

interface ActionCreators {
    (): void;
}

export interface Props {
    paginationState: PaginationState<ExtendingOptions>;
    nextPage: ActionCreators;
    firstPage: ActionCreators;
    lastPage: ActionCreators;
    goToPage: (page: number) => void;
    previousPage: ActionCreators;
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
                        aria-label="Start"
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => firstPage()}
                    >
                        <span aria-hidden="true">Start</span>
                        <span className="sr-only">Start</span>
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label="Previous"
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => previousPage()}
                    >
                        <span aria-hidden="true">Previous</span>
                        <span className="sr-only">Previous</span>
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
                            'Loading'
                        ) : (
                            <PaginationLink
                                className={`page-link`}
                                href="#"
                                aria-label={'ellipsis'}
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
                        aria-label={'Next'}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => nextPage()}
                    >
                        <span aria-hidden="true">Next</span>
                        <span className="sr-only">Next</span>
                    </PaginationLink>
                </PaginationItem>
                <PaginationItem className={`page-item ${canNextPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        href="#"
                        aria-label="Last"
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={(): void => lastPage()}
                    >
                        <span aria-hidden="true">Last</span>
                        <span className="sr-only">Last</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </React.Fragment>
    );
};
