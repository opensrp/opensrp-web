import React from 'react';
import { mount, shallow } from 'enzyme';
import { preparePutData, EditSettingsButton } from '../utils';
import { allSettings, setting3, setting4 } from '../../ducks/settings/tests/fixtures';
import { updateDate } from '../../components/EditSettings/tests/fixtures';
import { EDIT_LABEL } from '../../../../../clients/core/src/constants';
import { INHERIT_SETTING_LABEL, SET_TO_NO_LABEL, SET_TO_YES_LABEL } from '../../constants';
import toJson from 'enzyme-to-json';

const data = { ...allSettings[0] };
const output = {
    ...updateDate,
};

const mockFn = jest.fn();

describe('helpers/utils: preparePutData', () => {
    it('preparePutData', () => {
        const teamData = {
            team: 'demo',
            teamId: '123',
        };
        expect(preparePutData(data, 'true')).toEqual(output);

        // with teams
        expect(preparePutData({ ...data, ...teamData }, 'true')).toEqual({ ...output, ...teamData });

        // with providerId
        expect(preparePutData({ ...data, providerId: '12' }, 'true')).toEqual({ ...output, providerId: '12' });
    });
});

describe('helpers/utils: EditSettingsButton', () => {
    const editSettingsButtonProps = {
        changeSetting: mockFn,
        editLabel: EDIT_LABEL,
        inheritSettingsLabel: INHERIT_SETTING_LABEL,
        openEditModal: mockFn,
        row: allSettings[0],
        setToNoLabel: SET_TO_NO_LABEL,
        setToYesLabel: SET_TO_YES_LABEL,
        value: false,
        showInheritSettingsLabel: true,
    };

    afterEach(() => {
        jest.clearAllMocks();
        jest.resetAllMocks();
        jest.restoreAllMocks();
    });

    it('renders without crashing', () => {
        shallow(<EditSettingsButton {...editSettingsButtonProps} />);
    });

    it('renders correctly', () => {
        const wrapper = shallow(<EditSettingsButton {...editSettingsButtonProps} />);
        expect(toJson(wrapper)).toMatchSnapshot();
    });

    it('handles click Set to Yes', () => {
        const wrapper = mount(<EditSettingsButton {...editSettingsButtonProps} />);
        const editButton = wrapper.find('.popup a').at(0);
        editButton.simulate('click');
        wrapper.update();
        wrapper
            .find('.popuptext div')
            .at(0)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(
            expect.any(Object),
            editSettingsButtonProps.row,
            'true',
        );
    });

    it('handles click Set to No', () => {
        const wrapper = mount(<EditSettingsButton {...editSettingsButtonProps} />);
        const editButton = wrapper.find('.popup a').at(0);
        editButton.simulate('click');
        wrapper.update();
        wrapper
            .find('.popuptext div')
            .at(1)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(
            expect.any(Object),
            editSettingsButtonProps.row,
            'false',
        );
    });

    it('hanldes click Inherit Setting', () => {
        const wrapper = mount(<EditSettingsButton {...editSettingsButtonProps} />);
        const editButton = wrapper.find('.popup a').at(0);
        editButton.simulate('click');
        wrapper.update();
        wrapper
            .find('.popuptext div')
            .at(2)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(
            expect.any(Object),
            editSettingsButtonProps.row,
            'inherit',
        );
    });

    it('renders correctly when value is true', () => {
        const props = {
            ...editSettingsButtonProps,
            row: allSettings[1],
            value: true,
        };
        const wrapper = mount(<EditSettingsButton {...props} />);

        // edit button works correctly
        const editButton = wrapper.find('.popup a').at(0);
        editButton.simulate('click');
        wrapper.update();
        // true is checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(0)
                .find('.check').length,
        ).toEqual(1);
        // false is not checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(1)
                .find('.check').length,
        ).toEqual(0);

        // inherit is not checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(2)
                .find('.check').length,
        ).toEqual(0);
    });

    it('renders correcly when showInheritSettingsLabel is false', () => {
        const props = {
            ...editSettingsButtonProps,
            showInheritSettingsLabel: false,
        };
        const wrapper = mount(<EditSettingsButton {...props} />);
        expect(wrapper.find('.popuptext div').length).toBe(2);
        expect(
            wrapper
                .find('.popuptext div')
                .at(0)
                .find('span')
                .at(1)
                .text(),
        ).toEqual("Set to 'Yes'");
        expect(
            wrapper
                .find('.popuptext div')
                .at(1)
                .find('span')
                .at(1)
                .text(),
        ).toEqual("Set to 'No'");
    });

    it('renders correctly for inherited setting', () => {
        const props = {
            ...editSettingsButtonProps,
            row: setting3,
        };
        const wrapper = mount(<EditSettingsButton {...props} />);
        // true is not checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(0)
                .find('.check').length,
        ).toEqual(0);
        // false is not checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(1)
                .find('.check').length,
        ).toEqual(0);
        // inherit is checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(2)
                .find('.check').length,
        ).toEqual(1);
    });

    it('renders correctly if setting editing is true', () => {
        const props = {
            ...editSettingsButtonProps,
            row: setting4,
        };
        const wrapper = mount(<EditSettingsButton {...props} />);
        expect(
            wrapper
                .find('div')
                .at(1)
                .prop('className'),
        ).toEqual('popuptext show');
    });
});
