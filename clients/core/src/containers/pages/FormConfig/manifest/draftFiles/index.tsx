import React from 'react';
import { ConnectedManifestDraftFiles } from '@opensrp/form-config';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import {
    MANIFEST_FILE_UPLOAD,
    VIEW_RELEASE_PAGE_URL,
    OPENSRP_FORM_METADATA_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    OPENSRP_MANIFEST_ENDPOINT,
    DRAFT_FILE_LABEL,
} from '../../../../../constants';
import { generateOptions } from '../../../../../services/opensrp';

/**simple wrapper for manifest file lists component */
export const ManifestDraftFiles = () => {
    const ManifestFilesListProps = {
        baseURL: OPENSRP_API_BASE_URL,
        endpoint: OPENSRP_FORM_METADATA_ENDPOINT,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
        manifestEndPoint: OPENSRP_MANIFEST_ENDPOINT,
        releasesUrl: VIEW_RELEASE_PAGE_URL,
    };

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{DRAFT_FILE_LABEL}</h4>
            <ConnectedManifestDraftFiles {...ManifestFilesListProps} />
        </div>
    );
};
