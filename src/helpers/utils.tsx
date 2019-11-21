import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { URLS_TO_HIDE_HEADER } from '../configs/settings';
import { VILLAGE } from '../constants';
import { Location } from '../store/ducks/locations';
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

/**
 * Given a village return it's commune's location ID
 * @param {Location} village - village Location to find commnue
 */
export const getCommune = (village: Location & { level: VILLAGE }): string => {
  return village.parent_id;
};

/**
 * Given a village and a list of all communes, find it's District
 * @param {Location} village - village Location for which we want to find a District.
 * @param communes
 */
export const getDistrict = (
  village: Location & { level: VILLAGE },
  communes: Location[]
): string | null => {
  const communeId = getCommune(village);
  const commune = communes.find((location: Location) => location.location_id === communeId);
  return commune ? commune.parent_id : null;
};

/**
 * Given a village, a list of all districts and a list of all communes, find it's province
 * @param village - village Location for which we want to find a Province.
 * @param districts
 * @param communes
 */
export const getProvince = (
  village: Location & { level: VILLAGE },
  districts: Location[],
  communes: Location[]
): string | null => {
  const districtId = getDistrict(village, communes);
  return districtId
    ? districts.find((location: Location) => location.location_id === districtId)!.parent_id
    : null;
};

export const filterByPatientAndSort = (props: {
  patientId: string;
  smsData: SmsData[];
}): SmsData[] => {
  return props.smsData
    .filter((dataItem: SmsData): boolean => {
      return dataItem.anc_id.toLocaleLowerCase().includes(props.patientId.toLocaleLowerCase());
    })
    .sort((event1: SmsData, event2: SmsData): number => {
      if (event1.EventDate < event2.EventDate) {
        return -1;
      }
      if (event1.EventDate > event2.EventDate) {
        return 1;
      }
      return 0;
    });
};

export const getNumberOfDaysSinceDate = (date: string): number => {
  return Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 3600 * 24));
};

/**
 * The typical use of this util function is by a props that would like to check if its
 * location props(distticts, villages, communes and provices that are attached to the store)
 * all have Location data.
 *
 * returns true if villages, districts, communes and provices all have a length greater than 0.
 * @param {Location[]} villages an array of village locations
 * @param {Location[]} communes an array of communes locations
 * @param {Location[]} districts an array of district locations
 * @param {Location[]} provices an array of province locations
 */
export function locationDataIsAvailable(
  villages: Location[],
  communes: Location[],
  districts: Location[],
  provinces: Location[]
) {
  return villages.length && districts.length && communes.length && provinces.length;
}
