import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { Color } from 'csstype';
import { findKey, uniq } from 'lodash';
import { FitBoundsOptions, Layer, Style } from 'mapbox-gl';
import { Column } from 'react-table';
import SeamlessImmutable from 'seamless-immutable';
import { TASK_YELLOW } from '../colors';
import { DIGITAL_GLOBE_CONNECT_ID, ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { locationHierarchy, LocationItem } from '../configs/settings';
import {
  BEDNET_DISTRIBUTION_CODE,
  BLOOD_SCREENING_CODE,
  CASE_CONFIRMATION_CODE,
  FEATURE_COLLECTION,
  IRS_CODE,
  LARVAL_DIPPING_CODE,
  MAP_ID,
  MOSQUITO_COLLECTION_CODE,
  RACD_REGISTER_FAMILY_CODE,
} from '../constants';
import { Plan } from '../store/ducks/plans';
import { InitialTask } from '../store/ducks/tasks';
import { colorMaps, ColorMapsTypes } from './structureColorMaps';

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
