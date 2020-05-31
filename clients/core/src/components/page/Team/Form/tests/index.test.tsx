import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { TeamForm, TeamFormProps } from '..';
import * as fixtures from '../../../../../store/ducks/tests/fixtures';

describe('components/TeamForm', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let classMock: any;
    beforeEach(() => {
        jest.resetAllMocks();

        const listMock = jest.fn(async () => {
            return fixtures.teamList;
        });
        classMock = jest.fn(() => ({
            list: listMock,
        }));
    });

    it('renders without crashing', () => {
        const props: TeamFormProps = {
            id: 0,
            identifier: '',
            description: '',
            active: true,
            name: '',
            partOf: { label: '', value: '' },
            opensrpService: classMock,
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
            opensrpService: classMock,
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
            opensrpService: classMock,
        };
        const wrapper = mount(<TeamForm {...props} />);
        const submitBtn = wrapper.find('.submit-btn-bg');
        expect(submitBtn.length).toEqual(1);

        submitBtn.simulate('click');
        await new Promise(resolve => setImmediate(resolve));
        wrapper.update();
    });
});
