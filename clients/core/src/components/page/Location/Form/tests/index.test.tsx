import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { LocationForm, LocationFormProps } from '..';

describe('components/Location-form', () => {
    it('renders without crashing', () => {
        const props: LocationFormProps = {
            parentLocation: { value: '', label: 'All' },
            locationTag: { value: '', label: 'All' },
            name: '',
            description: '',
        };
        shallow(<LocationForm {...props} />);
    });

    it('renders the location component', () => {
        const props: LocationFormProps = {
            parentLocation: { value: '', label: 'All' },
            locationTag: { value: '', label: 'All' },
            name: '',
            description: '',
        };
        const wrapper = mount(<LocationForm {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
