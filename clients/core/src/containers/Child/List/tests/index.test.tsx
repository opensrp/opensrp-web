import * as React from 'react';
import { mount, shallow } from 'enzyme';
import { ChildList } from '..';

describe('containers/child/List/ChildList', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const wrapper = mount(<ChildList />);
        expect(wrapper.length).toBe(1);
    });
});
