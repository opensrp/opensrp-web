import React from 'react';
import { ConnectedUploadConfigFile } from '@opensrp/form-config';
import {
    OPENSRP_FORMS_ENDPOINT,
    VIEW_DRAFT_FILES_PAGE_URL,
    VALIDATOR_UPLOAD_TYPE,
    VIEW_JSON_VALIDATORS_PAGE_URL,
    EDIT_FILE_LABEL,
    UPLOAD_FILE_LABLE,
    FILE_NAME_LABEL,
    FILE_UPLOAD_LABEL,
    FORM_NAME_REQUIRED_LABEL,
    FORM_REQUIRED_LABEL,
    MODULE_LABEL,
    RELATED_TO_LABEL,
} from '../../../../../constants';
import { RouteComponentProps } from 'react-router';
import { RouteParams } from '../../../../../helpers/utils';
import { defaultConfigProps } from '../../helpers';

export const UploadConfigFilePage = (props: RouteComponentProps<RouteParams>) => {
    const formId = props.match.params.id || null;
    const isJsonValidator = props.match.params.type === VALIDATOR_UPLOAD_TYPE;

    const uploadConfigFileProps = {
        ...defaultConfigProps,
        draftFilesUrl: VIEW_DRAFT_FILES_PAGE_URL,
        endpoint: OPENSRP_FORMS_ENDPOINT,
        fileNameLabel: FILE_NAME_LABEL,
        fileUploadLabel: FILE_UPLOAD_LABEL,
        formId,
        formNameRequiredLable: FORM_NAME_REQUIRED_LABEL,
        formRequiredLabel: FORM_REQUIRED_LABEL,
        isJsonValidator,
        moduleLabel: MODULE_LABEL,
        relatedToLabel: RELATED_TO_LABEL,
        validatorsUrl: VIEW_JSON_VALIDATORS_PAGE_URL,
    };

    const titleAction = formId ? EDIT_FILE_LABEL : UPLOAD_FILE_LABLE;
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{titleAction}</h4>
            <ConnectedUploadConfigFile {...uploadConfigFileProps} />
        </div>
    );
};
