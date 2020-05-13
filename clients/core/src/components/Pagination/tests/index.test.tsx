/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react';
import { Props, Pagination } from '..';
import { shallow, mount } from 'enzyme';

describe('src/components/pagination', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
});

describe('src/components/Pagination', () => {
    it('renders without crashing', () => {
        const props: any = {};
        shallow(<Pagination {...props} />);
    });

    it('works correctly', () => {
        const pageChangeHandlerMock = jest.fn();
        const props: Props = {
            onPageChangeHandler: pageChangeHandlerMock,
            pageNeighbors: 2,
            pageSize: 30,
            totalRecords: 720,
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
});
