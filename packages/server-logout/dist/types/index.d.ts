/** allowed http methods */
export declare type HTTPMethod = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface Payload {
    headers: HeadersInit;
    method: HTTPMethod;
}
export declare const defaultErrorCallback: () => void;
/** custom function that logs user from both a keycloak authorization server
 * and the opensrp server
 * @param payload - payload to add to the fetch request
 * @param openSRPLogoutUri - url to logout from opensrp
 * @param keycloakLogoutUri - url to logout from keycloak
 * @param redirectUri - uri to redirect to after logout
 * - its attached to the keycloak logout uri as a searchParam with key redirect_uri
 */
export declare const logout: (payload: Payload, opensrpLogoutUri: string, keycloakLogoutUri: string, redirectUri: string) => Promise<null>;
