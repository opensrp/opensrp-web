import React from 'react';
import { ConnectedManifestReleases } from '@opensrp/form-config';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import {
    OPENSRP_MANIFEST_ENDPOINT,
    VIEW_RELEASE_PAGE_URL,
    MANIFEST_FILE_UPLOAD,
    FILE_UPLOAD_TYPE,
    RELEASES_LABEL,
} from '../../../../../constants';
import { generateOptions } from '../../../../../services/opensrp';

export const ManifestReleasesPage = () => {
    const manifestReleasesProps = {
        baseURL: OPENSRP_API_BASE_URL,
        currentUrl: VIEW_RELEASE_PAGE_URL,
        endpoint: OPENSRP_MANIFEST_ENDPOINT,
        formUploadUrl: MANIFEST_FILE_UPLOAD,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
    };
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{RELEASES_LABEL}</h4>
            <ConnectedManifestReleases {...manifestReleasesProps} />
        </div>
    );
};
