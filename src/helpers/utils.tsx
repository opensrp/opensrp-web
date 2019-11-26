import { getOnadataUserInfo, getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { SessionState } from '@onaio/session-reducer';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../configs/env';
import { URLS_TO_HIDE_HEADER } from '../configs/settings';
import {
  COMMUNE,
  COUNTRY,
  DISTRICT,
  HIERARCHICAL_DATA_URL,
  HIGH,
  LOW,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_WOMAN,
  NO,
  NUTRITION,
  NUTRITION_COMPARTMENTS_URL,
  PREGNANCY,
  PREGNANCY_COMPARTMENTS_URL,
  PROVINCE,
  VIETNAM,
  VIETNAM_COUNTRY_LOCATION_ID,
  VILLAGE,
} from '../constants';
import { Location, UserLocation } from '../store/ducks/locations';
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

/**
 * determines weather the header should be rendered.
 */
export function headerShouldNotRender(): boolean {
  return RegExp(URLS_TO_HIDE_HEADER.join('|')).test(window.location.pathname);
}

/**
 * Group objects in a list by some field as their key.
 * @param list a list of objects to be grouped into a single object with keys for each.
 * @param field a field to as the key by which the objects in the list will be attached.
 * @return returns an object that contains all the objects in the list passed to it with
 * keys as values of the field passed as the second argument.
 */
export function groupBy(list: FlexObject[], field: string): FlexObject {
  const dataMap: FlexObject = {};
  list.forEach((listElement: FlexObject) => {
    if (!dataMap[listElement[field]]) {
      dataMap[listElement[field]] = {
        ...listElement,
      };
    }
  });
  return dataMap;
}

/**
 * Append a number suffix such as 'st' for 1 and 'nd' for 2 and so on.
 * @param num
 */
export function getNumberSuffix(num: number): string {
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
 *
 * @param userLocationData - an array of UserLocation data fetched from a supserset slice
 * @param userUUID - the UUID of the user logged in obtained from an openSRP endpoitnt.
 */
export function getLocationId(userLocationData: UserLocation[], userUUID: string) {
  const userDetailObj =
    userLocationData.length &&
    userLocationData.find(
      (userLocationDataItem: UserLocation) => userLocationDataItem.provider_id === userUUID
    );
  if (userDetailObj) {
    return userDetailObj.location_id;
  }
}

/**
 *
 * @param locationId location ID that we want to find in locations
 * @param locations a list of Location objects from which we want to find a location ID
 */
export const locationIdIn = (locationId: string, locations: Location[]) => {
  return locations.find((location: Location) => location.location_id === locationId);
};

/**
 * An object representing the filter function and location level for a logged in user.
 */
export interface FilterFunctionAndLocationLevel {
  locationFilterFunction: (smsData: SmsData) => boolean;
  locationLevel: number;
}

/**
 * calculate the filter function and location level for a logged in user
 * @param userLocationId - the location ID of the logged in user.
 * @param provinces - a list of locations of level province
 * @param districts - a list of locations of level district
 * @param communes - a list of locations of level commune
 * @param villages - a list of locations of level village
 * @return {FilterFunctionAndLocationLevel} an object that contains the users
 * location level and a filter function based on that location level.
 */
export function getFilterFunctionAndLocationLevel(
  userLocationId: string,
  provinces: Location[],
  districts: Location[],
  communes: Location[],
  villages: Location[]
): FilterFunctionAndLocationLevel {
  let locationFilterFunction: (smsData: SmsData) => boolean = () => {
    return false;
  };

  let userLocationLevel = 4;

  if (userLocationId === VIETNAM_COUNTRY_LOCATION_ID) {
    userLocationLevel = 0;
    locationFilterFunction = () => true;
  } else if (locationIdIn(userLocationId, provinces)) {
    userLocationLevel = 1;
    locationFilterFunction = (smsData: SmsData): boolean => {
      // tslint:disable-next-line: no-shadowed-variable
      const village = villages.find((location: Location) => {
        return location.location_id === smsData.location_id;
      });
      if (village) {
        return (
          userLocationId ===
          getProvince(village as (Location & { level: VILLAGE }), districts, communes)
        );
      } else {
        return false;
      }
    };
  } else if (locationIdIn(userLocationId, districts)) {
    userLocationLevel = 2;
    locationFilterFunction = (smsData: SmsData): boolean => {
      // tslint:disable-next-line: no-shadowed-variable
      const village = villages.find((location: Location) => {
        return location.location_id === smsData.location_id;
      });
      if (village) {
        return userLocationId === getDistrict(village as (Location & { level: VILLAGE }), communes);
      } else {
        return false;
      }
    };
  } else if (locationIdIn(userLocationId, communes)) {
    userLocationLevel = 3;
    locationFilterFunction = (smsData: SmsData): boolean => {
      // tslint:disable-next-line: no-shadowed-variable
      const village = villages.find((location: Location) => {
        return location.location_id === smsData.location_id;
      });
      if (village) {
        return userLocationId === getCommune(village as (Location & { level: VILLAGE }));
      } else {
        return false;
      }
    };
  } else if (locationIdIn(userLocationId, villages)) {
    userLocationLevel = 4;
    locationFilterFunction = (smsData: SmsData): boolean => {
      return userLocationId === smsData.location_id;
    };
  }

  return {
    locationFilterFunction,
    locationLevel: userLocationLevel,
  } as FilterFunctionAndLocationLevel;
}

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

/**
 * Filter smsData by patientID and then sort.
 * @param props
 */
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

/**
 * get number of days since a certain day specified by a date string.
 * @param date
 */
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

/*
 * an object representing information required to build the header breadcrumb and to filter out data
 */
export interface HeaderBreadCrumb {
  location: string;
  path: string;
  locationId: string;
  level: string;
}

/**
 * returns an object that is used to create the header breadcrumb on the Compartments component
 * @param locationId - location ID  of where the user is assigned;
 * this could be a province, district, commune or village
 * @return { HeaderBreadCrumb }
 */
export function buildHeaderBreadCrumb(
  locationId: string,
  provinces: Location[],
  districts: Location[],
  communes: Location[],
  villages: Location[],
  countryLocationId: string
): HeaderBreadCrumb {
  if (locationIdIn(locationId, provinces)) {
    const userProvince = provinces.find(
      (province: Location) => province.location_id === locationId
    );
    return {
      level: PROVINCE,
      location: userProvince!.location_name,
      locationId: userProvince!.location_id,
      path: '',
    };
  } else if (locationIdIn(locationId, districts)) {
    const userDistrict = districts.find(
      (district: Location) => district.location_id === locationId
    );
    const userProvince = provinces.find(
      (province: Location) => province.location_id === userDistrict!.parent_id
    );
    return {
      level: DISTRICT,
      location: userDistrict!.location_name,
      locationId: userDistrict!.location_id,
      path: `${userProvince!.location_name} / `,
    };
  } else if (locationIdIn(locationId, communes)) {
    const userCommune = communes.find((commune: Location) => commune.location_id === locationId);
    const userDistrict = districts.find(
      (district: Location) => district.location_id === userCommune!.parent_id
    );
    const userProvince = provinces.find(
      (province: Location) => province.location_id === userDistrict!.parent_id
    );
    return {
      level: COMMUNE,
      location: userCommune!.location_name,
      locationId: userCommune!.location_id,
      path: `${userProvince!.location_name} / ${userDistrict!.location_name} / `,
    };
  } else if (locationIdIn(locationId, villages)) {
    const userVillage = villages.find((village: Location) => village.location_id === locationId);
    const userCommune = communes.find(
      (commune: Location) => commune.location_id === userVillage!.parent_id
    );
    const userDistrict = districts.find(
      (district: Location) => district.location_id === userCommune!.parent_id
    );
    const userProvince = provinces.find(
      (province: Location) => province.location_id === userDistrict!.parent_id
    );
    return {
      level: VILLAGE,
      location: userVillage!.location_name,
      locationId: userVillage!.location_id,
      path: `${userProvince!.location_name} / ${userDistrict!.location_name} / ${
        userCommune!.location_name
      } / `,
    };
  } else if (countryLocationId === locationId) {
    return {
      level: COUNTRY,
      location: VIETNAM,
      locationId: countryLocationId,
      path: '',
    };
  }
  return { path: '', location: '', locationId: '', level: '' };
}

/**
 * Get a link to any of the modules compartments.
 * @param module string representing the module whose link you would like to get
 * @return link to module compartment
 */
export function getModuleLink(
  module: PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | ''
): PREGNANCY_COMPARTMENTS_URL | NUTRITION_COMPARTMENTS_URL | NBC_AND_PNC_COMPARTMENTS_URL | '' {
  switch (module) {
    case PREGNANCY:
      return PREGNANCY_COMPARTMENTS_URL;
    case NUTRITION:
      return NUTRITION_COMPARTMENTS_URL;
    case NBC_AND_PNC_WOMAN:
      return NBC_AND_PNC_COMPARTMENTS_URL;
    case NBC_AND_PNC_CHILD:
      return NBC_AND_PNC_COMPARTMENTS_URL;
    default:
      return '';
  }
}

/**
 * Get a link to the HierrarchichalDataTable component
 * @param {HIGH | LOW | NO} riskLevel string value that will be passed to hierarchichalDataTable
 * as prop. representing that column should be coloured.
 * @param {PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | ''} module string representing the module
 * @param {string} title title to be passed to hierarchichal data table as a prop
 * @param {number} permissionLevel - number ranging from 0 - 4 that represents the permission level of the user.
 * @param {string} locationId - the users location id.
 */
export function getLinkToHierarchichalDataTable(
  riskLevel: HIGH | LOW | NO,
  module: PREGNANCY | NBC_AND_PNC_CHILD | NBC_AND_PNC_WOMAN | NUTRITION | '',
  title: string,
  permissionLevel: number,
  locationId: string
) {
  if (permissionLevel === 4) {
    return '#';
  } else {
    return `${getModuleLink(
      module
    )}${HIERARCHICAL_DATA_URL}/${module}/${riskLevel}/${title}/${permissionLevel}/down/${locationId}/${permissionLevel}`;
  }
}
