import React from 'react';
import ConnectedUploadConfigFile from '../../../../../formConfig/Manifest/UploadFile';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import { generateOptions } from '../../../../../services/opensrp';
import Loading from '../../../../../components/page/Loading';
import {
    OPENSRP_FORMS_ENDPOINT,
    VIEW_DRAFT_FILES_PAGE_URL,
    VALIDATOR_UPLOAD_TYPE,
    VIEW_JSON_VALIDATORS_PAGE_URL,
} from '../../../../../constants';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { RouteComponentProps } from 'react-router';

interface Pageprops {
    formId: string | null;
    isJsonValidator: boolean;
}

const UploadConfigFilePage = (props: Pageprops) => {
    const { formId, isJsonValidator } = props;

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

    const titleAction = formId ? 'Edit' : 'Upload';
    return (
        <div>
            <h4 style={{ marginBottom: '30px' }}>{titleAction} File</h4>
            <ConnectedUploadConfigFile {...uploadConfigFileProps} />
        </div>
    );
};

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const mapStateToProps = (_: Partial<Store>, ownProps: RouteComponentProps<any>): Pageprops => {
    const formId = ownProps.match.params.id || null;
    const isJsonValidator = ownProps.match.params.type === VALIDATOR_UPLOAD_TYPE;
    return {
        formId,
        isJsonValidator,
    };
};

/** Connected UploadConfigFilePage component */
const ConnectedUploadConfigFilePage = connect(mapStateToProps)(UploadConfigFilePage);

export default ConnectedUploadConfigFilePage;
