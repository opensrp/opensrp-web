import * as gatekeeper from '@onaio/gatekeeper';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../../configs/env';

import { smsDataFixtures } from '../../containers/Compartments/test/fixtures';
import {
  getLinkToPatientDetail,
  groupBy,
  headerShouldNotRender,
  oAuthUserInfoGetter,
} from '../utils';
import groupedSmsData from './fixtures';

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

  it('Ensure header should render works correctly', () => {
    window.history.pushState({}, 'Page Title', '/login');
    expect(headerShouldNotRender()).toBe(true);
  });

  it('Ensure groupBy works correctly', () => {
    expect(groupBy(smsDataFixtures.slice(0, 3), 'event_id')).toEqual(groupedSmsData);
  });
});

describe('helpers/utils/getLinkToPatientDetail', () => {
  it('returns correct value when the client_type field is set to ec_woman', () => {
    expect(getLinkToPatientDetail(smsDataFixtures[0], 'test')).toEqual(
      'test/patient_detail/100NG6'
    );
  });

  it('returns correct value when the client type field is set to ec_child', () => {
    expect(getLinkToPatientDetail(smsDataFixtures[8], 'test')).toEqual(
      'test/child_patient_detail/100P9K-20191001-01'
    );
  });

  it('returns correct value when the client_type field is set to ec_woman', () => {
    const smsDataItem = smsDataFixtures[0];
    smsDataItem.client_type = 'NULL';
    expect(getLinkToPatientDetail(smsDataFixtures[0], 'test')).toEqual('#');
  });
});
