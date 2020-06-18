import store from '../../store';
import { getAccessToken } from '../../store/selectors';
import { IncomingHttpHeaders } from 'http';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** get default HTTP headers for OpenSRP service
 * @param {string} accessToken - the access token
 * @param {string} accept - the MIME type to accept
 * @param {string} authorizationType - the authorization type
 * @param {string} contentType - the content type
 * @returns {IncomingHttpHeaders} - the headers to be attached to fetch request
 */
export function generateHeaders(
    accessToken = getAccessToken(store.getState()),
    accept = 'application/json',
    authorizationType = 'Bearer',
    contentType = 'multipart/form-data',
): IncomingHttpHeaders {
    return {
        accept,
        authorization: `${authorizationType} ${accessToken}`,
        'content-type': contentType,
    };
}

/** describe options returned by generate options -> usually
 * to be passed as options in a fetch request
 */
export interface FetchOptions {
    headers: HeadersInit;
    method: HTTPMethod;
    signal: AbortSignal;
}

/** generate options that are to be added to openSRPService fetch request
 * @param {AbortSignal} signal -  signal object that allows you to communicate with a DOM request
 * @param {HTTPMethod} method - the HTTP method
 * @returns {FetchOptions} - options to be added to the fetch request
 */
export function generateOptions(signal: AbortSignal, method: HTTPMethod): FetchOptions {
    return {
        headers: generateHeaders() as HeadersInit,
        method,
        signal,
    };
}
