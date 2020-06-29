import React from 'react';
import { OPENSRP_API_BASE_URL } from '../../../configs/env';
import Loading from '../../../components/page/Loading';
import { generateOptions } from '../../../services/opensrp';

/** drill down props */
export const drillDownProps = {
    paginate: false,
};

export const defaultConfigProps = {
    LoadingComponent: <Loading />,
    baseURL: OPENSRP_API_BASE_URL,
    getPayload: generateOptions,
};
