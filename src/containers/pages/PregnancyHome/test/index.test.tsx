import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import { Router } from 'react-router';
import PregnancyHome from '..';

const history = createBrowserHistory();

describe('PregnancyHome', () => {
  it('must render without crashing', () => {
    shallow(<PregnancyHome />);
  });

  it('must render correctly', () => {
    const wrapper = mount(
      <Router history={history}>
        <PregnancyHome />
      </Router>
    );
    expect(toJson(wrapper)).toMatchSnapshot();
    wrapper.unmount();
  });
});
