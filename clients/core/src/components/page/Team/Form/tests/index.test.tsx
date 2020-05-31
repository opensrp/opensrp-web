import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { TeamForm, TeamFormProps } from '..';

describe('components/TeamForm', () => {
    it('renders without crashing', () => {
        const props: TeamFormProps = {
            id: 0,
            identifier: '',
            description: '',
            active: true,
            name: '',
            partOf: { label: '', value: '' },
        };
        shallow(<TeamForm {...props} />);
    });

    it('renders the Loading component', () => {
        const props: TeamFormProps = {
            id: 0,
            identifier: '',
            description: '',
            active: true,
            name: '',
            partOf: { label: '', value: '' },
        };
        const wrapper = mount(<TeamForm {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });

    it('submit the form with values', async () => {
        const props: TeamFormProps = {
            id: 0,
            identifier: '',
            description: '',
            active: true,
            name: '',
            partOf: { label: '', value: '' },
        };
        const wrapper = mount(<TeamForm {...props} />);
        const submitBtn = wrapper.find('.submit-btn-bg');
        expect(submitBtn.length).toEqual(1);

        submitBtn.simulate('click');
    });
});
