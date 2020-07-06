import React from 'react';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { OPENSRP_API_BASE_URL, OPENSRP_API_V2_BASE_URL } from '../../../../configs/env';
import Loading from '../../../../components/page/Loading';
import { generateOptions } from '../../../../services/opensrp';
import {
    SETTINGS_ENDPOINT,
    LOCATIONS_ENDPOINT,
    SECURITY_AUTHENTICATE_ENDPOINT,
    SERVER_SETTINGS,
} from '../../../../constants';
import {
    ConnectedEditSetings,
    locationReducerName,
    locationsReducer,
    settingsReducer,
    settingsReducerName,
} from '@opensrp/population-characteristics';
import '@opensrp/population-characteristics/dist/styles/index.css';
import Helmet from 'react-helmet';
import './index.css';

/** register the reducers */
reducerRegistry.register(settingsReducerName, settingsReducer);
reducerRegistry.register(locationReducerName, locationsReducer);

export const EditServerSettings = () => {
    const baseURL = OPENSRP_API_BASE_URL.replace('rest/', '');

    const settingsProps = {
        LoadingComponent: <Loading />,
        baseURL,
        getPayload: generateOptions,
        locationsEndpoint: LOCATIONS_ENDPOINT,
        restBaseURL: OPENSRP_API_BASE_URL,
        secAuthEndpoint: SECURITY_AUTHENTICATE_ENDPOINT,
        settingsEndpoint: SETTINGS_ENDPOINT,
        v2BaseUrl: OPENSRP_API_V2_BASE_URL,
    };

    return (
        <div>
            <Helmet>
                <title>{SERVER_SETTINGS}</title>
            </Helmet>

            <ConnectedEditSetings {...settingsProps} />
        </div>
    );
};
