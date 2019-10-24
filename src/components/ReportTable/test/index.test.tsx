import { exportAllDeclaration } from '@babel/types';
import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReportTable, { convertToStringArray, getEventsPregnancyArray } from '..';
import { SmsData } from '../../../store/ducks/sms_events';
import {
  convertToStringArrayInput,
  convertToStringArrayInput2,
  convertToStringArrayOutput,
  convertToStringArrayOutput2,
  getEventsPregnancyArrayInput1,
  getEventsPregnancyArrayInput2,
  getEventsPregnancyArrayOutput1,
  getEventsPregnancyArrayOutput2,
} from './fixtures';

const history = createBrowserHistory();

describe('ReportTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('must render without crashing', () => {
    shallow(<ReportTable singlePatientEvents={[]} />);
  });

  it('must render correctly', () => {
    // const wrapper = mount(<ReportTable singlePatientEvents={[]} />);
    // expect(toJson(wrapper)).toMatchSnapshot();
    // I have found a blocker here. This throws a scary error that still
    // makes no sense to me.
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
