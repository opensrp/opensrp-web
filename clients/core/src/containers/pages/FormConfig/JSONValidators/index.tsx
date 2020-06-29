import React from 'react';
import { ConnectedManifestFilesList } from '@opensrp/form-config';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_FORMS_ENDPOINT,
    VALIDATOR_UPLOAD_TYPE,
    OPENSRP_FORM_METADATA_ENDPOINT,
    FIND_VALIDATOR_FILE,
    JSON_VALIDATOR_LABLE,
} from '../../../../constants';
import { defaultConfigProps } from '../helpers';

export const JSONValidatorListPage = () => {
    const JSONValidatorList = {
        ...defaultConfigProps,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        endpoint: OPENSRP_FORM_METADATA_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion: null,
        isJsonValidator: true,
        placeholder: FIND_VALIDATOR_FILE,
        uploadTypeUrl: VALIDATOR_UPLOAD_TYPE,
    };
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{JSON_VALIDATOR_LABLE}</h4>
            <ConnectedManifestFilesList {...JSONValidatorList} />
        </div>
    );
};
