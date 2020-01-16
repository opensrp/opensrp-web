/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import {
    canShowEllipsis,
    bootstrapReducer,
    Props,
    fetchPagesToDisplay,
    START_QUERY_FOR_MORE_API_PAGES,
    END_QUERY_FOR_MORE_API_PAGES,
    STOP_SHOWING_ELLIPSIS,
    Pagination,
} from '..';
import { shallow, mount } from 'enzyme';

describe('src/components/pagination', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('canShowEllipsis works for nominal path', async () => {
        const dispatchMock = jest.fn();
        const isMorePagesMock = jest.fn(async () => true);
        const mockedState: any = {
            totalPages: 14,
            pagesToDisplay: ['11', '12', '13', '14'],
            pageNeighbors: 2,
        };
        canShowEllipsis(mockedState, isMorePagesMock, dispatchMock);
        await new Promise(resolve => setImmediate(resolve));
        expect(dispatchMock.mock.calls).toEqual([
            [
                {
                    payload: {
                        loading: true,
                        showEllipsis: true,
                    },
                    type: 'START_QUERY_FOR_MORE_API_PAGES',
                },
            ],
            [
                {
                    payload: {
                        loading: false,
                        showEllipsis: true,
                    },
                    type: 'END_QUERY_FOR_MORE_API_PAGES',
                },
            ],
        ]);
    });

    it('canShowEllipsis if there is no more api pages', async () => {
        const dispatchMock = jest.fn();
        const isMorePagesMock = jest.fn(async () => false);
        const mockedState: any = {
            totalPages: 14,
            pagesToDisplay: ['11', '12', '13', '14'],
            pageNeighbors: 2,
        };
        canShowEllipsis(mockedState, isMorePagesMock, dispatchMock);
        await new Promise(resolve => setImmediate(resolve));
        expect(dispatchMock).toHaveBeenCalledTimes(2);
        expect(dispatchMock.mock.calls).toEqual([
            [
                {
                    payload: {
                        loading: true,
                        showEllipsis: true,
                    },
                    type: 'START_QUERY_FOR_MORE_API_PAGES',
                },
            ],
            [
                {
                    payload: {
                        loading: false,
                        showEllipsis: false,
                    },
                    type: 'END_QUERY_FOR_MORE_API_PAGES',
                },
            ],
        ]);
    });

    it('canShowEllipsis works if last page is not in range', () => {
        const dispatchMock = jest.fn();
        const isMorePagesMock = jest.fn(async () => true);
        const mockedState: any = {
            totalPages: 14,
            pagesToDisplay: ['11', '12', '13'],
            pageNeighbors: 1,
        };
        canShowEllipsis(mockedState, isMorePagesMock, dispatchMock);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock.mock.calls).toEqual([
            [
                {
                    payload: {
                        loading: false,
                        showEllipsis: false,
                    },
                    type: 'STOP_SHOWING_ELLIPSIS',
                },
            ],
        ]);
    });

    it('canShowEllipsis works if there is no pagination item room', () => {
        const dispatchMock = jest.fn();
        const isMorePagesMock = jest.fn(async () => true);
        const mockedState: any = {
            totalPages: 14,
            pagesToDisplay: ['12', '13', '14'],
            pageNeighbors: 1,
        };
        canShowEllipsis(mockedState, isMorePagesMock, dispatchMock);
        expect(dispatchMock).toHaveBeenCalledTimes(1);
        expect(dispatchMock.mock.calls).toEqual([
            [
                {
                    payload: {
                        loading: false,
                        showEllipsis: false,
                    },
                    type: 'STOP_SHOWING_ELLIPSIS',
                },
            ],
        ]);
    });
});

describe('src/components/pagination.bootstrapReducer', () => {
    it('invalid action type', () => {
        const initialState: any = {};
        const action: any = {
            type: 'UNKOWN_TYPE',
        };
        const response = bootstrapReducer(initialState, action);
        expect(response).toEqual({});
    });

    it('test ellipsis action type: start_query_for_more_api_pages', () => {
        const initialState: any = {};
        const action = {
            type: START_QUERY_FOR_MORE_API_PAGES,
            payload: {
                showEllipsis: false,
                loading: false,
            },
        };
        const response = bootstrapReducer(initialState, action);
        expect(response).toEqual({
            showEndingEllipsis: false,
            ellipsisIsLoading: false,
        });
    });

    it('test ellipsis action type: end_query_for_more_api_pages', () => {
        const initialState: any = {};
        const action = {
            type: END_QUERY_FOR_MORE_API_PAGES,
            payload: {
                showEllipsis: false,
                loading: false,
            },
        };
        const response = bootstrapReducer(initialState, action);
        expect(response).toEqual({
            showEndingEllipsis: false,
            ellipsisIsLoading: false,
        });
    });

    it('test ellipsis action type: stop_showing_ellipsis', () => {
        const initialState: any = {};
        const action = {
            type: STOP_SHOWING_ELLIPSIS,
            payload: {
                showEllipsis: false,
                loading: false,
            },
        };
        const response = bootstrapReducer(initialState, action);
        expect(response).toEqual({
            showEndingEllipsis: false,
            ellipsisIsLoading: false,
        });
    });

    it('adds pagesToDisplay correctly', () => {
        const initialState: any = {
            totalRecords: 720,
            pageNeighbors: 2,
            pageSize: 30,
            currentPage: 12,
            fetchPagesToDisplay,
            pagesToDisplay: [],
        };
        const action: any = {
            type: 'TO_PAGE',
            changes: {
                totalRecords: 720,
                pageNeighbors: 2,
                pageSize: 30,
                currentPage: 12,
                fetchPagesToDisplay,
            },
        };
        const response = bootstrapReducer(initialState, action);
        expect(response).toEqual({
            totalRecords: 720,
            pageNeighbors: 2,
            pageSize: 30,
            currentPage: 12,
            fetchPagesToDisplay,
            pagesToDisplay: ['10', '11', '12', '13', '14'],
        });
    });
});

describe('src/components/Pagination', () => {
    it('renders without crashing', () => {
        const props: any = {};
        shallow(<Pagination {...props} />);
    });

    it('works correctly', () => {
        const pageChangeHandlerMock = jest.fn();
        const isMoreApiPagesMock = jest.fn(async () => true);
        const fetchMoreApiDataMock = jest.fn(async () => {});
        const props: Props = {
            onPageChangeHandler: pageChangeHandlerMock,
            pageNeighbors: 2,
            pageSize: 30,
            totalRecords: 720,
            isThereMoreApiPages: isMoreApiPagesMock,
            fetchMoreApiData: fetchMoreApiDataMock,
        };
        const wrapper = mount(<Pagination {...props} />);
        wrapper.update();
        // pageChangeHandler should have been called on initial render
        expect(pageChangeHandlerMock.mock.calls).toEqual([[1, 30]]);

        // lets inspect the jsx produced
        let paginationItems = wrapper.find('PaginationItem');
        expect(paginationItems.length).toEqual(7);
        expect(wrapper.text()).toEqual('StartStartPreviousPrevious123NextNextLastLast');

        // lets see what effect clicking on pagination links has
        // lets go to the next page: simulate click on next
        paginationItems
            .at(5)
            .find('PaginationLink')
            .simulate('click');
        wrapper.update();
        paginationItems = wrapper.find('PaginationItem');
        expect(wrapper.text()).toEqual('StartStartPreviousPrevious1234NextNextLastLast');
        // has one more pagination item
        expect(paginationItems.length).toEqual(8);
        // page 2 is is now active
        expect(paginationItems.at(3).hasClass('active')).toBeTruthy();
    });
    it('ellipsis pagination link works correctly', async () => {
        const pageChangeHandlerMock = jest.fn();
        const isMoreApiPagesMock = jest.fn(async () => true);
        const fetchMoreApiDataMock = jest.fn(async () => {});
        const props: Props = {
            onPageChangeHandler: pageChangeHandlerMock,
            pageNeighbors: 2,
            pageSize: 30,
            totalRecords: 720,
            isThereMoreApiPages: isMoreApiPagesMock,
            fetchMoreApiData: fetchMoreApiDataMock,
        };
        const wrapper = mount(<Pagination {...props} />);
        wrapper.update();
        // is there more is called
        const paginationItems = wrapper.find('PaginationItem');
        paginationItems
            .at(6)
            .find('PaginationLink')
            .simulate('click');
        wrapper.update();
        expect(wrapper.text()).toEqual('StartStartPreviousPrevious222324LoadingNextNextLastLast');
        // resolve the is there more api pages promise
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
        expect(wrapper.text()).toEqual('StartStartPreviousPrevious222324. . .NextNextLastLast');

        // clicking on the ellipsis link will call fetch more data callback
        wrapper
            .find('PaginationItem')
            .at(5)
            .find('PaginationLink')
            .simulate('click');
        wrapper.update();
        expect(fetchMoreApiDataMock).toHaveBeenCalledTimes(1);
    });
});
