import * as gatekeeper from '@onaio/gatekeeper';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../../configs/env';

import { oAuthUserInfoGetter, calculateAge, countDaysBetweenDate } from '../utils';

jest.mock('@onaio/gatekeeper', () => ({
    getOnadataUserInfo: jest.fn(),
    getOpenSRPUserInfo: jest.fn(),
}));

describe('helpers/utils', () => {
    beforeEach(() => {
        jest.resetAllMocks();
    });

    it('oAuthUserInfoGetter works for OpenSRP', () => {
        const mock = jest.spyOn(gatekeeper, 'getOpenSRPUserInfo');
        const resp = { foo: 'bar', oAuth2Data: { state: OPENSRP_OAUTH_STATE } };
        oAuthUserInfoGetter(resp);
        expect(mock).toHaveBeenCalledWith(resp);
        mock.mockRestore();
    });

    it('oAuthUserInfoGetter works for Ona', () => {
        const mock = jest.spyOn(gatekeeper, 'getOnadataUserInfo');
        const resp = { foo: 'bar', oAuth2Data: { state: ONADATA_OAUTH_STATE } };
        oAuthUserInfoGetter(resp);
        expect(mock).toHaveBeenCalledWith(resp);
        mock.mockRestore();
    });

    it('oAuthUserInfoGetter works for unknown provider', () => {
        const onaMock = jest.spyOn(gatekeeper, 'getOnadataUserInfo');
        const openSRPMock = jest.spyOn(gatekeeper, 'getOpenSRPUserInfo');
        const resp = { foo: 'bar', oAuth2Data: { state: 'someOtherState' } };
        expect(oAuthUserInfoGetter(resp)).toBeUndefined();
        expect(onaMock).not.toBeCalled();
        expect(openSRPMock).not.toBeCalled();
        onaMock.mockRestore();
        openSRPMock.mockRestore();
    });

    it('should calculate age correctly', () => {
        const timestamp: number = 1265068800000;
        expect(calculateAge(timestamp)).toBe(10);
    });

    it('should count days correctly', () => {
        const startDate = new Date('2020-10-02').getTime();
        const endDate = new Date('2020-10-10').getTime();
        expect(countDaysBetweenDate(startDate, endDate)).toBe(8);
    });
});
