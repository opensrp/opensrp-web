import { shallow } from 'enzyme';
import React from 'react';

import SearchBox from '../SearchBox';

describe('components/page/Searchbox', () => {
  it('renders without crashing', () => {
    let props = {
        searchCallBack: jest.fn(),
        placeholder: "Search Household"
    }
    const component = shallow(<SearchBox {...props} />);
    const wrapper = component.find("#custom-search-input");
    expect(wrapper.length).toBe(1);
  });
});
