import { mount } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import { DurationType, FilterCardsCategorizer, groupFilterData, isInPeriod, TimeUnit } from '..';
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
    const period: DurationType = {
      timeLength: 2,
      timeUnit: TimeUnit.WEEK,
    };
    const result = groupFilterData<any, Array<{}>>(
      [period],
      filterTestData,
      new Set(['HighRisk', 'LowRisk']),
      'risk',
      'edd',
      []
    );
    const expected = [
      {
        filterFunction: expect.anything(),
        filterId: 'FILTER_CARDS',
        filteredData: [
          {
            edd: 1573471123481,
            id: '2',
            risk: 'HighRisk',
          },
        ],
        meta: {
          category: 'HighRisk',
          timeLength: 2,
          timeUnit: 'week',
        },
        parentFilters: [],
      },
      {
        filterFunction: expect.anything(),
        filterId: 'FILTER_CARDS',
        filteredData: [
          {
            edd: 1573471123481,
            id: '4',
            risk: 'LowRisk',
          },
        ],
        meta: {
          category: 'LowRisk',
          timeLength: 2,
          timeUnit: 'week',
        },
        parentFilters: [],
      },
    ];
    expect(result).toMatchObject(expected);
  });

  it('Correctly checks a date is without a given range', () => {
    const dataObj = filterTestData[0];
    const period: DurationType = {
      timeLength: 2,
      timeUnit: TimeUnit.WEEK,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeFalsy();
  });

  it('Correctly checks a date is within a given range', () => {
    const dataObj = filterTestData[3];
    const period: DurationType = {
      timeLength: 2,
      timeUnit: TimeUnit.WEEK,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeTruthy();
  });

  it('Correctly checks a date is right on the margin of range', () => {
    // prepare the start data as well as the endDate for the dataObj
    const startDate = 1572599427171;
    const dataObj = filterTestData[3];
    dataObj.edd = startDate + 14 * 24 * 60 * 60 * 1000;
    const period: DurationType = {
      timeLength: 2,
      timeUnit: TimeUnit.WEEK,
    };
    const result = isInPeriod(dataObj, period, 'edd');
    expect(result).toBeTruthy();
  });
});

describe('src/components/filterCardsCategorizer.FilterCardsCategorizer', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });
  it('renders correctly', () => {
    // tslint:disable-next-line: jsx-no-lambda
    const wrapper = mount(<FilterCardsCategorizer renderCard={f => <div className="dummy" />} />);
    expect(toJson(wrapper.find('.dummy'))).toMatchInlineSnapshot(`
      <div
        className="dummy"
      />
    `);
  });

  it('calls renderCard props with correct arguments', () => {
    const renderMock = jest.fn(() => <div className="dummy" />);
    const period: DurationType = {
      timeLength: 2,
      timeUnit: TimeUnit.WEEK,
    };
    const props = {
      accessor: 'risk',
      categories: new Set(['HighRisk', 'LowRisk']),
      data: filterTestData,
      parentFilters: [],
      periods: [period],
      renderCard: renderMock,
      timeAccessor: 'edd',
    };
    const wrapper = mount(<FilterCardsCategorizer {...props} />);
    expect(renderMock).toHaveBeenCalled();

    const expected = [
      {
        filterFunction: expect.anything(),
        filterId: 'FILTER_CARDS',
        filteredData: [
          { edd: 1573903123481, id: '1', risk: 'HighRisk' },
          { edd: 1573471123481, id: '2', risk: 'HighRisk' },
        ],
        meta: { category: 'HighRisk', timeLength: 2, timeUnit: 'week' },
        parentFilters: [],
      },
      {
        filterFunction: expect.anything(),
        filterId: 'FILTER_CARDS',
        filteredData: [
          { edd: 1573903123481, id: '3', risk: 'LowRisk' },
          { edd: 1573809027171, id: '4', risk: 'LowRisk' },
        ],
        meta: { category: 'LowRisk', timeLength: 2, timeUnit: 'week' },
        parentFilters: [],
      },
    ];

    expect((renderMock.mock.calls[1] as any)[0]).toMatchObject(expected);
  });
});
