import React from 'react';
import { ConnectedUploadConfigFile } from '@opensrp/form-config';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import { generateOptions } from '../../../../../services/opensrp';
import Loading from '../../../../../components/page/Loading';
import {
    OPENSRP_FORMS_ENDPOINT,
    VIEW_DRAFT_FILES_PAGE_URL,
    VALIDATOR_UPLOAD_TYPE,
    VIEW_JSON_VALIDATORS_PAGE_URL,
    EDIT_FILE_LABEL,
    UPLOAD_FILE_LABLE,
} from '../../../../../constants';
import { RouteComponentProps } from 'react-router';
import { RouteParams } from '../../../../../helpers/utils';

export const UploadConfigFilePage = (props: RouteComponentProps<RouteParams>) => {
    const formId = props.match.params.id || null;
    const isJsonValidator = props.match.params.type === VALIDATOR_UPLOAD_TYPE;

    const uploadConfigFileProps = {
        baseURL: OPENSRP_API_BASE_URL,
        draftFilesUrl: VIEW_DRAFT_FILES_PAGE_URL,
        endpoint: OPENSRP_FORMS_ENDPOINT,
        formId,
        isJsonValidator,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
        validatorsUrl: VIEW_JSON_VALIDATORS_PAGE_URL,
    };

    const titleAction = formId ? EDIT_FILE_LABEL : UPLOAD_FILE_LABLE;
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{titleAction}</h4>
            <ConnectedUploadConfigFile {...uploadConfigFileProps} />
        </div>
    );
};
