import React from 'react';
import { shallow, mount } from 'enzyme';
import { BootstrapJSX } from '../JSX';

describe('src/components/pagination/bootsrapJSX', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    xit('renders without crashing', () => {
        const genericMock = jest.fn();
        const props = {
            paginationState: {
                ellipsisIsLoading: false,
                showEndingEllipsis: false,
                currentPage: 4,
                pagesToDisplay: ['2', '3', '4', '5', '6'],
            },
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
            fetchMoreApiData: genericMock,
        };
        shallow(<BootstrapJSX {...props} />);
    });

    xit('renders correctly', () => {
        const genericMock = jest.fn();
        const props = {
            paginationState: {
                ellipsisIsLoading: false,
                showEndingEllipsis: false,
                currentPage: 4,
                pagesToDisplay: ['2', '3', '4', '5', '6'],
            },
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
            fetchMoreApiData: genericMock,
        };
        const wrapper = mount(<BootstrapJSX {...props} />);
        expect(wrapper.text()).toEqual('');
    });

    xit('pagination items invokes the correct callbacks', () => {
        const genericMock = jest.fn();
        const props = {
            paginationState: {
                ellipsisIsLoading: false,
                showEndingEllipsis: false,
                currentPage: 4,
            },
            nextPage: genericMock,
            firstPage: genericMock,
            lastPage: genericMock,
            goToPage: genericMock,
            previousPage: genericMock,
            canNextPage: true,
            canPreviousPage: true,
            fetchMoreApiData: genericMock,
        };
        shallow(<BootstrapJSX {...props} />);
    });
});
