import { shallow } from 'enzyme';
import React from 'react';
import  SearchBox, {SearchBoxProps} from '../SearchBox';

const props: SearchBoxProps = {
  searchCallBack: jest.fn(),
  placeholder: "Search Household"
}

describe('components/page/Searchbox', () => {
  it('renders without crashing', () => {
    const component = shallow(<SearchBox {...props} />);
    const wrapper = component.find("#custom-search-input");
    expect(wrapper.length).toBe(1);
  });

  it('has proptypes and checks the prop values', ()=> {
    const component = shallow(<SearchBox {...props} />);
    const wrapper = component.find(".search-bar-input");
    console.log("--->",wrapper.props().placeholder);
    expect(wrapper.props().placeholder).toEqual(props.placeholder);
  });
});
