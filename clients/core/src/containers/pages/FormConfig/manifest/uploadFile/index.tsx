import React from 'react';
import ConnectedUploadConfigFile from '../../../../../formConfig/Manifest/UploadFile';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import { generateOptions } from '../../../../../services/opensrp';
import Loading from '../../../../../components/page/Loading';
import { MANIFEST_FILE_UPLOAD, OPENSRP_FORMS_ENDPOINT, VIEW_DRAFT_FILES_PAGE_URL } from '../../../../../constants';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { RouteComponentProps } from 'react-router';

interface Pageprops {
    formVersion: string | null;
}

const UploadConfigFilePage = (props: Pageprops) => {
    const { formVersion } = props;

    const uploadConfigFileProps = {
        baseURL: OPENSRP_API_BASE_URL,
        draftFilesUrl: VIEW_DRAFT_FILES_PAGE_URL,
        endpoint: OPENSRP_FORMS_ENDPOINT,
        formVersion,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
    };

    const titleAction = formVersion ? 'Edit' : 'Upload';
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
    const formVersion = ownProps.match.params.id || null;
    return {
        formVersion,
    };
};

/** Connected UploadConfigFilePage component */
const ConnectedUploadConfigFilePage = connect(mapStateToProps)(UploadConfigFilePage);

export default ConnectedUploadConfigFilePage;
