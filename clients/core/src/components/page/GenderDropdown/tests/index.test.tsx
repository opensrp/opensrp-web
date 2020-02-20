import { shallow, mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import GenderDropdown, { GenderDropdownProps } from '..';

describe('components/page/GenderDropdown', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('renders without crashing', () => {
        const callBackMock = jest.fn();
        const props: GenderDropdownProps = {
            selectCallBack: callBackMock,
        };
        const component = shallow(<GenderDropdown {...props} />);
        const wrapper = component.find('#gender-dropdown');
        expect(toJson(wrapper)).toMatchSnapshot('StateManager');
        expect(wrapper.length).toBe(1);
    });

    it('invokes callback correctly', () => {
        const callBackMock = jest.fn();
        const props: GenderDropdownProps = {
            selectCallBack: callBackMock,
        };
        const wrapper = mount(<GenderDropdown {...props} />);
        expect(callBackMock).toHaveBeenCalledTimes(0);
        wrapper
            .find('Select')
            .instance()
            .selectOption({ label: 'Male', value: 'Male' });

        expect(callBackMock).toHaveBeenCalledTimes(1);
        expect(callBackMock).toHaveBeenCalledWith('Male');
    });
});
