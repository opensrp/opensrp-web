/** A bootstrap powered pagination component
 * inspired by https://scotch.io/tutorials/build-custom-pagination-with-react
 */
import React, { Fragment, MouseEvent } from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import { fetchPageNumbers } from './utils';

/** interface for argument passed to the opPageChange prop */
export interface PaginationData {
  currentPage: number;
  pageLimit: number;
  totalPages: number;
  totalRecords: number;
}

/** interface for Paginator props */
export interface BasePaginatorProps {
  ariaLabel?: string;
  currentPage: number;
  endLabel: string;
  nextLabel: string;
  pageChangeHandler: (e: PaginationData) => void;
  pageLimit: number;
  pageNeighbours: number;
  previousLabel: string;
  startLabel: string;
  totalRecords: number;
}

/** default props for paginator component */
export const defaultBasePaginatorProps: BasePaginatorProps = {
  ariaLabel: 'page navigation',
  currentPage: 1,
  endLabel: 'End',
  nextLabel: 'Next',
  pageChangeHandler: f => f,
  pageLimit: 30,
  pageNeighbours: 2,
  previousLabel: 'Previous',
  startLabel: 'Start',
  totalRecords: 0,
};

/** the pagination component */
const BasePaginator = (props: BasePaginatorProps) => {
  const {
    totalRecords,
    pageLimit,
    pageNeighbours,
    ariaLabel,
    pageChangeHandler: onPageChange,
    currentPage,
  } = props;

  let totalPages = 0;

  // pageNeighbours can be in [0, 1, 2, 3, 4, 5]
  const neighbourPillsNum = Math.max(0, Math.min(pageNeighbours, 5));

  totalPages = Math.ceil(totalRecords / pageLimit);

  /** make sure passed in current page is within possible range */
  const sanitizedCurrentPage = Math.max(1, Math.min(currentPage, totalPages));

  const pages = fetchPageNumbers(neighbourPillsNum, totalPages, currentPage);

  // click handlers

  /** click Handler; registers the number of the clicked pagination Item
   * handles click event
   * @param {number} - number of the clicked paginationItem
   * @return {(e: MouseEvent) => void }
   */
  const handleClick = (page: number) => (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(page);
  };

  /** click handler for when user clicks on previous
   * @param {MouseEvent} e - MouseEvent
   */
  const handleMoveLeft = (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage - 1);
  };

  /** click handler for when user clicks on next
   * @param {MouseEvent} e - MouseEvent
   */
  const handleMoveRight = (e: MouseEvent) => {
    e.preventDefault();
    gotoPage(currentPage + 1);
  };

  /** called when user click on a certain pagination item
   * calls the onPageChange handler
   * @param {number} page -  the number of the page clicked
   */
  const gotoPage = (page: number) => {
    const thisPage = Math.max(1, Math.min(page, totalPages));
    const paginationData = {
      currentPage: thisPage,
      pageLimit,
      totalPages,
      totalRecords,
    };
    onPageChange(paginationData);
  };

  const { previousLabel, startLabel, nextLabel, endLabel } = props;

  return (
    <Fragment>
      <Pagination aria-label={ariaLabel} size="sm">
        <PaginationItem className={`page-item ${sanitizedCurrentPage > 1 ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label={startLabel}
            onClick={handleClick(1)}
          >
            <span aria-hidden="true">{startLabel}</span>
            <span className="sr-only">{startLabel}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem className={`page-item ${sanitizedCurrentPage > 1 ? '' : 'disabled'}`}>
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label={previousLabel}
            onClick={handleMoveLeft}
          >
            <span aria-hidden="true">{previousLabel}</span>
            <span className="sr-only">{previousLabel}</span>
          </PaginationLink>
        </PaginationItem>
        {pages.map((page, index) => {
          return (
            <PaginationItem
              key={index}
              className={`page-item ${sanitizedCurrentPage === page ? ' active' : ''}`}
            >
              <PaginationLink className="page-link" href="#" onClick={handleClick(page as number)}>
                {page}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        <PaginationItem
          className={`page-item  ${sanitizedCurrentPage < totalPages ? '' : 'disabled'}`}
        >
          <PaginationLink
            className={`page-link`}
            href="#"
            aria-label={nextLabel}
            onClick={handleMoveRight}
          >
            <span aria-hidden="true">{nextLabel}</span>
            <span className="sr-only">{nextLabel}</span>
          </PaginationLink>
        </PaginationItem>
        <PaginationItem
          className={`page-item ${sanitizedCurrentPage < totalPages ? '' : 'disabled'}`}
        >
          <PaginationLink
            className={`page-link ${sanitizedCurrentPage < totalPages ? '' : 'disabled'}`}
            href="#"
            aria-label={endLabel}
            onClick={handleClick(totalPages)}
          >
            <span aria-hidden="true">{endLabel}</span>
            <span className="sr-only">{endLabel}</span>
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </Fragment>
  );
};

BasePaginator.defaultProps = defaultBasePaginatorProps;

export { BasePaginator };
