import React from 'react';
import { OPENSRP_API_BASE_URL } from '../../../../configs/env';
import Loading from '../../../../components/page/Loading';
import { MANIFEST_FILE_UPLOAD, OPENSRP_FORMS_ENDPOINT } from '../../../../constants';
import { generateOptions } from '../../../../services/opensrp';
import ConnectedManifestFilesList from '../../../../formConfig/Manifest/FilesList';

export const JSONValidatorListPage = () => {
    const JSONValidatorList = {
        baseURL: OPENSRP_API_BASE_URL,
        endpoint: OPENSRP_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion: null,
        getPayload: generateOptions,
        isJsonValidator: true,
        LoadingComponent: <Loading />,
        placeholder: 'Find Validator File',
    };
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}> JSON Validators</h4>
            <ConnectedManifestFilesList {...JSONValidatorList} />
        </div>
    );
};
