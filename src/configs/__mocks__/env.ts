/** You can hard code variables that would have been
 * extracted from the environment here, and then mock
 * this file from your test file.
 * The goal is to have consistent test results
 */

/** Base Api url for opensrp */
export const OPENSRP_BASE_API_ENDPOINT = 'https://someip';
export type OPENSRP_BASE_API_ENDPOINT = typeof OPENSRP_BASE_API_ENDPOINT;

/** the clients endpoint NOTE: does not end with / */
export const OPENSRP_CLIENT_ENDPOINT = 'rest/client';
export type OPENSRP_CLIENTS_ENDPOINT = typeof OPENSRP_CLIENT_ENDPOINT;
