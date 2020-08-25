import React, { MouseEvent, useEffect, useRef } from 'react';
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
    ACTION_LABEL,
    SETTINGS_INHERIT,
    SETTINGS_FALSE,
    SETTINGS_TRUE,
} from '../constants';
import { EditSettingLabels, SettingValue } from './types';
import { Event } from 'react-toastify/dist/core';

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
    actionLabel: ACTION_LABEL,
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
    changeSetting: (event: MouseEvent<HTMLDivElement>, setting: Setting, value: SettingValue) => void;
    editLabel: string;
    inheritSettingsLabel: string;
    openEditModal: (event: MouseEvent<HTMLAnchorElement>, setting: Setting) => void;
    row: Setting;
    setToNoLabel: string;
    setToYesLabel: string;
    value: boolean;
    showInheritSettingsLabel: boolean;
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
        showInheritSettingsLabel,
    } = props;
    const wrapperRef = useRef<HTMLDivElement>(null);

    /** We listen for clicks outside the pop and close if user clicks outside pop */
    useEffect(() => {
        if (row.editing) {
            const handleClickOutside = (event: any) => {
                if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                    openEditModal(event, row);
                }
            };

            // Bind the event listener
            document.addEventListener('mousedown', handleClickOutside);
            return () => {
                // Unbind the event listener on clean up
                document.removeEventListener('mousedown', handleClickOutside);
            };
        }
    }, [row.editing]);

    return (
        <div className="popup" key={row.key}>
            <a href="#" onClick={e => openEditModal(e, row)}>
                {editLabel}
            </a>
            <div ref={wrapperRef} className={`popuptext ${row.editing ? 'show' : ''}`}>
                <div onClick={e => changeSetting(e, row, SETTINGS_TRUE)}>
                    <span className={value && !row.inheritedFrom ? 'check' : 'empty-check'} />
                    <span>{setToYesLabel}</span>
                </div>
                <div onClick={e => changeSetting(e, row, SETTINGS_FALSE)}>
                    <span className={value || row.inheritedFrom ? 'empty-check' : 'check'} />
                    <span>{setToNoLabel}</span>
                </div>
                {showInheritSettingsLabel && (
                    <div onClick={e => changeSetting(e, row, SETTINGS_INHERIT)} className="inherit-from">
                        <span className={row.inheritedFrom?.trim() ? 'check' : 'empty-check'} />
                        <span>{inheritSettingsLabel}</span>
                    </div>
                )}
            </div>
        </div>
    );
};
