// endpoints
export const OPENSRP_CLIENT_ENDPOINT = 'client/searchByCriteria';
export type OPENSRP_CLIENT_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;
export const OPENSRP_SINGLE_CLIENT_ENDPOINT = 'client/search';
export type OPENSRP_SINGLE_CLIENT_ENDPOINT = typeof OPENSRP_SINGLE_CLIENT_ENDPOINT;
export const OPENSRP_EVENT_ENDPOINT = 'event/search';
export type OPENSRP_EVENT_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;

export const OPENSRP_ADMIN_ENDPOINT = 'admin/location';
export type OPENSRP_ADMIN_ENDPOINT = typeof OPENSRP_ADMIN_ENDPOINT;

// internal urls
export const LOGIN_URL = '/login';
export type LOGIN_URL = typeof LOGIN_URL;
export const LOGOUT_URL = '/logout';
export type LOGOUT_URL = typeof LOGOUT_URL;
export const HOME_URL = '/';
export type HOME_URL = typeof HOME_URL;
export const CLIENT_URL = '/clients';
export type CLIENT_URL = typeof CLIENT_URL;
export const CLIENT_PROFILE_URL = '/client-profile';
export type CLIENT_PROFILE_URL = typeof CLIENT_PROFILE_URL;
export const HOUSEHOLD_URL = '/households';
export type HOUSEHOLD_URL = typeof HOUSEHOLD_URL;
export const ANC_URL = '/anc';
export const HOUSEHOLD_PROFILE_URL = '/household-profile';
export type HOUSEHOLD_PROFILE_URL = typeof HOUSEHOLD_PROFILE_URL;
export type ANC_URL = typeof ANC_URL;
export const ANC_PROFILE_URL = '/anc-profile';
export type ANC_PROFILE_URL = typeof ANC_PROFILE_URL;
export const CHILD_URL = '/child';
export type CHILD_URL = typeof CHILD_URL;
export const CHILD_PROFILE_URL = '/child-profile';
export type CHILD_PROFILE_URL = typeof CHILD_PROFILE_URL;
export const USER_URL = '/404';
export type USER_URL = typeof USER_URL;
export const ROLE_URL = '/404';
export type ROLE_URL = typeof ROLE_URL;
export const TEAM_URL = '/teams';
export type TEAM_URL = typeof TEAM_URL;
export const TEAM_FORM_URL = '/team-form';
export type TEAM_FORM_URL = typeof TEAM_FORM_URL;
export const TEAM_PROFILE_URL = '/team-profile';
export type TEAM_PROFILE_URL = typeof TEAM_PROFILE_URL;
export const LOCATIONS_URL = '/locations';
export type LOCATION_URL = typeof LOCATIONS_URL;
export const REPORTS_URL = '/404';
export type REPORTS_URL = typeof REPORTS_URL;

// string literals

export const CLIENT = 'Client';
export type CLIENT = typeof CLIENT;
export const REPORT = 'Report';
export type REPORT = typeof REPORT;
export const ADMIN = 'Admin';
export type ADMIN = typeof ADMIN;
export const CLIENT_RECORDS = 'Client Records';
export type CLIENT_RECORDS = typeof CLIENT_RECORDS;
export const REPORTS = 'Reports';
export type REPORTS = typeof REPORTS;
export const ALL_CLIENTS = 'All clients';
export type ALL_CLIENTS = typeof ALL_CLIENTS;
export const HOUSEHOLD = 'Household';
export type HOUSEHOLD = typeof HOUSEHOLD;
export const ANC = 'ANC';
export type ANC = typeof ANC;
export const CHILD = 'Child';
export type CHILD = typeof CHILD;
export const USERS = 'Users';
export type USERS = typeof USERS;
export const ROLES = 'Roles';
export type ROLES = typeof ROLES;
export const TEAMS = 'Teams';
export type TEAMS = typeof TEAMS;
export const LOCATIONS = 'Locations';
export type LOCATIONS = typeof LOCATIONS;
export const LOGIN = 'Login';
export type LOGIN = typeof LOGIN;
export const SIGN_OUT = 'Sign Out';
export type SIGN_OUT = typeof SIGN_OUT;
export const HOUSEHOLD_CLIENT_TYPE = 'ec_family';
export type HOUSEHOLD_CLIENT_TYPE = typeof HOUSEHOLD_CLIENT_TYPE;
export const CHILD_CLIENT_TYPE = 'child';
export type CHILD_CLIENT_TYPE = typeof CHILD_CLIENT_TYPE;
export const ANC_CLIENT_TYPE = 'anc';
export type ANC_CLIENT_TYPE = typeof ANC_CLIENT_TYPE;

export const NEXT = 'Next';
export type NEXT = typeof NEXT;
export const START = 'Start';
export type START = typeof START;
export const LAST = 'Last';
export type LAST = typeof LAST;
export const PREVIOUS = 'Previous';
export type PREVIOUS = typeof PREVIOUS;
export const LOADING = 'Loading';
export const VIEW = 'View';
export type VIEW = typeof VIEW;

/** page constants for every list of */
export const PAGINATION_SIZE = 10;
export type PAGINATION_SIZE = typeof PAGINATION_SIZE;
export const PAGINATION_NEIGHBORS = 3;
export type PAGINATION_NEIGHBORS = typeof PAGINATION_NEIGHBORS;
