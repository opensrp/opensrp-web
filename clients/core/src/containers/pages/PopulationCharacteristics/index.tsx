import React from 'react';
import { ConnectedEditSetings } from '../../../OpenSrpSettings/EditSettings';
import { OPENSRP_API_BASE_URL } from '../../../configs/env';
import Loading from '../../../components/page/Loading';
import { generateOptions } from '../../../services/opensrp';
import { SETTINGS_ENDPOINT, LOCATIONS_ENDPOINT, SECURITY_AUTHENTICATE_ENDPOINT } from '../../../constants';

export const EditSetingsPage = () => {
    const baseURL = OPENSRP_API_BASE_URL.replace('rest/', '');

    const settingsProps = {
        LoadingComponent: <Loading />,
        baseURL,
        getPayload: generateOptions,
        locationsEndpoint: LOCATIONS_ENDPOINT,
        restBaseURL: OPENSRP_API_BASE_URL,
        secAuthEndpoint: SECURITY_AUTHENTICATE_ENDPOINT,
        settingsEndpoint: SETTINGS_ENDPOINT,
    };

    return (
        <div>
            <ConnectedEditSetings {...settingsProps} />
        </div>
    );
};
