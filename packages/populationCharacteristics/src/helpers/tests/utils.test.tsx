import React from 'react';
import { mount, shallow } from 'enzyme';
import { preparePutData, EditSettingsButton } from '../utils';
import { allSettings } from '../../ducks/settings/tests/fixtures';
import { updateDate } from '../../components/EditSettings/tests/fixtures';
import { EDIT_LABEL } from '../../../../../clients/core/src/constants';
import { INHERIT_SETTING_LABEL, SET_TO_NO_LABEL, SET_TO_YES_LABEL } from '../../constants';
import toJson from 'enzyme-to-json';

const data = { ...allSettings[0] };
const output = {
    ...updateDate,
};

const mockFn = jest.fn();

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
    it('renders without crashing', () => {
        shallow(<EditSettingsButton {...editSettingsButtonProps} />);
    });

    it('renders correctly when value is false', () => {
        const wrapper = mount(<EditSettingsButton {...editSettingsButtonProps} />);

        expect(toJson(wrapper)).toMatchSnapshot('setting value false');
        // edit button works correctly
        const editButton = wrapper.find('.popup a').at(0);
        editButton.simulate('click');
        wrapper.update();
        expect(editSettingsButtonProps.openEditModal).toHaveBeenCalledTimes(1);
        expect(editSettingsButtonProps.openEditModal).toHaveBeenCalledWith(expect.any(Object), allSettings[0]);

        // true is not checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(0)
                .find('.check').length,
        ).toEqual(0);
        // false is checked
        expect(
            wrapper
                .find('.popuptext div')
                .at(1)
                .find('.check').length,
        ).toEqual(1);

        // can click set to Yes
        wrapper
            .find('.popuptext div')
            .at(0)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(expect.any(Object), allSettings[0], 'true');

        // Can click to set Inherit Setting
        wrapper
            .find('.popuptext div')
            .at(2)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(
            expect.any(Object),
            allSettings[0],
            'inherit',
        );

        wrapper.unmount();
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

        // can click set to No
        wrapper
            .find('.popuptext div')
            .at(1)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(expect.any(Object), allSettings[0], 'true');

        // Can click to set Inherit Setting
        wrapper
            .find('.popuptext div')
            .at(2)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(
            expect.any(Object),
            allSettings[0],
            'inherit',
        );
    });

    it('renders correcly when showInheritSettingsLabel is false', () => {
        const props = {
            ...editSettingsButtonProps,
            showInheritSettingsLabel: false,
        };
        const wrapper = mount(<EditSettingsButton {...props} />);
        expect(wrapper.find('.popuptext div').length).toBe(2);

        // The first one is the set to yes setting
        wrapper
            .find('.popuptext div')
            .at(0)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(expect.any(Object), allSettings[0], 'true');

        // The second one is the set to no setting
        wrapper
            .find('.popuptext div')
            .at(1)
            .simulate('click');
        expect(editSettingsButtonProps.changeSetting).toHaveBeenCalledWith(expect.any(Object), allSettings[0], 'false');
    });
});
