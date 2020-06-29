// endpoints
export const OPENSRP_CLIENT_ENDPOINT = 'client/searchByCriteria';
export type OPENSRP_CLIENT_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;
export const OPENSRP_MANIFEST_ENDPOINT = 'manifest';
export type OPENSRP_MANIFEST_ENDPOINT = typeof OPENSRP_MANIFEST_ENDPOINT;
export const OPENSRP_FORMS_ENDPOINT = 'clientForm';
export type OPENSRP_FORMS_ENDPOINT = typeof OPENSRP_FORMS_ENDPOINT;
export const OPENSRP_MANIFEST_FORMS_ENDPOINT = 'clientForm/release-related-files';
export type OPENSRP_MANIFEST_FORMS_ENDPOINT = typeof OPENSRP_MANIFEST_FORMS_ENDPOINT;
export const OPENSRP_FORM_METADATA_ENDPOINT = 'clientForm/metadata';
export type OPENSRP_FORM_METADATA_ENDPOINT = typeof OPENSRP_FORM_METADATA_ENDPOINT;

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
export const HOUSEHOLD_URL = '/404';
export type HOUSEHOLD_URL = typeof HOUSEHOLD_URL;
export const ANC_URL = '/404';
export type ANC_URL = typeof ANC_URL;
export const CHILD_URL = '/child';
export type CHILD_URL = typeof CHILD_URL;
export const CHILD_PROFILE_URL = '/child-profile';
export type CHILD_PROFILE_URL = typeof CHILD_PROFILE_URL;
export const USER_URL = '/404';
export type USER_URL = typeof USER_URL;
export const ROLE_URL = '/404';
export type ROLE_URL = typeof ROLE_URL;
export const TEAM_URL = '/404';
export type TEAM_URL = typeof TEAM_URL;
export const LOCATIONS_URL = '/404';
export type LOCATION_URL = typeof LOCATIONS_URL;
export const REPORTS_URL = '/404';
export type REPORTS_URL = typeof REPORTS_URL;
export const VIEW_RELEASE_PAGE_URL = '/manifest/releases';
export type VIEW_RELEASE_PAGE_URL = typeof VIEW_RELEASE_PAGE_URL;
export const VIEW_DRAFT_FILES_PAGE_URL = '/files/draft';
export type VIEW_DRAFT_FILES_PAGE_URL = typeof VIEW_DRAFT_FILES_PAGE_URL;
export const VIEW_JSON_VALIDATORS_PAGE_URL = '/json-validators';
export type VIEW_JSON_VALIDATORS_PAGE_URL = typeof VIEW_JSON_VALIDATORS_PAGE_URL;
export const MANIFEST_FILE_UPLOAD = '/manifest';
export type MANIFEST_FILE_UPLOAD = typeof MANIFEST_FILE_UPLOAD;

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
export const CHILD_CLIENT_TYPE = 'child';
export type CHILD_CLIENT_TYPE = typeof CHILD_CLIENT_TYPE;
export const VIEW_RELEASE = 'View Release';
export type VIEW_RELEASE = typeof VIEW_RELEASE;
export const VIEW_JSON_VALIDATORS = 'View JSON Validators';
export type VIEW_JSON_VALIDATORS = typeof CHILD_CLIENT_TYPE;
export const VIEW_DRAFT_FILES = 'View Draft Files';
export type VIEW_DRAFT_FILES = typeof VIEW_DRAFT_FILES;
export const FILE_UPLOAD_TYPE = 'file-upload';
export type FILE_UPLOAD_TYPE = typeof FILE_UPLOAD_TYPE;
export const VALIDATOR_UPLOAD_TYPE = 'validator_upload';
export type VALIDATOR_UPLOAD_TYPE = typeof VALIDATOR_UPLOAD_TYPE;
export const JSON_VALIDATOR_LABLE = 'JSON Validators';
export type JSON_VALIDATOR_LABLE = typeof JSON_VALIDATOR_LABLE;
export const DRAFT_FILE_LABEL = 'Draft Files';
export type DRAFT_FILE_LABEL = typeof DRAFT_FILE_LABEL;
export const RELEASE_FILE_LABEL = 'Release Files';
export type RELEASE_FILE_LABEL = typeof RELEASE_FILE_LABEL;
export const RELEASES_LABEL = 'Releases';
export type RELEASES_LABEL = typeof RELEASES_LABEL;
export const EDIT_FILE_LABEL = 'Edit File';
export type EDIT_FILE_LABEL = typeof EDIT_FILE_LABEL;
export const UPLOAD_FILE_LABLE = 'Upload File';
export type UPLOAD_FILE_LABLE = typeof UPLOAD_FILE_LABLE;
export const DOWNLOAD_LABEL = 'Download';
export type DOWNLOAD_LABEL = typeof DOWNLOAD_LABEL;
export const MAKE_RELEASE_LABEL = 'Make Release';
export type MAKE_RELEASE_LABEL = typeof MAKE_RELEASE_LABEL;
export const FILE_NAME_LABEL = 'File Name';
export type FILE_NAME_LABEL = typeof FILE_NAME_LABEL;
export const FILE_VERSION_LABEL = 'File Version';
export type FILE_VERSION_LABEL = typeof FILE_VERSION_LABEL;
export const IDENTIFIER_LABEL = 'Identifier';
export type IDENTIFIER_LABEL = typeof IDENTIFIER_LABEL;
export const MODULE_LABEL = 'Module';
export type MODULE_LABEL = typeof MODULE_LABEL;
export const EDIT_LABEL = 'Edit';
export type EDIT_LABEL = typeof EDIT_LABEL;
export const UPLOAD_EDIT_LABEL = 'Upload edit';
export type UPLOAD_EDIT_LABEL = typeof UPLOAD_EDIT_LABEL;
export const UPOL0AD_FILE_LABEL = 'Upload New File';
export type UPOL0AD_FILE_LABEL = typeof UPOL0AD_FILE_LABEL;
export const VIEW_FILES_LABEL = 'View Files';
export type VIEW_FILES_LABEL = typeof VIEW_FILES_LABEL;
export const APP_ID_LABEL = 'APP Id';
export type APP_ID_LABEL = typeof APP_ID_LABEL;
export const APP_VERSION_LABEL = 'App Version';
export type APP_VERSION_LABEL = typeof APP_VERSION_LABEL;
export const RELATED_TO_LABEL = 'Related to';
export type RELATED_TO_LABEL = typeof RELATED_TO_LABEL;
export const FILE_UPLOAD_LABEL = 'Upload file';
export type FILE_UPLOAD_LABEL = typeof FILE_UPLOAD_LABEL;
export const FORM_REQUIRED_LABEL = 'Form is required';
export type FORM_REQUIRED_LABEL = typeof FORM_REQUIRED_LABEL;
export const FORM_NAME_REQUIRED_LABEL = 'Form name is required';
export type FORM_NAME_REQUIRED_LABEL = typeof FORM_NAME_REQUIRED_LABEL;
export const FIND_DRAFT_RELEASES_LABEL = 'Find Draft Files';
export type FIND_DRAFT_RELEASES_LABEL = typeof FIND_DRAFT_RELEASES_LABEL;
export const FIND_FILES_LABEL = 'Find Files';
export type FIND_FILES_LABEL = typeof FIND_FILES_LABEL;
export const FIND_RELEASES_LABEL = 'Find Release';
export type FIND_RELEASES_LABEL = typeof FIND_RELEASES_LABEL;
export const SEARCH_LABEL = 'Search';
export type SEARCH_LABEL = typeof SEARCH_LABEL;
export const CREATED_AT_LABEL = 'Created at';
export type CREATED_AT_LABEL = typeof CREATED_AT_LABEL;
export const UPDATED_AT_LABEL = 'Updated at';
export type UPDATED_AT_LABEL = typeof UPDATED_AT_LABEL;
export const FIND_DRAFT_FILE_LABEL = 'Find Draft Files';
export type FIND_DRAFT_FILE_LABEL = typeof FIND_DRAFT_FILE_LABEL;
export const FIND_RELEASE_FILES = 'Find Release Files';
export type FIND_RELEASE_FILES = typeof FIND_RELEASE_FILES;
export const FIND_VALIDATOR_FILES = 'Find Validator Files';
export type FIND_VALIDATOR_FILES = typeof FIND_VALIDATOR_FILES;

// url constants
export const PAGINATION_SIZE = 10;
export type PAGINATION_SIZE = typeof PAGINATION_SIZE;
export const PAGINATION_NEIGHBORS = 3;
export type PAGINATION_NEIGHBORS = typeof PAGINATION_NEIGHBORS;
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
