import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import React from 'react';
import SearchBox, { SearchBoxProps } from '..';

const callBackMock = jest.fn();
const props: SearchBoxProps = {
  placeholder: 'Search Household',
  searchCallBack: callBackMock,
};

describe('components/page/Searchbox', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    const component = shallow(<SearchBox {...props} />);
    const wrapper = component.find('#custom-search-input');
    expect(toJson(wrapper.find('.search-bar-input'))).toMatchSnapshot('SearchBox input');
    expect(toJson(wrapper.find('.search-bar-icon'))).toMatchSnapshot('SearchBox ion');
    expect(wrapper.length).toBe(1);
  });

  it('invokes callback correctly', () => {
    const wrapper = shallow(<SearchBox {...props} />);

    // simulate typing some text
    const inputWrapper = wrapper.find('.search-bar-input');
    expect(inputWrapper.length).toEqual(1);

    inputWrapper.simulate('change', { target: { value: 'randomString' } });

    // callback is not yet called;
    expect(callBackMock).not.toHaveBeenCalled();

    // simulate click on enter key
    inputWrapper.simulate('keypress', { key: 'Enter' });

    // now callback should have been called with "'randomString'"
    expect(callBackMock).toHaveBeenCalledTimes(1);
    expect(callBackMock).toHaveBeenCalledWith('randomString');
  });
});
