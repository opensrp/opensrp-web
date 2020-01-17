import * as gatekeeper from '@onaio/gatekeeper';
import { ONADATA_OAUTH_STATE, OPENSRP_OAUTH_STATE } from '../../configs/env';

import {
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_WOMAN,
  NUTRITION,
  NUTRITION_COMPARTMENTS_URL,
  PREGNANCY,
  PREGNANCY_COMPARTMENTS_URL,
} from '../../constants';
import { smsDataFixtures } from '../../containers/Compartments/test/fixtures';
import {
  communes,
  districts,
  provinces,
  villages,
} from '../../containers/HierarchichalDataTable/test/fixtures';
import { SmsData } from '../../store/ducks/sms_events';
import {
  buildHeaderBreadCrumb,
  convertMilisecondsToYear,
  filterByPatientId,
  getLinkToHierarchichalDataTable,
  getLinkToPatientDetail,
  getModuleLink,
  getNumberOfDaysSinceDate,
  getNumberSuffix,
  groupBy,
  headerShouldNotRender,
  locationDataIsAvailable,
  oAuthUserInfoGetter,
  sortByEventDate,
  sortFunction,
} from '../utils';
import groupedSmsData from './fixtures';

jest.mock('@onaio/gatekeeper', () => ({
  getOnadataUserInfo: jest.fn(),
  getOpenSRPUserInfo: jest.fn(),
}));

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
    const smsDataItem = smsDataFixtures[9];
    smsDataItem.client_type = 'NULL';
    expect(getLinkToPatientDetail(smsDataFixtures[9], 'test')).toEqual('#');
  });
});

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

describe('helpers/utils/convertMillisecondsToYear', () => {
  it('must return correct value for given input', () => {
    expect(convertMilisecondsToYear(new Date('01/01/2020').getTime())).toEqual(50);
    expect(convertMilisecondsToYear(new Date('01/01/1997').getTime())).toEqual(27);
    expect(convertMilisecondsToYear(new Date('01/01/2007').getTime())).toEqual(37);
  });
});

describe('getNumberSuffix', () => {
  it('returns correct values for given inputs', () => {
    expect(getNumberSuffix(1)).toEqual('st');
    expect(getNumberSuffix(2)).toEqual('nd');
    expect(getNumberSuffix(3)).toEqual('rd');
    expect(getNumberSuffix(4)).toEqual('th');
  });
});

describe('sortFuction', () => {
  it('returns 0 when the sms event_id is the same', () => {
    const smsData1: SmsData = JSON.parse(JSON.stringify(smsDataFixtures[0]));
    expect(sortFunction(smsData1, smsData1)).toEqual(0);
  });
  it('returns 1 when the second sms event_id is larger than the first', () => {
    const smsData1: SmsData = JSON.parse(JSON.stringify(smsDataFixtures[0]));
    const smsData2: SmsData = JSON.parse(JSON.stringify(smsDataFixtures[1]));
    smsData2.event_id = `{Number(smsData1.event_id) + 3}`;
    expect(sortFunction(smsData1, smsData2)).toEqual(1);
  });
  it('returns -1 when the first sms event_id is larger than the second', () => {
    const smsData1: SmsData = JSON.parse(JSON.stringify(smsDataFixtures[0]));
    const smsData2: SmsData = JSON.parse(JSON.stringify(smsDataFixtures[1]));
    smsData2.event_id = `{Number(smsData1.event_id) + 3}`;
    expect(sortFunction(smsData2, smsData1)).toEqual(-1);
  });
});

describe('getModuleLink', () => {
  it('returns the correct value given specific input', () => {
    expect(getModuleLink(PREGNANCY)).toEqual(PREGNANCY_COMPARTMENTS_URL);
    expect(getModuleLink(NUTRITION)).toEqual(NUTRITION_COMPARTMENTS_URL);
    expect(getModuleLink(NBC_AND_PNC_CHILD)).toEqual(NBC_AND_PNC_COMPARTMENTS_URL);
    expect(getModuleLink(NBC_AND_PNC_WOMAN)).toEqual(NBC_AND_PNC_COMPARTMENTS_URL);
  });
});

describe('getLinkToHierarchichalDataTable', () => {
  expect(
    getLinkToHierarchichalDataTable('low', PREGNANCY, 'test title', 0, 'location023423423423')
  ).toEqual(
    '/pregnancy_compartments/hierarchicaldata/Pregnancy/low/test title/0/down/location023423423423/0'
  );
});

describe('buildHeaderBreadCrumb', () => {
  it('works correctly if location id is a province', () => {
    expect(
      buildHeaderBreadCrumb(
        'd79168ed-ae95-43d1-8e45-9078212815f6',
        provinces,
        districts,
        communes,
        villages,
        'd1865325-11e6-4e39-817b-e676c1affecf'
      )
    ).toEqual({
      level: 'Province',
      location: 'Lang Son Province',
      locationId: 'd79168ed-ae95-43d1-8e45-9078212815f6',
      path: '',
    });
  });

  it('works correctly if location id is a district', () => {
    expect(
      buildHeaderBreadCrumb(
        '623b644d-a1f2-4c5e-b065-d60c0ae6501f',
        provinces,
        districts,
        communes,
        villages,
        'd1865325-11e6-4e39-817b-e676c1affecf'
      )
    ).toEqual({
      level: 'District',
      location: 'Tay Ho District',
      locationId: '623b644d-a1f2-4c5e-b065-d60c0ae6501f',
      path: 'Hanoi / ',
    });
  });

  it('works correctly if location id is a commune', () => {
    expect(
      buildHeaderBreadCrumb(
        '46d98781-7cc4-4c28-8379-a3552a57acfe',
        provinces,
        districts,
        communes,
        villages,
        'd1865325-11e6-4e39-817b-e676c1affecf'
      )
    ).toEqual({
      level: 'Commune',
      location: 'Yen Phu Ward',
      locationId: '46d98781-7cc4-4c28-8379-a3552a57acfe',
      path: 'Hanoi / Tay Ho District / ',
    });
  });
  it('works correctly if location id is a village', () => {
    expect(
      buildHeaderBreadCrumb(
        'bb37165f-2ee9-4cad-a3b5-020c0cc75ccf',
        provinces,
        districts,
        communes,
        villages,
        'd1865325-11e6-4e39-817b-e676c1affecf'
      )
    ).toEqual({
      level: 'Village',
      location: 'Yen Phu Village',
      locationId: 'bb37165f-2ee9-4cad-a3b5-020c0cc75ccf',
      path: 'Hanoi / Tay Ho District / Yen Phu Ward / ',
    });
  });
});

describe('location data is available', () => {
  expect(locationDataIsAvailable(villages, communes, districts, provinces)).toEqual(4);
  expect(locationDataIsAvailable([], [], [], [])).toEqual(0);
});

describe('getNumberOfDaysSinceDate', () => {
  it('returns the correct number of days between 1/1/2020 and now', () => {
    const dateString = '01/01/2020';
    expect(getNumberOfDaysSinceDate(dateString)).toEqual(
      Math.floor((new Date().getTime() - new Date(dateString).getTime()) / (1000 * 3600 * 24))
    );
  });
});
