import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import CustomOauthLogin from '..';
import { providers } from './fixtures';

describe('CustomOAuth login', () => {
  it('must render without crashing', () => {
    const props = {
      providers,
    };
    shallow(<CustomOauthLogin {...props} />);
  });
  it('must render correctly', () => {
    const props = {
      providers,
    };
    const wrapper = mount(<CustomOauthLogin {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
