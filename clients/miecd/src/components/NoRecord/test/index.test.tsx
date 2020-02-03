import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import NoRecord from '..';

describe('src/components/NoRecord', () => {
  it('must render without crashing', () => {
    shallow(<NoRecord message="test message" />);
  });
  it('must render correctly', () => {
    const wrapper = mount(<NoRecord message="test message" />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
