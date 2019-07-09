import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { Client } from '../store/ducks/clients';

/** Interface for an object that is allowed to have any property */
export interface FlexObject {
  [key: string]: any;
}

/** Custom function to get oAuth user info depending on the oAuth2 provider
 * It compares the value of the `state` param in the oAuth2 provider config
 * to the one received from the oAuth2 provider in order to return the correct
 * user info getter function
 * @param {{[key: string]: any }} apiResponse - the API response object
 */
export function oAuthUserInfoGetter(apiResponse: { [key: string]: any }): SessionState | void {
  if (Object.keys(apiResponse).includes('oAuth2Data')) {
    switch (apiResponse.oAuth2Data.state) {
      case OPENSRP_OAUTH_STATE:
        return getOpenSRPUserInfo(apiResponse);
      case ONADATA_OAUTH_STATE:
        return getOnadataUserInfo(apiResponse);
    }
  }
}

// A hack since we have dont yet have type for rawclients objects
/** func to only extract bits the client values needed from API response */
export function extractClient(rawClient: any): Client {
  const thisClient: Client = {
    firstName: rawClient.firstName || '',
    gender: rawClient.gender || '',
    id: rawClient._id || '',
    lastContactDate: '',
    lastName: rawClient.lastName || '',
    location: '',
    middleName: rawClient.middleName || '',
    type: 'Client',
  };
  return thisClient;
}
