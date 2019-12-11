import { mount } from 'enzyme';
import React from 'react';
import { ReactTable } from '..';
import { columns, tableData } from './fixtures';

const TestComponent = () => (
  <ReactTable data={tableData} tableColumns={React.useMemo(() => columns, [])} />
);

describe('src/components/ReactTable', () => {
  it('renders without crashing', () => {
    const wrapper = mount(<TestComponent />);
  });

  it('renders correctly', () => {
    const wrapper = mount(<TestComponent />);
    expect(wrapper.find('.react-table').length).toEqual(1);
    expect(wrapper.find('tbody tr').length).toEqual(404);
  });
});
