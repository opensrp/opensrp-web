import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import InfoCard, { InfoCardProps } from '..';

describe('components/InfoCard', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('renders without crashing', () => {
        const props: InfoCardProps = {
            title: 'Basic information',
            children: <></>,
        };
        shallow(<InfoCard {...props} />);
    });
    it('renders the InfoCard component', () => {
        const props: InfoCardProps = {
            title: 'Basic information',
            children: <></>,
        };
        const wrapper = mount(<InfoCard {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
