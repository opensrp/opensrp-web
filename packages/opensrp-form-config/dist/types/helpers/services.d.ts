import { OpenSRPService, getFetchOptions, URLParams } from '@opensrp/server-service';
export declare const getToken: (getPayload: typeof getFetchOptions) => string;
/**
 * extends class OpenSRPService
 */
export declare class OpenSRPServiceExtend extends OpenSRPService {
    token: string;
    constructor(baseURL: string, endpoint: string, getPayload?: typeof getFetchOptions);
    postData(data: any, params?: URLParams | null): Promise<{} | undefined>;
}
