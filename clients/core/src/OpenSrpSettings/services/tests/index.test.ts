import { settingsUpdate, generalGet, generateHeaders, getURLParams, getPayload } from '..';
import { GlobalWithFetchMock } from 'jest-fetch-mock';

const customGlobal: GlobalWithFetchMock = global as GlobalWithFetchMock;

customGlobal.fetch = require('jest-fetch-mock');
customGlobal.fetchMock = customGlobal.fetch;

/*eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');
const accessToken = 'hunter2';
const headers = {
    accept: 'application/json',
    authorization: 'Bearer hunter2',
    'content-type': 'application/json;charset=UTF-8',
};
const urlParams = {
    generalUrl: 'https://test.smartregister.org',
    id: '0e85c238-39c1-4cea-a926-3d89f0c98427',
    query: { foo: 'test', id: 1337, bar: 'test2' },
};

describe('opensrp services', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        fetch.resetMocks();
    });

    it('generateHeaders works', () => {
        expect(generateHeaders(accessToken)).toEqual({ ...headers });
    });

    it('getPayload works', () => {
        expect(getPayload('GET', accessToken)).toEqual({
            headers,
            method: 'GET',
        });
    });

    it('getURLParams works', () => {
        expect(getURLParams({})).toEqual('');
        expect(getURLParams({ ...urlParams.query })).toEqual('foo=test&id=1337&bar=test2');
    });

    it('generalGet method works', async () => {
        fetch.mockResponseOnce(JSON.stringify({ bar: 'fofo' }));
        const result = await generalGet(urlParams, accessToken);
        expect(result).toEqual({ bar: 'fofo' });
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/0e85c238-39c1-4cea-a926-3d89f0c98427?foo=test&id=1337&bar=test2',
                {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer hunter2',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'GET',
                },
            ],
        ]);
    });

    it('generalGet method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        let error;
        try {
            await generalGet(urlParams, accessToken);
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(
            new Error(
                'https://test.smartregister.org/0e85c238-39c1-4cea-a926-3d89f0c98427?foo=test&id=1337&bar=test2 failed, HTTP status 500',
            ),
        );
    });

    it('OpenSRPService update method works', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const url = `${urlParams.generalUrl}/${urlParams.id}`;
        const data = { fofo: 'bar' };
        const result = await settingsUpdate(data, url, accessToken);
        expect(result).toEqual({});
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/0e85c238-39c1-4cea-a926-3d89f0c98427',
                {
                    body: JSON.stringify(data),
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer hunter2',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'PUT',
                },
            ],
        ]);
    });

    it('OpenSRPService update method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const url = `${urlParams.generalUrl}/${urlParams.id}`;
        const data = { fofo: 'bar' };
        let error;
        try {
            await settingsUpdate(data, url, accessToken);
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(
            new Error('https://test.smartregister.org/0e85c238-39c1-4cea-a926-3d89f0c98427 failed, HTTP status 500'),
        );
    });
});
