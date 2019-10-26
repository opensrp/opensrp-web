import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import Analysis from '..';

describe('Analysis', () => {
  it('must render without crashing', () => {
    shallow(<Analysis />);
  });

  it('must render correctly', () => {
    const wrapper = mount(<Analysis />);
    expect(toJson(wrapper)).toMatchSnapshot('Analysis snapshot');
  });
});
