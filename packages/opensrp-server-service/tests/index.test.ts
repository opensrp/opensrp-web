import { getDefaultHeaders, getFilterParams, getURLParams, OpenSRPService, OPENSRP_API_BASE_URL } from '../index';
import { createPlan, plansListResponse } from './fixtures/plans';
/* eslint-disable-next-line @typescript-eslint/no-var-requires */
const fetch = require('jest-fetch-mock');

describe('services/OpenSRP', () => {
    beforeEach(() => {
        jest.resetAllMocks();
        fetch.resetMocks();
    });

    it('getDefaultHeaders works', async () => {
        expect(getDefaultHeaders('iLoveOov')).toEqual({
            accept: 'application/json',
            authorization: 'Bearer iLoveOov',
            'content-type': 'application/json;charset=UTF-8',
        });
    });

    it('OpenSRPService constructor works', async () => {
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        expect(planService.baseURL).toEqual('https://test.smartregister.org/opensrp/rest/');
        expect(planService.endpoint).toEqual('plans');
        expect(planService.generalURL).toEqual('https://test.smartregister.org/opensrp/rest/plans');
    });

    it('getURLParams works', async () => {
        expect(getURLParams({})).toEqual('');
        expect(getURLParams({ foo: 'bar', leet: 1337, mosh: 'pitt' })).toEqual('foo=bar&leet=1337&mosh=pitt');
    });

    it('getFilterParams works', async () => {
        expect(getFilterParams({})).toEqual('');
        expect(getFilterParams({ foo: 'bar', leet: 1337, mosh: 'pitt' })).toEqual('foo:bar,leet:1337,mosh:pitt');
    });

    // list method

    it('OpenSRPService list method works', async () => {
        fetch.mockResponseOnce(JSON.stringify(plansListResponse));
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        const result = await planService.list();
        expect(result).toEqual(plansListResponse);
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/plans',
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

    it('OpenSRPService list method params work', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'location');
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        await service.list({ is_jurisdiction: true });
        expect(fetch.mock.calls[0][0]).toEqual(
            'https://test.smartregister.org/opensrp/rest/location?is_jurisdiction=true',
        );
    });

    it('OpenSRPService list method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        let error;
        try {
            await planService.list();
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService list on plans failed, HTTP status 500'));
    });

    // delete method

    it('OpenSRPService delete method works', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'practitioners');
        const result = await service.delete({ practitioner: 'someone' });
        expect(result).toEqual({});
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/practitioners?practitioner=someone',
                {
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer hunter2',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'DELETE',
                },
            ],
        ]);
    });

    it('OpenSRPService delete method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'practitioners');
        let error;
        try {
            await service.delete({});
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService delete on practitioners failed, HTTP status 500'));
    });

    // read method

    it('OpenSRPService read method works', async () => {
        fetch.mockResponseOnce(JSON.stringify(plansListResponse[0]));
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        const result = await planService.read('0e85c238-39c1-4cea-a926-3d89f0c98427');
        expect(result).toEqual(plansListResponse[0]);
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/plans/0e85c238-39c1-4cea-a926-3d89f0c98427',
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

    it('OpenSRPService read method handles null response', async () => {
        fetch.mockResponseOnce(JSON.stringify(null));
        const taskService = new OpenSRPService(OPENSRP_API_BASE_URL, 'task');
        const result = await taskService.read('079a7fe8-ef46-462f-9c5c-8b2490344e4a');
        expect(result).toEqual(null);
    });

    it('OpenSRPService read method params work', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'location');
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        await service.read('62b2f313', { is_jurisdiction: true });
        expect(fetch.mock.calls[0][0]).toEqual(
            'https://test.smartregister.org/opensrp/rest/location/62b2f313?is_jurisdiction=true',
        );
    });

    it('OpenSRPService read method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        let error;
        try {
            await planService.read('0e85c238-39c1-4cea-a926-3d89f0c98427');
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService read on plans failed, HTTP status 500'));
    });

    it('OpenSRPService create method works', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 201 });
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        const result = await planService.create(createPlan);
        expect(result).toEqual({});
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/plans',
                {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    body: JSON.stringify(createPlan),
                    headers: {
                        accept: 'application/json',
                        authorization: 'Bearer hunter2',
                        'content-type': 'application/json;charset=UTF-8',
                    },
                    method: 'POST',
                },
            ],
        ]);
    });

    it('OpenSRPService create method params work', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 201 });
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'location');
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        await service.create({ foo: 'bar' }, { is_jurisdiction: true });
        expect(fetch.mock.calls[0][0]).toEqual(
            'https://test.smartregister.org/opensrp/rest/location?is_jurisdiction=true',
        );
    });

    it('OpenSRPService create method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        let error;
        try {
            await planService.create({ foo: 'bar' });
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService create on plans failed, HTTP status 500'));
    });

    it('OpenSRPService update method works', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        const obj = {
            ...createPlan,
            status: 'retired',
        };
        const result = await planService.update(obj);
        expect(result).toEqual({});
        expect(fetch.mock.calls).toEqual([
            [
                'https://test.smartregister.org/opensrp/rest/plans',
                {
                    'Cache-Control': 'no-cache',
                    Pragma: 'no-cache',
                    body: JSON.stringify(obj),
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

    it('OpenSRPService update method params work', async () => {
        fetch.mockResponseOnce(JSON.stringify({}));
        const service = new OpenSRPService(OPENSRP_API_BASE_URL, 'location');
        /* eslint-disable-next-line @typescript-eslint/camelcase */
        await service.update({ foo: 'bar' }, { is_jurisdiction: true });
        expect(fetch.mock.calls[0][0]).toEqual(
            'https://test.smartregister.org/opensrp/rest/location?is_jurisdiction=true',
        );
    });

    it('OpenSRPService update method should handle http errors', async () => {
        fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });
        const planService = new OpenSRPService(OPENSRP_API_BASE_URL, 'plans');
        let error;
        try {
            await planService.update({ foo: 'bar' });
        } catch (e) {
            error = e;
        }
        expect(error).toEqual(new Error('OpenSRPService update on plans failed, HTTP status 500'));
    });
});
