/** You can hard code variables that would have been
 * extracted from the environment here, and then mock
 * this file from your test file.
 * The goal is to have consistent test results
 */

/** Base Api url for opensrp */
export const OPENSRP_API_BASE_URL = 'https://test.smartregister.org/opensrp/rest/';
export type OPENSRP_API_BASE_URL = typeof OPENSRP_API_BASE_URL;
/** the clients endpoint NOTE: does not end with / */
export const OPENSRP_CLIENT_ENDPOINT = 'client/search';
export type OPENSRP_CLIENT_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;

/** The website name */
export const WEBSITE_NAME = 'OpenSRP';
export type WEBSITE_NAME = typeof WEBSITE_NAME;
