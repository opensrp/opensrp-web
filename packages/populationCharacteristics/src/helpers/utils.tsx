import React, { MouseEvent } from 'react';
import { Setting } from '../ducks/settings';
import {
    DESCRIPTION_LABEL,
    EDIT_LABEL,
    INHERITED_FROM_LABEL,
    INHERIT_SETTING_LABEL,
    NAME_LABEL,
    NO_DATA_FOUND,
    PAGE_TITLE_LABEL,
    SEARCH_SETTINGS_LABEL,
    SETTINGS_LABEL,
    SET_TO_NO_LABEL,
    SET_TO_YES_LABEL,
} from '../constants';
import { EditSettingLabels } from './types';

interface PostData extends Partial<Setting> {
    _id: string;
    identifier: string;
}

/**
 *
 * @param {Setting} data
 * @param {boolean} value
 */
export const preparePutData = (data: Setting, value: string) => {
    const {
        description,
        key,
        label,
        locationId,
        providerId,
        uuid,
        settingIdentifier: identifier,
        settingMetadataId: _id,
        team,
        teamId,
        type,
        documentId,
    } = data;
    let postData: PostData = {
        _id,
        description,
        identifier,
        key,
        label,
        locationId,
        uuid,
        settingsId: documentId,
        type,
        value,
    };
    if (team) postData = { ...postData, team };
    if (teamId) postData = { ...postData, teamId };
    if (providerId) postData = { ...postData, providerId };
    return postData;
};

export const labels: EditSettingLabels = {
    descriptionLabel: DESCRIPTION_LABEL,
    editLabel: EDIT_LABEL,
    inheritedLable: INHERITED_FROM_LABEL,
    inheritSettingsLabel: INHERIT_SETTING_LABEL,
    nameLabel: NAME_LABEL,
    noDataFound: NO_DATA_FOUND,
    pageTitle: PAGE_TITLE_LABEL,
    placeholder: SEARCH_SETTINGS_LABEL,
    settingLabel: SETTINGS_LABEL,
    setToNoLabel: SET_TO_NO_LABEL,
    setToYesLabel: SET_TO_YES_LABEL,
};

/** format table data function props interface */
interface EditSettingsButtonProps {
    changeSetting: (event: MouseEvent<HTMLDivElement>, setting: Setting, value: string) => void;
    editLabel: string;
    inheritSettingsLabel: string;
    openEditModal: (event: MouseEvent<HTMLAnchorElement>, setting: Setting) => void;
    row: Setting;
    setToNoLabel: string;
    setToYesLabel: string;
    value: boolean;
}

export const EditSettingsButton = (props: EditSettingsButtonProps) => {
    const {
        editLabel,
        inheritSettingsLabel,
        value,
        setToYesLabel,
        setToNoLabel,
        row,
        openEditModal,
        changeSetting,
    } = props;
    return (
        <div className="popup" key={row.key}>
            <a href="#" onClick={e => openEditModal(e, row)}>
                {editLabel}
            </a>
            <div className={`popuptext ${row.editing ? 'show' : ''}`}>
                <div onClick={e => changeSetting(e, row, 'true')}>
                    <span className={value ? 'check' : 'empty-check'} />
                    <span>{setToYesLabel}</span>
                </div>
                <div onClick={e => changeSetting(e, row, 'false')}>
                    <span className={value ? 'empty-check' : 'check'} />
                    <span>{setToNoLabel}</span>
                </div>
                <div className="inherit-from">
                    <span className={row.inheritedFrom?.trim() ? 'check' : 'empty-check'} />
                    {inheritSettingsLabel}
                </div>
            </div>
        </div>
    );
};
