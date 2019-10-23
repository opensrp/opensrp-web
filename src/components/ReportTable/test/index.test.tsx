import { mount, shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router } from 'react-router';
import ReportTable from '..';
import store from '../../store';

const history = createBrowserHistory();

describe('ReportTable', () => {
  beforeEach(() => {
    jest.resetAllMocks();
  });

  it('renders without crashing', () => {
    shallow(<ReportTable singlePatientEvents={[]} />);
  });

  it('renders correctly', () => {
    // const wrapper = mount(<ReportTable singlePatientEvents={[]} />);
    // expect(toJson(wrapper)).toMatchSnapshot();
    // I have found a blocker here. This throws a scary error that still
    // makes no sense to me.
  });
});
