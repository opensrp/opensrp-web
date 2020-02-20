import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Dropdown, { DropdownProps } from '..';

describe('components/page/CustomDropdown', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const callBackMock = jest.fn();
        const props: DropdownProps = {
            selectCallBack: callBackMock,
            placeholder: 'Select',
            dropdownOptions: [],
        };
        const component = shallow(<Dropdown {...props} />);
        const wrapper = component.find('#custom-dropdown');
        expect(toJson(wrapper)).toMatchSnapshot('StateManager');
        expect(wrapper.length).toBe(1);
    });

    it('invokes callback correctly', () => {
        const callBackMock = jest.fn();
        const props: DropdownProps = {
            selectCallBack: callBackMock,
            placeholder: 'Select',
            dropdownOptions: [],
        };
        const wrapper = mount(<Dropdown {...props} />);
        expect(callBackMock).toHaveBeenCalledTimes(0);
        wrapper
            .find('Select')
            .instance()
            .selectOption({ label: 'Male', value: 'Male' });

        expect(callBackMock).toHaveBeenCalledTimes(1);
        expect(callBackMock).toHaveBeenCalledWith('Male');
    });
});
