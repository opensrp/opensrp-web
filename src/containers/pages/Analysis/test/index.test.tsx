import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Analysis from '..';
import { SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT } from '../../../../configs/env';

describe('Analysis', () => {
  it('must render without crashing', () => {
    shallow(<Analysis endpoint={SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT} />);
  });

  it('must render correctly', () => {
    const wrapper = mount(<Analysis endpoint={SUPERSET_PREGNANCY_ANALYSIS_ENDPOINT} />);
    expect(toJson(wrapper)).toMatchSnapshot('Analysis snapshot');
  });
});
