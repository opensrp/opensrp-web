import { getFetchOptions } from '@opensrp/server-service';
import { OpenSRPServiceExtend, getToken } from '../services';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');

describe('OpenSRPServiceExtend', () => {
    it('should get token', () => {
        expect(getToken(getFetchOptions)).toEqual('Bearer hunter2');
    });

    it('should post data', () => {
        const service = new OpenSRPServiceExtend(
            'https://test.smartregister.org/opensrp/rest/',
            'files',
            getFetchOptions,
        );
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
});
