import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import SearchBox, { SearchBoxProps } from '..';

describe('components/page/Searchbox', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const callBackMock = jest.fn();
    const props: SearchBoxProps = {
      placeholder: 'Search Household',
      searchCallBack: callBackMock,
    };
    const component = shallow(<SearchBox {...props} />);
    const wrapper = component.find('#custom-search-input');
    expect(toJson(wrapper.find('.search-bar-input'))).toMatchSnapshot('SearchBox input');
    expect(toJson(wrapper.find('.search-bar-icon'))).toMatchSnapshot('SearchBox ion');
    expect(wrapper.length).toBe(1);
  });

  it('invokes callback correctly', () => {
    const callBackMock = jest.fn();
    const props: SearchBoxProps = {
      searchCallBack: callBackMock,
    };
    const wrapper = shallow(<SearchBox {...props} />);

    // simulate typing some text
    const inputWrapper = wrapper.find('.search-bar-input');
    expect(inputWrapper.length).toEqual(1);

    inputWrapper.simulate('change', { target: { value: 'randomString' } });

    // callback is not yet called;
    expect(callBackMock).not.toHaveBeenCalled();

    // simulate click on placebo key: other than enter: the space bar
    inputWrapper.simulate('keypress', { key: '' });
    // callback should not have been called yet
    expect(callBackMock).toHaveBeenCalledTimes(0);

    // simulate click on enter key
    inputWrapper.simulate('keypress', { key: 'Enter' });

    // now callback should have been called with "'randomString'"
    expect(callBackMock).toHaveBeenCalledTimes(1);
    expect(callBackMock).toHaveBeenCalledWith('randomString');
  });
});
