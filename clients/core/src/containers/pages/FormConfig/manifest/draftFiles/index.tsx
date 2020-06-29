import React from 'react';
import { ConnectedManifestDraftFiles } from '@opensrp/form-config';
import {
    MANIFEST_FILE_UPLOAD,
    VIEW_RELEASE_PAGE_URL,
    OPENSRP_FORM_METADATA_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    OPENSRP_MANIFEST_ENDPOINT,
    DRAFT_FILE_LABEL,
    FILE_UPLOAD_TYPE,
    DOWNLOAD_LABEL,
    FILE_NAME_LABEL,
    FILE_VERSION_LABEL,
    IDENTIFIER_LABEL,
    MAKE_RELEASE_LABEL,
    MODULE_LABEL,
    FIND_DRAFT_FILE_LABEL,
} from '../../../../../constants';
import { defaultConfigProps, drillDownProps } from '../../helpers';

/**simple wrapper for manifest file lists component */
export const ManifestDraftFiles = () => {
    const ManifestFilesListProps = {
        ...defaultConfigProps,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        downloadLabel: DOWNLOAD_LABEL,
        drillDownProps,
        endpoint: OPENSRP_FORM_METADATA_ENDPOINT,
        fileNameLabel: FILE_NAME_LABEL,
        fileVersionLabel: FILE_VERSION_LABEL,
        formUploadUrl: MANIFEST_FILE_UPLOAD,
        identifierLabel: IDENTIFIER_LABEL,
        makeReleaseLabel: MAKE_RELEASE_LABEL,
        manifestEndPoint: OPENSRP_MANIFEST_ENDPOINT,
        moduleLabel: MODULE_LABEL,
        placeholder: FIND_DRAFT_FILE_LABEL,
        releasesUrl: VIEW_RELEASE_PAGE_URL,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
    };

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{DRAFT_FILE_LABEL}</h4>
            <ConnectedManifestDraftFiles {...ManifestFilesListProps} />
        </div>
    );
};
