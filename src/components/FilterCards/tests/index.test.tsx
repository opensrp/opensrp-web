import React from 'react';
import { groupFilterData, isInPeriod, TimeUnits } from '..';
import { filterTestData } from './fixtures';

// TODO - understand this; document this
const realDateNow = Date.now.bind(global.Date);

describe('src/components/FilterCards.utils', () => {
  beforeEach(() => {
    jest.resetAllMocks();
    const dateNowStub = jest.fn(() => 1572607123481);
    global.Date.now = dateNowStub;
  });

  afterEach(() => {
    global.Date.now = realDateNow;
  });

  it('groups filtered data correctly ', () => {
    const period = {
      howLong: 2,
      unit: TimeUnits.WEEKS,
    };
    const result = groupFilterData<any>(
      [period],
      filterTestData,
      new Set(['HighRisk', 'LowRisk']),
      'risk',
      'edd'
    );
    const expected = [
      {
        filteredData: [
          {
            edd: 1573471123481,
            id: '2',
            risk: 'HighRisk',
          },
        ],
        meta: {
          category: 'HighRisk',
          howLong: 2,
          unit: `weeks`,
        },
      },
      {
        filteredData: [
          {
            edd: 1573471123481,
            id: '4',
            risk: 'LowRisk',
          },
        ],
        meta: {
          category: 'LowRisk',
          howLong: 2,
          unit: `weeks`,
        },
      },
    ];
    expect(result).toEqual(expected);
  });

  it('Correctly checks a date is without a given range', () => {
    const dataObj = filterTestData[0];
    const period = {
      howLong: 2,
      unit: TimeUnits.WEEKS,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeFalsy();
  });

  it('Correctly checks a date is within a given range', () => {
    const dataObj = filterTestData[3];
    const period = {
      howLong: 2,
      unit: TimeUnits.WEEKS,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeTruthy();
  });

  it('Correctly checks a date is right on the margin of range', () => {
    // prepare the start data as well as the endDate for the dataObj
    const startDate = 1572599427171;
    const dataObj = filterTestData[3];
    dataObj.edd = startDate + 14 * 24 * 60 * 60 * 1000;
    const period = {
      howLong: 2,
      unit: TimeUnits.WEEKS,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeTruthy();
  });
});
