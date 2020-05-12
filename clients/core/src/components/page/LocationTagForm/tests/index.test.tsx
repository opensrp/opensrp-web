// test ExportModal
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import LocationTagForm from '..';

describe('components/Location-tag-form', () => {
    it('renders without crashing', () => {
        const props: LocationTagForm = {
            name: '',
            description: '',
            active: false,
        };
        shallow(<LocationTagForm {...props} />);
    });

    it('renders the Loading component', () => {
        const props: LocationTagForm = {
            name: '',
            description: '',
            active: false,
        };
        const wrapper = mount(<LocationTagForm {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
