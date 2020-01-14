/* eslint-disable react/prop-types */
import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { PaginationState } from '@onaio/pagination';
import { ExtendingOptions } from '.';
import { Action } from 'history';

interface ActionCreators {
    (): void;
}

interface Props {
    paginationState: PaginationState<ExtendingOptions>;
    nextPage: ActionCreators;
    firstPage: ActionCreators;
    lastPage: ActionCreators;
    goToPage: (page: number) => void;
    previousPage: ActionCreators;
    canNextPage: boolean;
    canPreviousPage: boolean;
    fetchMoreApiData: () => Promise<void>;
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
            <Pagination aria-label="pagination" size="sm">
                <PaginationItem className={`page-item ${canPreviousPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label="Start"
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={() => firstPage()}
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
                        onClick={() => previousPage()}
                    >
                        <span aria-hidden="true">Previous</span>
                        <span className="sr-only">Previous</span>
                    </PaginationLink>
                </PaginationItem>
                {paginationState.pagesToDisplay.map((page: any, index: number) => {
                    return (
                        <PaginationItem
                            key={index}
                            className={`page-item ${paginationState.currentPage === page ? ' active' : ''}`}
                        >
                            {/* tslint:disable-next-line:jsx-no-lambda */}
                            <PaginationLink className="page-link" href="#" onClick={() => goToPage(page)}>
                                {page}
                            </PaginationLink>
                        </PaginationItem>
                    );
                })}
                {paginationState.canShowEllipsis && (
                    <PaginationItem className={`page-item`}>
                        <PaginationLink
                            className={`page-link`}
                            href="#"
                            aria-label={'Ellipsis'}
                            // tslint:disable-next-line: jsx-no-lambda
                            onClick={() => fetchMoreApiData()}
                        >
                            <span aria-hidden="true">ellipsis</span>
                            <span className="sr-only"> {paginationState.ellipsisIsLoading ? 'Loading' : '...'} </span>
                        </PaginationLink>
                    </PaginationItem>
                )}
                <PaginationItem className={`page-item  ${canNextPage ? '' : 'disabled'}`}>
                    <PaginationLink
                        className={`page-link`}
                        href="#"
                        aria-label={'Next'}
                        // tslint:disable-next-line: jsx-no-lambda
                        onClick={() => nextPage()}
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
                        onClick={() => lastPage()}
                    >
                        <span aria-hidden="true">Last</span>
                        <span className="sr-only">Last</span>
                    </PaginationLink>
                </PaginationItem>
            </Pagination>
        </React.Fragment>
    );
};
