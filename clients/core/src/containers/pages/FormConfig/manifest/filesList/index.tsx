import React from 'react';
import { ConnectedManifestFilesList } from '@opensrp/form-config';
import { RouteComponentProps } from 'react-router';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_MANIFEST_FORMS_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    FILE_UPLOAD_TYPE,
    RELEASE_FILE_LABEL,
} from '../../../../../constants';
import { RouteParams } from '../../../../../helpers/utils';
import { defaultConfigProps } from '../../helpers';

/**simple wrapper for manifest file lists component */
export const ManifestFiles = (props: RouteComponentProps<RouteParams>) => {
    const formVersion = props.match.params.id || '';
    const manifestFilesListProps = {
        ...defaultConfigProps,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        endpoint: OPENSRP_MANIFEST_FORMS_ENDPOINT,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        formVersion,
        isJsonValidator: false,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
    };

    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{RELEASE_FILE_LABEL}</h4>
            <ConnectedManifestFilesList {...manifestFilesListProps} />
        </div>
    );
};
