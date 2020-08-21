import { getFetchOptions } from '@opensrp/server-service';
import { OpenSRPServiceExtend, getToken } from '../services';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');

const baseUrl = 'https://test.smartregister.org/opensrp/rest/';

describe('OpenSRPServiceExtend', () => {
    it('should get token', () => {
        expect(getToken(getFetchOptions)).toEqual('Bearer hunter2');
    });

    it('should post data', () => {
        const service = new OpenSRPServiceExtend(baseUrl, 'files', getFetchOptions);
        service.postData({ test: 'data' });
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/files',
                {
                    body: {
                        test: 'data',
                    },
                    headers: {
                        Authorization: 'Bearer hunter2',
                    },
                    method: 'POST',
                },
            ],
        ]);
    });

    it('OpenSRPService attaches a non successful apiResponse correctly', async () => {
        // json apiResponse object
        const statusText = 'something happened';
        fetch.mockResponseOnce(JSON.stringify('Some error happened'), { status: 500, statusText });
        fetch.mockResponseOnce(
            JSON.stringify(
                '<!doctype html><html lang="en"><head><title>HTTP Status 401 – Unauthorized</title><style type="text/css">h1 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:22px;} h2 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:16px;} h3 {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;font-size:14px;} body {font-family:Tahoma,Arial,sans-serif;color:black;background-color:white;} b {font-family:Tahoma,Arial,sans-serif;color:white;background-color:#525D76;} p {font-family:Tahoma,Arial,sans-serif;background:white;color:black;font-size:12px;} a {color:black;} a.name {color:black;} .line {height:1px;background-color:#525D76;border:none;}</style></head><body><h1>HTTP Status 401 – Unauthorized</h1><hr class="line" /><p><b>Type</b> Status Report</p><p><b>Message</b> Unable to authenticate using the Authorization header</p><p><b>Description</b> The request has not been applied because it lacks valid authentication credentials for the target resource.</p><hr class="line" /><h3>Apache Tomcat/9.0.26</h3></body></html>',
            ),
            { status: 401, statusText },
        );
        const service = new OpenSRPServiceExtend(baseUrl, 'form');
        let error;
        try {
            await service.postData({ foo: 'bar' });
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('"Some error happened", HTTP status 500'));
        expect(error.description).toEqual('"Some error happened"');
        expect(error.statusText).toEqual('something happened');
        expect(error.statusCode).toEqual(500);

        try {
            await service.postData({ foo: 'bar' });
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService create on form failed, HTTP status 401'));
        expect(error.statusCode).toEqual(401);
    });
});
