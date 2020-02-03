import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import RiskColoring from '../index';

describe('RiskColoring', () => {
  it('must render without crashing', () => {
    shallow(<RiskColoring />);
  });

  it('must show correct Risk level depending on the string passed as a prop', () => {
    let wrapper = mount(<RiskColoring risk={'high'} />);
    expect(toJson(wrapper)).toMatchSnapshot('hight_risk');
    wrapper = mount(<RiskColoring risk={'low'} />);
    expect(toJson(wrapper)).toMatchSnapshot('low_risk');
    wrapper = mount(<RiskColoring risk={'red'} />);
    expect(toJson(wrapper)).toMatchSnapshot('red_alert');
    wrapper = mount(<RiskColoring risk={'not set'} />);
    expect(toJson(wrapper)).toMatchSnapshot('not_set');
    wrapper = mount(<RiskColoring />);
    expect(toJson(wrapper)).toMatchSnapshot('default');
  });
});
