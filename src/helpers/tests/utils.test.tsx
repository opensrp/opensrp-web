import * as gatekeeper from '@onaio/gatekeeper';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../../configs/env';
import * as rawClientFixture from '../../services/clients/tests/fixtures';
import { extractClient } from '../utils';

import { oAuthUserInfoGetter } from '../utils';

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

  it('extracts clients correctly', () => {
    const { rawClient1 } = rawClientFixture;
    const expected = {
      firstName: 'Khumpai',
      gender: 'Male',
      id: '9b67a82d-dac7-40c0-85aa-e5976339a6b6',
      lastContactDate: '',
      lastName: 'Family',
      location: '',
      middleName: '',
      type: 'Client',
    };
    expect(extractClient(rawClient1)).toEqual(expected);
  });
});
