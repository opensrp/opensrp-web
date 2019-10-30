import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { URLS_TO_HIDE_HEADER } from '../configs/settings';
import { SmsData } from '../store/ducks/sms_events';

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

export function headerShouldNotRender() {
  return RegExp(URLS_TO_HIDE_HEADER.join('|')).test(window.location.pathname);
}

export function getNumberSuffix(num: number) {
  const divisionBy10Remaninder: number = num % 10;
  if (divisionBy10Remaninder === 1) {
    return 'st';
  } else if (divisionBy10Remaninder === 2) {
    return 'nd';
  } else if (divisionBy10Remaninder === 3) {
    return 'rd';
  } else {
    return 'th';
  }
}

/**
 * Sort function for a list of SmsData
 * @param firstE1
 * @param secondE1
 */
export const sortFunction = (firstE1: SmsData, secondE1: SmsData): number => {
  if (firstE1.event_id < secondE1.event_id) {
    return 1;
  } else if (firstE1.event_id > secondE1.event_id) {
    return -1;
  } else {
    return 0;
  }
};
