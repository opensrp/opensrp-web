import React from 'react';
import { ConnectedManifestFilesList } from '@opensrp/form-config';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_MANIFEST_FORMS_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    FILE_UPLOAD_TYPE,
    RELEASE_FILE_LABEL,
} from '../../../../../constants';
import { generateOptions } from '../../../../../services/opensrp';
import { RouteParams } from '../../../../../helpers/utils';

/**simple wrapper for manifest file lists component */
export const ManifestFiles = (props: RouteComponentProps<RouteParams>) => {
    const formVersion = props.match.params.id || '';
    const manifestFilesListProps = {
        baseURL: OPENSRP_API_BASE_URL,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        endpoint: OPENSRP_MANIFEST_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion,
        getPayload: generateOptions,
        isJsonValidator: false,
        LoadingComponent: <Loading />,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
    };

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{RELEASE_FILE_LABEL}</h4>
            <ConnectedManifestFilesList {...manifestFilesListProps} />
        </div>
    );
};
