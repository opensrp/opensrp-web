import { OpenSRPService, getFetchOptions, URLParams, throwHTTPError } from '@opensrp/server-service';

type HTTPMethod = 'GET' | 'POST';

/** params option type */
type paramsType = URLParams | null;

export class OpenSRPServiceCustom extends OpenSRPService {
    constructor(baseURL: string, endpoint: string, getPayload: typeof getFetchOptions) {
        super(baseURL, endpoint, getPayload);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public async readFile(params: paramsType = null, method: HTTPMethod = 'GET'): Promise<any> {
        const url = OpenSRPService.getURL(this.generalURL, params);
        const response = await fetch(url, this.getOptions(this.signal, method));

        if (response) {
            if (response.ok) {
                return await response.blob();
            }
            const defaultMessage = `OpenSRPService list on ${this.endpoint} failed, HTTP status ${response.status}`;
            await throwHTTPError(response, defaultMessage);
        }
    }
}

/**
 * Handles file downloads from server
 * @param {string} baseUrl base url
 * @param {string} endpoint  endpoint
 * @param {getFetchOptions} getPayload gets header options
 * @param {string} Filename file name
 * @param {paramsType} params url search parameters
 */
export const handleDownload = async (
    baseURL: string,
    endpoint: string,
    getPayload: typeof getFetchOptions,
    fileName: string,
    params: paramsType = null,
) => {
    const downloadService = new OpenSRPServiceCustom(baseURL, endpoint, getPayload);
    downloadService
        .readFile(params)
        .then((res: typeof Blob) => {
            const url = window.URL.createObjectURL(res);
            const a = document.createElement('a');
            document.body.appendChild(a);
            a.href = url;
            a.download = fileName;
            a.click();
            window.URL.revokeObjectURL(url);
        })
        .catch(() => {
            // to handle error
        });
};
