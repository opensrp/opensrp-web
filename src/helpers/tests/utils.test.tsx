import * as gatekeeper from '@onaio/gatekeeper';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../../configs/env';

import { smsDataFixtures } from '../../containers/Compartments/test/fixtures';
import { SmsData } from '../../store/ducks/sms_events';
import {
  filterByPatientId,
  getLinkToPatientDetail,
  groupBy,
  headerShouldNotRender,
  oAuthUserInfoGetter,
  sortByEventDate,
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

describe('helpers/utils/filterByPatientId', () => {
  it('must returns the correct value given certain input', () => {
    const patientId = '100NG6';
    const filteredData = [...smsDataFixtures].filter((dataItem: SmsData): boolean => {
      return dataItem.anc_id.toLocaleLowerCase().includes(patientId.toLocaleLowerCase());
    });
    expect(
      filterByPatientId({
        patientId,
        smsData: [...smsDataFixtures],
      })
    ).toEqual(filteredData);
  });
});

describe('helpers/utils/sortByEventDate', () => {
  it('must sort data in ascending order based on the event date', () => {
    const sortedSmsData = [...smsDataFixtures].sort((event1: SmsData, event2: SmsData): number => {
      if (event1.EventDate < event2.EventDate) {
        return -1;
      }
      if (event1.EventDate > event2.EventDate) {
        return 1;
      }
      return 0;
    });
    expect(sortByEventDate(smsDataFixtures)).toEqual(sortedSmsData);
  });
});
