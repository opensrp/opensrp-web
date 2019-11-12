import { exportAllDeclaration } from '@babel/types';
import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReportTable, {
  convertToStringArray,
  getEventsPregnancyArray,
  removeDuplicateWeights,
} from '..';
import { SmsData } from '../../../store/ducks/sms_events';
import {
  convertToStringArrayInput,
  convertToStringArrayInput2,
  convertToStringArrayOutput,
  convertToStringArrayOutput2,
  emoveDuplicateWeightsOutput2,
  getEventsPregnancyArrayInput1,
  getEventsPregnancyArrayInput2,
  getEventsPregnancyArrayOutput1,
  getEventsPregnancyArrayOutput2,
  removeDuplicateWeightsInput1,
  removeDuplicateWeightsInput2,
  removeDuplicateWeightsOutput1,
  reportTableProps,
} from './fixtures';

const history = createBrowserHistory();

jest.genMockFromModule('highcharts');
jest.mock('highcharts');

describe('ReportTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('must render without crashing', () => {
    shallow(<ReportTable singlePatientEvents={[]} />);
  });

  it('must render correctly', () => {
    const wrapper = mount(<ReportTable singlePatientEvents={reportTableProps as SmsData[]} />);
    expect(toJson(wrapper.find('tbody'))).toMatchSnapshot();
  });
});

describe('convertToStringArray() ', () => {
  it('must return the correct value for the provided input', () => {
    expect(convertToStringArray(convertToStringArrayInput2)).toEqual(convertToStringArrayOutput2);
    expect(convertToStringArray(convertToStringArrayInput)).toEqual(convertToStringArrayOutput);
  });
});

describe('getEventsPregnancyArray()', () => {
  it('must return the correct value for the provided input', () => {
    expect(getEventsPregnancyArray(getEventsPregnancyArrayInput1 as SmsData[])).toEqual(
      getEventsPregnancyArrayOutput1
    );
    expect(getEventsPregnancyArray(getEventsPregnancyArrayInput2)).toEqual(
      getEventsPregnancyArrayOutput2
    );
  });
});

describe('removeDuplicateWeights()', () => {
  it('must return the correct value for provided input', () => {
    expect(removeDuplicateWeights(removeDuplicateWeightsInput1)).toEqual(
      removeDuplicateWeightsOutput1
    );
    expect(removeDuplicateWeights(removeDuplicateWeightsInput2)).toEqual(
      emoveDuplicateWeightsOutput2
    );
  });
});
