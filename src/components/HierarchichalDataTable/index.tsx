import DrillDownTable from '@onaio/drill-down-table/';
import HeaderBreadCrumb from '@onaio/head-bread-crumb';
import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import './index.css';
import { data } from './test/fixtures';

export default class HierarchichalDataTable extends Component {
  public render() {
    const columns = [
      {
        Header: 'Name',
        accessor: 'location',
      },
      {
        Header: 'Spray Coverage',
        accessor: 'spray_coverage',
      },
      {
        Header: 'Spray Effectiveness',
        accessor: 'spray_effectiveness',
      },
    ];
    const props = {
      columns,
      data,
      defaultPageSize: 5,
      linkerField: 'location',
      showPagination: false,
    };
    return (
      <Card>
        <CardTitle>province</CardTitle>
        <CardBody>
          <DrillDownTable {...props} />
        </CardBody>
        <CardFooter>might add the totals here</CardFooter>
      </Card>
    );
  }
}
