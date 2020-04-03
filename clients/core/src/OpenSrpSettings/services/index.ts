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
    accessToken: string,
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

/** get payload for fetch
 * @param {HTTPMethod} method - the HTTP method
 * @returns the payload
 */
export function getPayload(method: HTTPMethod, accessToken: string) {
    return {
        headers: generateHeaders(accessToken) as HeadersInit,
        method,
    };
}

/** interface to describe URL query params object */
export interface QueryParams {
    [key: string]: string | number | boolean;
}

/** url parameters  */
export interface UrlParameters {
    query?: QueryParams;
    id?: string | number;
    generalUrl: string;
}

/** converts URL query params object to string
 * @param {QueryParams} obj - the object representing URL params
 * @returns {string} URL params as a string
 */
export function getURLParams(obj: QueryParams | {}): string {
    return Object.entries(obj)
        .map(([key, val]) => `${key}=${val}`)
        .join('&');
}

/** get method
 * Send a GET request to the general API endpoint
 * @param {urlParams} UrlParameters - the url params object
 * @param {acessToken} acessToken - the access token
 * @param {HTTPMethod} method - the HTTP method
 * @returns list of objects returned by API
 */
export async function generalGet(urlParams: UrlParameters, accessToken: string, method: HTTPMethod = 'GET') {
    const { query, id, generalUrl } = urlParams;
    const url = `${generalUrl}${urlParams.id ? '/' + id + '?' : '?'}${getURLParams({ ...query })}`;
    const response = await fetch(url, getPayload(method, accessToken));

    if (response.status !== 200) {
        throw new Error(`OpenSRPService read on ${url} failed, HTTP status ${response.status}`);
    }

    return await response.json();
}

/** update method
 * Simply send the updated object as PUT request to the general endpoint URL
 * Successful requests will result in a HTTP status 200/201 response with no body
 * @param {T} data - the data to be POSTed
 * @param {params} params - the url params object
 * @param {HTTPMethod} method - the HTTP method
 * @returns the object returned by API
 */
export async function update<T>(data: T, url: string, accessToken: string, method: HTTPMethod = 'PUT') {
    const payload = {
        ...getPayload(method, accessToken),
        body: JSON.stringify(data),
    };
    const response = await fetch(url, payload);

    if (response.status === 200) {
        throw new Error(`OpenSRPService update on ${url} failed, HTTP status ${response.status}`);
    }

    return response.json();
}
