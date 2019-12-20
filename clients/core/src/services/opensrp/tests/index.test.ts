import { getOpenSRPUserInfo } from '@onaio/gatekeeper';
import { authenticateUser } from '@onaio/session-reducer';
import store from '../../../store';
import { generateHeaders, generatePayload } from '../index';
import { OpenSRPAPIResponse } from './fixtures/session';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const fetch = require('jest-fetch-mock');

jest.mock('../../../configs/env');

describe('services/OpenSRP', () => {
    const { authenticated, user, extraData } = getOpenSRPUserInfo(OpenSRPAPIResponse);
    store.dispatch(authenticateUser(authenticated, user, extraData));

    beforeEach(() => {
        jest.resetAllMocks();
        fetch.resetMocks();
    });

    it('getDefaultHeaders works', async () => {
        expect(generateHeaders()).toEqual({
            accept: 'application/json',
            authorization: 'Bearer hunter2',
            'content-type': 'application/json;charset=UTF-8',
        });
    });

    it('generatePayload works fine', async () => {
        const signal = new AbortController().signal;
        const response = generatePayload(signal, 'GET');
        expect(response).toEqual({
            headers: {
                accept: 'application/json',
                authorization: 'Bearer hunter2',
                'content-type': 'application/json;charset=UTF-8',
            },
            method: 'GET',
            signal: signal,
        });
    });
});
