import store from '../../store';
import { getAccessToken } from '../../store/selectors';
import { IncomingHttpHeaders } from 'http';

type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';

/** get default HTTP headers for OpenSRP service
 * @param {string} accessToken - the access token
 * @param {string} accept - the MIME type to accept
 * @param {string} authorizationType - the authorization type
 * @param {string} contentType - the content type
 */
export function generateHeaders(
    accessToken = getAccessToken(store.getState()),
    accept = 'application/json',
    authorizationType = 'Bearer',
    contentType = 'application/json;charset=UTF-8',
): IncomingHttpHeaders {
    return {
        accept,
        authorization: `${authorizationType} ${accessToken}`,
        'content-type': contentType,
    };
}

/** generate options that are to be added to openSRPService fetch request
 * @param {AbortSignal} signal -  signal object that allows you to communicate with a DOM request
 * @param {HTTPMethod} method - the HTTP method
 * @returns the payload
 */
export function generateOptions(
    signal: AbortSignal,
    method: HTTPMethod,
): { headers: HeadersInit; method: HTTPMethod; signal: AbortSignal } {
    return {
        headers: generateHeaders() as HeadersInit,
        method,
        signal,
    };
}
