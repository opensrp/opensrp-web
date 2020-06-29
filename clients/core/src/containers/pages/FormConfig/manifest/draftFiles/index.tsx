import React from 'react';
import { ConnectedManifestDraftFiles } from '@opensrp/form-config';
import {
    MANIFEST_FILE_UPLOAD,
    VIEW_RELEASE_PAGE_URL,
    OPENSRP_FORM_METADATA_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    OPENSRP_MANIFEST_ENDPOINT,
    DRAFT_FILE_LABEL,
} from '../../../../../constants';
import { generateOptions } from '../../../../../services/opensrp';
import { defaultConfigProps } from '../../helpers';

/**simple wrapper for manifest file lists component */
export const ManifestDraftFiles = () => {
    const ManifestFilesListProps = {
        ...defaultConfigProps,
        endpoint: OPENSRP_FORM_METADATA_ENDPOINT,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
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
