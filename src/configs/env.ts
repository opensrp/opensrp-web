/** This module handles settings taken from environment variables */

/** The website name */
export const WEBSITE_NAME = process.env.REACT_APP_WEBSITE_NAME || 'unicef';
export type WEBSITE_NAME = typeof WEBSITE_NAME;

/** The domain name */
export const DOMAIN_NAME = process.env.REACT_APP_DOMAIN_NAME || 'http://localhost:3000';
export type DOMAIN_NAME = typeof DOMAIN_NAME;

export const ENABLE_PREGNANCY_MODULE =
  process.env.REACT_APP_ENABLE_PREGNANCY_MODULE === 'true' || false;
export type ENABLE_PREGNANCY_MODULE = typeof ENABLE_PREGNANCY_MODULE;

export const SUPERSET_FETCH_TIMEOUT_INTERVAL =
  Number(process.env.REACT_APP_SUPERSET_FETCH_TIMEOUT_INTERVAL) || 15000;
export type SUPERSET_FETCH_TIMEOUT_INTERVAL = typeof SUPERSET_FETCH_TIMEOUT_INTERVAL;

export const ENABLE_NUTRITION_MODULE =
  process.env.REACT_APP_ENABLE_NUTRITION_MODULE === 'true' || false;
export type ENABLE_NUTRITION_MODULE = typeof ENABLE_NUTRITION_MODULE;

export const ENABLE_NEWBORN_AND_POSTNATAL_MODULE =
  process.env.REACT_APP_ENABLE_NEWBORN_AND_POSTNATAL_MODULE === 'true' || false;
export type ENABLE_NEWBORN_AND_POSTNATAL_MODULE = typeof ENABLE_NEWBORN_AND_POSTNATAL_MODULE;

/** Do you want to enable the Client Page of Client Records Module? */
export const ENABLE_CLIENT_PAGE = process.env.REACT_APP_ENABLE_CLIENT_PAGE === 'true' || false;
export type ENABLE_CLIENT_PAGE = typeof ENABLE_CLIENT_PAGE;

/** Do you want to enable the Household Page of Client Records Module? */
export const ENABLE_HOUSEHOLD_PAGE =
  process.env.REACT_APP_ENABLE_HOUSEHOLD_PAGE === 'true' || false;
export type ENABLE_HOUSEHOLD_PAGE = typeof ENABLE_HOUSEHOLD_PAGE;

/** Do you want to enable the ANC Page of Client Records Module? */
export const ENABLE_ANC_PAGE = process.env.REACT_APP_ENABLE_ANC_PAGE === 'true' || false;
export type ENABLE_ANC_PAGE = typeof ENABLE_ANC_PAGE;

/** Do you want to enable the Child Page of Client Records Module? */
export const ENABLE_CHILD_PAGE = process.env.REACT_APP_ENABLE_CHILD_PAGE === 'true' || false;
export type ENABLE_CHILD_PAGE = typeof ENABLE_CHILD_PAGE;

/** Do you want to enable the Reports Module? */
export const ENABLE_REPORT_MODULE = process.env.REACT_APP_ENABLE_REPORT_MODULE === 'true' || false;
export type ENABLE_REPORT_MODULE = typeof ENABLE_REPORT_MODULE;

/** Do you want to enable the nbc and pnc Module? */
export const ENABLE_NBC_AND_PNC_MODULE =
  process.env.REACT_APP_ENABLE_NBC_AND_PNC_MODULE === 'true' || false;
export type ENABLE_NBC_AND_PNC_MODULE = typeof ENABLE_NBC_AND_PNC_MODULE;

/** Do you want to enable the  home navigation? */
export const ENABLE_HOME_NAVIGATION =
  process.env.REACT_APP_ENABLE_HOME_NAVIGATION === 'true' || false;
export type ENABLE_HOME_NAVIGATION = typeof ENABLE_HOME_NAVIGATION;

/** Do you want to enable User page of Admin Module? */
export const ENABLE_USER_PAGE = process.env.REACT_APP_ENABLE_USER_PAGE === 'true' || false;
export type ENABLE_USER_PAGE = typeof ENABLE_USER_PAGE;

/** Do you want to enable Role page of Admin Module? */
export const ENABLE_ROLE_PAGE = process.env.REACT_APP_ENABLE_ROLE_PAGE === 'true' || false;
export type ENABLE_ROLE_PAGE = typeof ENABLE_ROLE_PAGE;

/** Do you want to enable Team page of Admin Module? */
export const ENABLE_TEAM_PAGE = process.env.REACT_APP_ENABLE_TEAM_PAGE === 'true' || false;
export type ENABLE_TEAM_PAGE = typeof ENABLE_TEAM_PAGE;

/** Do you want to enable Location page of Admin Module? */
export const ENABLE_LOCATION_PAGE = process.env.REACT_APP_ENABLE_LOCATION_PAGE === 'true' || false;
export type ENABLE_LOCATION_PAGE = typeof ENABLE_LOCATION_PAGE;

/** Do you want to enable the clients page? */
export const ENABLE_CLIENTS = process.env.REACT_APP_ENABLE_CLIENTS === 'true';
export type ENABLE_CLIENTS = typeof ENABLE_CLIENTS;

/** Do you want to disable login protection? */
export const DISABLE_LOGIN_PROTECTION = process.env.REACT_APP_DISABLE_LOGIN_PROTECTION === 'true';
export type DISABLE_LOGIN_PROTECTION = typeof DISABLE_LOGIN_PROTECTION;

/** The Superset API base */
export const SUPERSET_API_BASE = process.env.REACT_APP_SUPERSET_API_BASE || 'http://localhost';
export type SUPERSET_API_BASE = typeof SUPERSET_API_BASE;

/** The Superset API endpoint */
export const SUPERSET_API_ENDPOINT = process.env.REACT_APP_SUPERSET_API_ENDPOINT || 'slice';
export type SUPERSET_API_ENDPOINT = typeof SUPERSET_API_ENDPOINT;

/** OpenSRP oAuth2 settings */
export const ENABLE_OPENSRP_OAUTH = process.env.REACT_APP_ENABLE_OPENSRP_OAUTH === 'true';
export type ENABLE_OPENSRP_OAUTH = typeof ENABLE_OPENSRP_OAUTH;
export const OPENSRP_CLIENT_ID = process.env.REACT_APP_OPENSRP_CLIENT_ID || '';
export type OPENSRP_CLIENT_ID = typeof OPENSRP_CLIENT_ID;

// notice the ending is NOT / here
export const OPENSRP_ACCESS_TOKEN_URL =
  process.env.REACT_APP_OPENSRP_ACCESS_TOKEN_URL ||
  'https://reveal-stage.smartregister.org/opensrp/oauth/token';
export type OPENSRP_ACCESS_TOKEN_URL = typeof OPENSRP_ACCESS_TOKEN_URL;

// notice the ending is NOT / here
export const OPENSRP_AUTHORIZATION_URL =
  process.env.REACT_APP_OPENSRP_AUTHORIZATION_URL ||
  'https://reveal-stage.smartregister.org/opensrp/oauth/authorize';
export type OPENSRP_AUTHORIZATION_URL = typeof OPENSRP_AUTHORIZATION_URL;

export const OPENSRP_USER_URL =
  process.env.REACT_APP_OPENSRP_USER_URL ||
  'https://reveal-stage.smartregister.org/opensrp/user-details';
export type OPENSRP_USER_URL = typeof OPENSRP_USER_URL;

export const OPENSRP_OAUTH_STATE = process.env.REACT_APP_OPENSRP_OAUTH_STATE || 'opensrp';
export type OPENSRP_OAUTH_STATE = typeof OPENSRP_OAUTH_STATE;

/** Onadata oAuth2 settings */
export const ENABLE_ONADATA_OAUTH = process.env.REACT_APP_ENABLE_ONADATA_OAUTH === 'true';
export type ENABLE_ONADATA_OAUTH = typeof ENABLE_ONADATA_OAUTH;
export const ONADATA_CLIENT_ID = process.env.REACT_APP_ONADATA_CLIENT_ID || '';
export type ONADATA_CLIENT_ID = typeof ONADATA_CLIENT_ID;

// notice the ending / here
export const ONADATA_ACCESS_TOKEN_URL =
  process.env.REACT_APP_ONADATA_ACCESS_TOKEN_URL || 'https://stage-api.ona.io/o/token/';
export type ONADATA_ACCESS_TOKEN_URL = typeof ONADATA_ACCESS_TOKEN_URL;

// notice the ending / here
export const ONADATA_AUTHORIZATION_URL =
  process.env.REACT_APP_ONADATA_AUTHORIZATION_URL || 'https://stage-api.ona.io/o/authorize/';
export type ONADATA_AUTHORIZATION_URL = typeof ONADATA_AUTHORIZATION_URL;

export const ONADATA_USER_URL =
  process.env.REACT_APP_ONADATA_USER_URL || 'https://stage-api.ona.io/api/v1/user.json';
export type ONADATA_USER_URL = typeof ONADATA_USER_URL;

export const ONADATA_OAUTH_STATE = process.env.REACT_APP_ONADATA_OAUTH_STATE || 'onadata';
export type ONADATA_OAUTH_STATE = typeof ONADATA_OAUTH_STATE;

export const GISIDA_ONADATA_API_TOKEN = process.env.REACT_APP_GISIDA_ONADATA_API_TOKEN || '';
export type GISIDA_ONADATA_API_TOKEN = typeof GISIDA_ONADATA_API_TOKEN;

// notice the trailing /
export const OPENSRP_API_BASE_URL =
  process.env.REACT_APP_OPENSRP_API_BASE_URL ||
  'https://reveal-stage.smartregister.org/opensrp/rest/';
export type OPENSRP_API_BASE_URL = typeof OPENSRP_API_BASE_URL;

/** the clients endpoint NOTE: does not end with / */
export const OPENSRP_CLIENT_ENDPOINT =
  process.env.REACT_APP_OPENSRP_CLIENT_ENDPOINT || 'client/search';
export type OPENSRP_CLIENT_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;

export const GET_FORM_DATA_ROW_LIMIT =
  Number(process.env.REACT_APP_GET_FORM_DATA_ROW_LIMIT) || 2000;
export type GET_FORM_DATA_ROW_LIMIT = typeof GET_FORM_DATA_ROW_LIMIT;

// analysis page iframes
export const SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT =
  'https://discover.ona.io/superset/dashboard/53/?standalone=true';
export type SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT = typeof SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT;
export const NBC_AND_PNC_ANALYSIS_ENDPOINT =
  'https://discover.ona.io/superset/dashboard/66/?standalone=true';
export type NBC_AND_PNC_ANALYSIS_ENDPOINT = typeof NBC_AND_PNC_ANALYSIS_ENDPOINT;

// csv export links
export const SUPERSET_PREGNANCY_DATA_EXPORT =
  'https://discover.ona.io/superset/explore_json/?form_data={"slice_id":2263}&csv=true';
export type SUPERSET_PREGNANCY_DATA_EXPORT = typeof SUPERSET_PREGNANCY_DATA_EXPORT;

// slice IDs
export const PROVINCE_SLICE = process.env.REACT_APP_PROVINCE_SLICE || '0';
export type PROVINCE_SLICE = typeof PROVINCE_SLICE;

export const DISTRICT_SLICE = process.env.REACT_APP_DISTRICT_SLICE || '0';
export type DISTRICT_SLICE = typeof DISTRICT_SLICE;

export const COMMUNE_SLICE = process.env.REACT_APP_COMMUNE_SLICE || '0';
export type COMMUNE_SLICE = typeof COMMUNE_SLICE;

export const VILLAGE_SLICE = process.env.REACT_APP_VILLAGE_SLICE || '0';
export type VILLAGE_SLICE = typeof VILLAGE_SLICE;

export const LOCATION_SLICES = [PROVINCE_SLICE, DISTRICT_SLICE, COMMUNE_SLICE, VILLAGE_SLICE];
export type LOCATION_SLICES = typeof LOCATION_SLICES;

export const SUPERSET_SMS_DATA_SLICE = process.env.REACT_APP_SUPERSET_SMS_DATA_SLICE || '0';
export type SUPERSET_SMS_DATA_SLICE = typeof SUPERSET_SMS_DATA_SLICE;
