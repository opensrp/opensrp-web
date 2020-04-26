import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import RegisterPanel, { RegisterPanelProps } from '..';
import * as fixtures from '../../../../store/ducks/tests/fixtures';

describe('components/RegisterPanel', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });
    it('renders without crashing', () => {
        const props: RegisterPanelProps = {
            registerData: fixtures.registerData,
            client: fixtures.client1,
            tabs: ['child-health'],
        };
        shallow(<RegisterPanel {...props} />);
    });
    it('renders the InfoCard component', () => {
        const props: RegisterPanelProps = {
            registerData: fixtures.registerData,
            client: fixtures.client1,
            tabs: ['child-health'],
        };
        const wrapper = mount(<RegisterPanel {...props} />);
        expect(toJson(wrapper)).toMatchSnapshot();
        wrapper.unmount();
    });
});
