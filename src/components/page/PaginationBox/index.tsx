import * as React from 'react';
import { Pagination, PaginationItem, PaginationLink } from 'reactstrap';
import './paginationBox.css';

/** List of the meta buttons */
const END_BUTTON: string = 'End';
const NEXT_BUTTON: string = 'Next';
const PREVIOUS_BUTTON: string = 'Previous';
const START_BUTTON: string = 'Start';

export type PageNumberChangeHandler = (requestPageNumber: number) => void;

/** interface for the pagination props */
export interface PaginationProps {
  activePageNumber: number;
  maxPageNumber: number;
  pageNumberChangeHandler: PageNumberChangeHandler;
}

/** handle requests of changing pages from the meta buttons */
const requestChangeOfPageFromPageButton = (pageChangeHandler: PageNumberChangeHandler): any => (
  event: React.MouseEvent
): any => {
  if (
    (event.currentTarget.className || '').split(' ').includes('active') ||
    (event.currentTarget.className || '').split(' ').includes('disabled')
  ) {
    return;
  }
  window.scroll(0, 0);
  pageChangeHandler(parseInt(event.currentTarget.getAttribute('name') || '1', 10));
};

/** handle requests of changing pages from the page buttons */
const requestChangeOfPageFromMetaButton = (
  pageChangeHandler: PageNumberChangeHandler,
  currentPageNumber: number,
  maxPageNumber: number
): any => (event: React.MouseEvent): any => {
  if (
    (event.currentTarget.className || '').split(' ').includes('active') ||
    (event.currentTarget.className || '').split(' ').includes('disabled')
  ) {
    return;
  }
  window.scroll(0, 0);
  const firstPageNumber: number = 1;
  const metaButtonName: string | null = event.currentTarget.getAttribute('name');
  let requestedPageNumber: number = firstPageNumber;
  if (metaButtonName !== null) {
    switch (metaButtonName) {
      case END_BUTTON:
        requestedPageNumber = maxPageNumber;
        break;
      case NEXT_BUTTON:
        requestedPageNumber =
          currentPageNumber < maxPageNumber ? currentPageNumber + 1 : maxPageNumber;
        break;
      case PREVIOUS_BUTTON:
        requestedPageNumber =
          currentPageNumber > firstPageNumber ? currentPageNumber - 1 : firstPageNumber;
        break;
      case START_BUTTON:
        requestedPageNumber = firstPageNumber;
    }
    pageChangeHandler(requestedPageNumber);
  }
};

/**
 * creates a pagination component based on the max number of
 * @param {PaginationProps} props - contains the page number of active page, max number of pages and an handler to handle clicks on page items
 */
const PaginationBox = (props: PaginationProps) => {
  const { activePageNumber, maxPageNumber, pageNumberChangeHandler } = props;
  const paginationItemsList: number[] = Array.from({ length: maxPageNumber }, (v, k) => k + 1);
  return (
    <div className="pagination-container">
      <Pagination>
        <PaginationItem
          name={START_BUTTON}
          className={activePageNumber === 1 ? 'disabled' : ''}
          onClick={requestChangeOfPageFromMetaButton(
            pageNumberChangeHandler,
            activePageNumber,
            maxPageNumber
          )}
        >
          <PaginationLink> {START_BUTTON} </PaginationLink>
        </PaginationItem>
        <PaginationItem
          name={PREVIOUS_BUTTON}
          className={activePageNumber === 1 ? 'disabled' : ''}
          onClick={requestChangeOfPageFromMetaButton(
            pageNumberChangeHandler,
            activePageNumber,
            maxPageNumber
          )}
        >
          <PaginationLink> {PREVIOUS_BUTTON} </PaginationLink>
        </PaginationItem>
        {paginationItemsList.map((paginationItem: number) => (
          <PaginationItem
            key={'pagination_' + paginationItem}
            name={paginationItem}
            className={paginationItem === activePageNumber ? 'active' : ''}
            onClick={requestChangeOfPageFromPageButton(pageNumberChangeHandler)}
          >
            <PaginationLink> {paginationItem} </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem
          name={NEXT_BUTTON}
          className={activePageNumber === maxPageNumber ? 'disabled' : ''}
          onClick={requestChangeOfPageFromMetaButton(
            pageNumberChangeHandler,
            activePageNumber,
            maxPageNumber
          )}
        >
          <PaginationLink> {NEXT_BUTTON} </PaginationLink>
        </PaginationItem>
        <PaginationItem
          name={END_BUTTON}
          className={activePageNumber === maxPageNumber ? 'disabled' : ''}
          onClick={requestChangeOfPageFromMetaButton(
            pageNumberChangeHandler,
            activePageNumber,
            maxPageNumber
          )}
        >
          <PaginationLink> {END_BUTTON} </PaginationLink>
        </PaginationItem>
      </Pagination>
    </div>
  );
};

export default PaginationBox;
