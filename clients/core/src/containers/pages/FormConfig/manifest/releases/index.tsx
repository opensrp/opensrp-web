import React from 'react';
import { ConnectedManifestReleases } from '@opensrp/form-config';
import {
    OPENSRP_MANIFEST_ENDPOINT,
    VIEW_RELEASE_PAGE_URL,
    MANIFEST_FILE_UPLOAD,
    FILE_UPLOAD_TYPE,
    RELEASES_LABEL,
    FIND_RELEASE_FILES,
    APP_ID_LABEL,
    APP_VERSION_LABEL,
    IDENTIFIER_LABEL,
    UPOL0AD_FILE_LABEL,
    VIEW_FILES_LABEL,
} from '../../../../../constants';
import { defaultConfigProps, drillDownProps } from '../../helpers';

export const ManifestReleasesPage = () => {
    const manifestReleasesProps = {
        ...defaultConfigProps,
        appIdLabel: APP_ID_LABEL,
        appVersionLabel: APP_VERSION_LABEL,
        drillDownProps,
        currentUrl: VIEW_RELEASE_PAGE_URL,
        endpoint: OPENSRP_MANIFEST_ENDPOINT,
        formUploadUrl: MANIFEST_FILE_UPLOAD,
        identifierLabel: IDENTIFIER_LABEL,
        placeholder: FIND_RELEASE_FILES,
        uploadFileLabel: UPOL0AD_FILE_LABEL,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
        viewFilesLabel: VIEW_FILES_LABEL,
    };
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{RELEASES_LABEL}</h4>
            <ConnectedManifestReleases {...manifestReleasesProps} />
        </div>
    );
};
