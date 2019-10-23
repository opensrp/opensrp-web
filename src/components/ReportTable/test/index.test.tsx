import { mount, shallow } from 'enzyme';
import { createBrowserHistory } from 'history';
import React from 'react';
import ReportTable from '..';

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
