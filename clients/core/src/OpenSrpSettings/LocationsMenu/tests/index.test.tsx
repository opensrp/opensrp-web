import React from 'react';
import { mount, shallow } from 'enzyme';
import _ from 'lodash';
import { LocationMenu } from '..';
import { locHierarchy } from '../../ducks/locations/tests/fixtures';
import toJson from 'enzyme-to-json';

const props = {
    activeLocationId: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
    isLast: true,
    loadLocsettings: jest.fn(),
    locationDetails: locHierarchy.locationsHierarchy.map['75af7700-a6f2-448c-a17d-816261a7749a'],
    popLocPopup: jest.fn(),
    showLocPopUp: '',
};

describe('components/LocationsMenu', () => {
    it('renders without crashing', () => {
        shallow(<LocationMenu {...props} />);
    });

    it('render menu correctly', () => {
        const wrapper = mount(<LocationMenu {...props} />);

        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.find('.locations').simulate('click');
        expect(props.popLocPopup).toHaveBeenCalledWith(expect.any(Object), '75af7700-a6f2-448c-a17d-816261a7749a');
        wrapper.find('.popuptext div').simulate('click');
        expect(props.loadLocsettings).toHaveBeenCalledWith(expect.any(Object), '8400d475-3187-46e4-8980-7c6f0a243495');
        wrapper.unmount();
    });

    it('renders coreectly with popup id', () => {
        const newProps = {
            ...props,
            isLast: false,
            showLocPopUp: '02ebbc84-5e29-4cd5-9b79-c594058923e9',
        };
        const wrapper = mount(<LocationMenu {...newProps} />);

        expect(toJson(wrapper.find('.locations'))).toMatchSnapshot('location');
        expect(toJson(wrapper.find('.popup'))).toMatchSnapshot('popup');
        wrapper.find('.locations').simulate('click');
        expect(props.popLocPopup).toHaveBeenCalledWith(expect.any(Object), '75af7700-a6f2-448c-a17d-816261a7749a');
        wrapper.find('.popuptext div').simulate('click');
        expect(props.loadLocsettings).toHaveBeenCalledWith(expect.any(Object), '8400d475-3187-46e4-8980-7c6f0a243495');
        wrapper.unmount();
    });
});
