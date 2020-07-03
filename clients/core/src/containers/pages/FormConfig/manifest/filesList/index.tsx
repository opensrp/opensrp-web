import React from 'react';
import { ConnectedManifestFilesList } from '@opensrp/form-config';
import { RouteComponentProps } from 'react-router';
import {
    MANIFEST_FILE_UPLOAD,
    OPENSRP_MANIFEST_FORMS_ENDPOINT,
    OPENSRP_FORMS_ENDPOINT,
    FILE_UPLOAD_TYPE,
    RELEASE_FILE_LABEL,
    MODULE_LABEL,
    DOWNLOAD_LABEL,
    EDIT_LABEL,
    FILE_NAME_LABEL,
    FILE_VERSION_LABEL,
    IDENTIFIER_LABEL,
    FIND_RELEASE_FILES,
    UPLOAD_EDIT_LABEL,
    UPOL0AD_FILE_LABEL,
} from '../../../../../constants';
import { RouteParams } from '../../../../../helpers/utils';
import { defaultConfigProps, drillDownProps } from '../../helpers';
import Helmet from 'react-helmet';

/**simple wrapper for manifest file lists component */
export const ManifestFiles = (props: RouteComponentProps<RouteParams>) => {
    const formVersion = props.match.params.id || '';
    const manifestFilesListProps = {
        ...defaultConfigProps,
        downloadEndPoint: OPENSRP_FORMS_ENDPOINT,
        downloadLabel: DOWNLOAD_LABEL,
        drillDownProps,
        editLabel: EDIT_LABEL,
        endpoint: OPENSRP_MANIFEST_FORMS_ENDPOINT,
        fileNameLabel: FILE_NAME_LABEL,
        fileUploadUrl: MANIFEST_FILE_UPLOAD,
        fileVersionLabel: FILE_VERSION_LABEL,
        formVersion,
        identifierLabel: IDENTIFIER_LABEL,
        isJsonValidator: false,
        moduleLabel: MODULE_LABEL,
        placeholder: FIND_RELEASE_FILES,
        uploadEditLabel: UPLOAD_EDIT_LABEL,
        uploadFileLabel: UPOL0AD_FILE_LABEL,
        uploadTypeUrl: FILE_UPLOAD_TYPE,
    };

    return (
        <div>
            <Helmet>
                <title>{`${RELEASE_FILE_LABEL}: ${formVersion}`}</title>
            </Helmet>
            <h3 className="page-title">{`${RELEASE_FILE_LABEL}: ${formVersion}`}</h3>
            <ConnectedManifestFilesList {...manifestFilesListProps} />
        </div>
    );
};
