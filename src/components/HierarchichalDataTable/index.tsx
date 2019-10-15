import { cloneDeep } from '@babel/types';
import DrillDownTable from '@onaio/drill-down-table/';
import HeaderBreadCrumb from '@onaio/head-bread-crumb';
import { disconnect } from 'cluster';
import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import { FlexObject } from '../../helpers/utils';
import './index.css';

import { Link } from 'react-router-dom';
import { COMPARTMENTS_URL } from '../../constants';

export const districts = [
  {
    id: 18,
    location: 'District D',
    parent_id: null,
    spray_coverage: '0%',
    spray_effectiveness: '0%',
  },
  {
    id: 1,
    location: <Link to={COMPARTMENTS_URL + '/1/down/1'}>District A</Link>,
    parent_id: null,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
  {
    id: 2,
    location: 'District B',
    parent_id: null,
    spray_coverage: '75%',
    spray_effectiveness: '85%',
  },
  {
    id: 3,
    location: 'District C',
    parent_id: null,
    spray_coverage: '90%',
    spray_effectiveness: '90%',
  },
];

export const hfcs = [
  {
    id: 3,
    location: 'HFC 3',
    parent_id: 2,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
  {
    id: 17,
    location: 'HFC 17',
    parent_id: 2,
    spray_coverage: '0%',
    spray_effectiveness: '0%',
  },
  {
    id: 7,
    location: 'HFC 4',
    parent_id: 3,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
  {
    id: 8,
    location: 'HFC 5',
    parent_id: 3,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
  {
    id: 6,
    location: <Link to={COMPARTMENTS_URL + '/2/down/6'}>HFC 2</Link>,
    parent_id: 1,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
  {
    id: 4,
    location: 'HFC 1',
    parent_id: 1,
    spray_coverage: '80%',
    spray_effectiveness: '80%',
  },
] as any;
export const data = [
  {
    id: 9,
    location: 'Operational Area 9',
    parent_id: 4,
    spray_coverage: '70%',
    spray_effectiveness: '90%',
  },
  {
    id: 10,
    location: 'Operational Area 10',
    parent_id: 4,
    spray_coverage: '80%',
    spray_effectiveness: '100%',
  },
  {
    id: 11,
    location: 'Operational Area 11',
    parent_id: 4,
    spray_coverage: '100%',
    spray_effectiveness: '100%',
  },
  {
    id: 12,
    location: 'Operational Area 12',
    parent_id: 5,
    spray_coverage: '86%',
    spray_effectiveness: '100%',
  },
  {
    id: 13,
    location: 'Operational Area 13',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '100%',
  },
  {
    id: 14,
    location: 'Operational Area 14',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '90%',
  },
  {
    id: 17,
    location: 'Operational Area 17',
    parent_id: 6,
    spray_coverage: '86%',
    spray_effectiveness: '78%',
  },
  {
    id: 18,
    location: 'Operational Area 18',
    parent_id: 6,
    spray_coverage: '80%',
    spray_effectiveness: '100%',
  },
  {
    id: 15,
    location: 'Operational Area 15',
    parent_id: 6,
    spray_coverage: '80%',
    spray_effectiveness: '100%',
  },
  {
    id: 16,
    location: 'Operational Area 16',
    parent_id: 6,
    spray_coverage: '80%',
    spray_effectiveness: '100%',
  },
] as any;

interface State {
  data: any;
  district: string;
}

interface Props {
  current_level: number;
  node_id?: number;
  direction: string; // this can be down or up
}

const defaultProps: Props = {
  current_level: 0,
  direction: 'down',
};

export default class HierarchichalDataTable extends Component<Props, State> {
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let dataToShow: any = [];
    if ((nextProps.direction === 'up' && nextProps.current_level === 0) || !nextProps.node_id) {
      dataToShow = districts;
    } else if (nextProps.direction === 'up' && nextProps.current_level === 1) {
      dataToShow = hfcs;
      const parent_id = dataToShow.find(
        (dataItem: any) => dataItem.id.toString() === nextProps.node_id
      ).parent_id;
      dataToShow = dataToShow.filter((dataItem: any) => dataItem.parent_id === parent_id);
    } else {
      dataToShow = nextProps.current_level === 1 ? hfcs : data;
      dataToShow = nextProps.node_id
        ? dataToShow.filter((dataItem: any) => dataItem.parent_id.toString() === nextProps.node_id)
        : dataToShow;
    }

    return {
      data: dataToShow,
    };
  }

  private static defaultProps = defaultProps;

  constructor(props: Props) {
    super(props);
    this.state = {
      data: districts,
      district: '',
    };
  }

  public render() {
    const columns = [
      {
        Header: '',
        accessor: 'location',
      },
      {
        Header: 'High Risk',
        accessor: 'spray_coverage',
      },
      {
        Header: 'Low Risk',
        accessor: 'spray_effectiveness',
      },
      {
        Header: 'No Risk',
        accessor: 'spray_effectiveness',
      },
      {
        Header: 'Total',
        accessor: 'id',
      },
    ];

    // Add a function called computeTotals
    // that sums up the totals for all the
    // fields and concatenates that to the
    // end of this.state.data to represent totals
    return (
      <Card className="table-card">
        <CardTitle>{this.header()}</CardTitle>
        <CardBody>
          <DrillDownTable
            columns={columns}
            data={this.state.data}
            linkerField={'location'}
            showPagination={false}
            defaultPageSize={this.state.data.length}
          />
        </CardBody>
      </Card>
    );
  }

  private header = () => {
    let province = <span>province</span>;
    if (this.props.current_level > 0) {
      province = (
        <Link to={COMPARTMENTS_URL + '/0/up/' + this.props.node_id} key={0}>
          Province
        </Link>
      );
    }

    let district = <span>''</span>;
    if (this.props.current_level === 1) {
      district = <span key={1}>/District</span>;
    } else {
      district = (
        <Link to={COMPARTMENTS_URL + '/1/up/' + this.props.node_id} key={1}>
          &nbsp;/ District
        </Link>
      );
    }
    const commune = <span> / Commune</span>;
    switch (this.props.current_level) {
      case 0:
        return province;
      case 1:
        return [province, district];
      case 2:
        return [province, district, commune];
      default:
        return province;
    }
  };
}
