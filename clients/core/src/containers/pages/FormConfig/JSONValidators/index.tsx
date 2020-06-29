import React from 'react';
import { ConnectedManifestFilesList } from '@opensrp/form-config';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_FORMS_ENDPOINT,
    VALIDATOR_UPLOAD_TYPE,
    OPENSRP_FORM_METADATA_ENDPOINT,
    JSON_VALIDATOR_LABLE,
    DOWNLOAD_LABEL,
    EDIT_LABEL,
    FILE_NAME_LABEL,
    FILE_VERSION_LABEL,
    IDENTIFIER_LABEL,
    MODULE_LABEL,
    FIND_VALIDATOR_FILES,
    UPLOAD_EDIT_LABEL,
    UPOL0AD_FILE_LABEL,
} from '../../../../constants';
import { defaultConfigProps, drillDownProps } from '../helpers';
import Helmet from 'react-helmet';

export const JSONValidatorListPage = () => {
    const JSONValidatorList = {
        ...defaultConfigProps,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        downloadLabel: DOWNLOAD_LABEL,
        drillDownProps,
        editLabel: EDIT_LABEL,
        endpoint: OPENSRP_FORM_METADATA_ENDPOINT,
        fileNameLabel: FILE_NAME_LABEL,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        fileVersionLabel: FILE_VERSION_LABEL,
        formVersion: null,
        identifierLabel: IDENTIFIER_LABEL,
        isJsonValidator: true,
        moduleLabel: MODULE_LABEL,
        placeholder: FIND_VALIDATOR_FILES,
        uploadEditLabel: UPLOAD_EDIT_LABEL,
        uploadFileLabel: UPOL0AD_FILE_LABEL,
        uploadTypeUrl: VALIDATOR_UPLOAD_TYPE,
    };
    return (
        <div>
            <Helmet>
                <title>{JSON_VALIDATOR_LABLE}</title>
            </Helmet>
            <h3 className="household-title">{JSON_VALIDATOR_LABLE}</h3>
            <ConnectedManifestFilesList {...JSONValidatorList} />
        </div>
    );
};
