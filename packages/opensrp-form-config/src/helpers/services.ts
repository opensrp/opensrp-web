import { OpenSRPService, getFetchOptions, URLParams, throwHTTPError } from '@opensrp/server-service';

export const getToken = (getPayload: typeof getFetchOptions): string => {
    const { headers } = getPayload(new AbortController().signal, 'POST');
    return (headers as any).authorization || (headers as any).Authorization;
};

/**
 * extends class OpenSRPService
 */
export class OpenSRPServiceExtend extends OpenSRPService {
    public token: string;
    constructor(baseURL: string, endpoint: string, getPayload: typeof getFetchOptions = getFetchOptions) {
        super(baseURL, endpoint, getPayload);
        this.token = getToken(getPayload);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async postData(data: any, params: URLParams | null = null) {
        const url = OpenSRPService.getURL(`${this.generalURL}`, params);
        const response = await fetch(url, {
            body: data,
            headers: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Authorization: this.token,
            },
            method: 'POST',
        });

        if (response) {
            if (response.ok || response.status === 201) {
                return {};
            }
            const responseClone = response.clone();
            const status = `HTTP status ${response?.status}`;
            let defaultMessage = `OpenSRPService create on ${this.endpoint} failed, ${status}`;
            if (!response.ok) {
                await response.text().then(text => {
                    // if text has words html or doctype in it don't show
                    // that will be an html string
                    defaultMessage =
                        text && !(text.includes('html') || text.includes('doctype'))
                            ? `${text}, ${status}`
                            : defaultMessage;
                });
            }
            await throwHTTPError(responseClone, defaultMessage);
        }
    }
}
