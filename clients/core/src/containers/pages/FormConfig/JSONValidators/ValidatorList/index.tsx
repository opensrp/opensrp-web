import React from 'react';
import { OPENSRP_API_BASE_URL } from '../../../../../configs/env';
import Loading from '../../../../../components/page/Loading';
import { OPENSRP_MANIFEST_ENDPOINT, VIEW_RELEASE_PAGE_URL } from '../../../../../constants';
import { generateOptions } from '../../../../../services/opensrp';
import ConnectedJSONValidatorList from '../../../../../formConfig/JSONValidator/validatorList';

export const JSONValidatorListPage = () => {
    const JSONValidatorList = {
        baseURL: OPENSRP_API_BASE_URL,
        currentUrl: VIEW_RELEASE_PAGE_URL,
        endpoint: OPENSRP_MANIFEST_ENDPOINT,
        getPayload: generateOptions,
        LoadingComponent: <Loading />,
    };
    return <ConnectedJSONValidatorList {...JSONValidatorList} />;
};
