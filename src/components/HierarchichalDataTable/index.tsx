import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardFooter, CardTitle } from 'reactstrap';
import './index.css';

import { Link } from 'react-router-dom';
import { COMPARTMENTS_URL } from '../../constants';

export const districts = [
  {
    id: 18,
    location: 'District D',
    parent_id: null,
    spray_coverage: 20,
    spray_effectiveness: 20,
  },
  {
    id: 1,
    location: <Link to={COMPARTMENTS_URL + '/1/down/1'}>District A</Link>,
    parent_id: null,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
  {
    id: 2,
    location: 'District B',
    parent_id: null,
    spray_coverage: 75,
    spray_effectiveness: 85,
  },
  {
    id: 3,
    location: 'District C',
    parent_id: null,
    spray_coverage: 90,
    spray_effectiveness: 90,
  },
];

export const hfcs = [
  {
    id: 3,
    location: 'HFC 3',
    parent_id: 2,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
  {
    id: 17,
    location: 'HFC 17',
    parent_id: 2,
    spray_coverage: 20,
    spray_effectiveness: 20,
  },
  {
    id: 7,
    location: 'HFC 4',
    parent_id: 3,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
  {
    id: 8,
    location: 'HFC 5',
    parent_id: 3,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
  {
    id: 6,
    location: <Link to={COMPARTMENTS_URL + '/2/down/6'}>HFC 2</Link>,
    parent_id: 1,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
  {
    id: 4,
    location: 'HFC 1',
    parent_id: 1,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
] as any;
export const dataChildren = [
  {
    id: 22,
    location: 'HFC 1',
    parent_id: 13,
    spray_coverage: 80,
    spray_effectiveness: 80,
  },
] as any;
export const data = [
  {
    id: 9,
    location: 'Operational Area 9',
    parent_id: 4,
    spray_coverage: 70,
    spray_effectiveness: 90,
  },
  {
    id: 10,
    location: 'Operational Area 10',
    parent_id: 4,
    spray_coverage: 80,
    spray_effectiveness: 100,
  },
  {
    id: 11,
    location: 'Operational Area 11',
    parent_id: 4,
    spray_coverage: 100,
    spray_effectiveness: 100,
  },
  {
    id: 12,
    location: 'Operational Area 12',
    parent_id: 5,
    spray_coverage: 86,
    spray_effectiveness: 100,
  },
  {
    id: 13,
    location: <Link to={COMPARTMENTS_URL + '/3/down/13'}>Operational Area 13</Link>,
    parent_id: 6,
    spray_coverage: 86,
    spray_effectiveness: 100,
  },
  {
    id: 14,
    location: 'Operational Area 14',
    parent_id: 6,
    spray_coverage: 86,
    spray_effectiveness: 90,
  },
  {
    id: 17,
    location: 'Operational Area 17',
    parent_id: 6,
    spray_coverage: 86,
    spray_effectiveness: 78,
  },
  {
    id: 18,
    location: 'Operational Area 18',
    parent_id: 6,
    spray_coverage: 80,
    spray_effectiveness: 100,
  },
  {
    id: 15,
    location: 'Operational Area 15',
    parent_id: 6,
    spray_coverage: 80,
    spray_effectiveness: 100,
  },
  {
    id: 16,
    location: 'Operational Area 16',
    parent_id: 6,
    spray_coverage: 80,
    spray_effectiveness: 100,
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
  from_level?: string;
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
      let parentId: number;
      const node = dataToShow.find((dataItem: any) => dataItem.id.toString() === nextProps.node_id);
      if (nextProps.from_level === '2' && node) {
        parentId = node.parent_id;
      } else {
        parentId = data.find((dataItem: any) => dataItem.id.toString() === nextProps.node_id)
          .parent_id;
        parentId = dataToShow.find((dataItem: any) => dataItem.id === parentId).parent_id;
      }
      dataToShow = dataToShow.filter((dataItem: any) => dataItem.parent_id === parentId);
    } else if (nextProps.direction === 'up' && nextProps.current_level === 2) {
      dataToShow = data;
      const parent_id = dataToShow.find(
        (dataItem: any) => dataItem.id.toString() === nextProps.node_id
      ).parent_id;
      dataToShow = dataToShow.filter((dataItem: any) => dataItem.parent_id === parent_id);
    } else {
      dataToShow =
        nextProps.current_level === 1 ? hfcs : nextProps.current_level === 2 ? data : dataChildren;
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

    return (
      <Card className="table-card">
        <CardTitle>{this.header()}</CardTitle>
        <CardBody>
          {this.state.data.map((element: any) => {
            return element.location;
          })}
        </CardBody>
      </Card>
    );
  }

  private header = () => {
    let province = <span>province</span>;
    if (this.props.current_level > 0) {
      province = (
        <Link
          to={`${COMPARTMENTS_URL}/0/up/${this.props.node_id}/${this.props.current_level}`}
          key={0}
        >
          Province
        </Link>
      );
    }

    let district = <span>''</span>;
    if (this.props.current_level === 1) {
      district = <span key={1}>/District</span>;
    } else {
      district = (
        <Link
          to={`${COMPARTMENTS_URL}/1/up/${this.props.node_id}/${this.props.current_level}`}
          key={1}
        >
          &nbsp;/ District
        </Link>
      );
    }

    let commune = <span> / Commune</span>;
    if (this.props.current_level === 2) {
      commune = <span key={2}>/Commune</span>;
    } else {
      commune = (
        <Link
          to={`${COMPARTMENTS_URL}/2/up/${this.props.node_id}/${this.props.current_level}`}
          key={2}
        >
          &nbsp;/ Commune
        </Link>
      );
    }

    const village = <span key={3}> / Village</span>;
    switch (this.props.current_level) {
      case 0:
        return province;
      case 1:
        return [province, district];
      case 2:
        return [province, district, commune];
      case 3:
        return [province, district, commune, village];
      default:
        return province;
    }
  };
}

const getTotals = (dataToShow: any[]) => {
  const reducer = (accumulator: any, currentValue: any) => {
    return {
      id: 100,
      location: 'total',
      parent_id: null,
      spray_coverage: accumulator.spray_coverage + currentValue.spray_coverage,
      spray_effectiveness: accumulator.spray_effectiveness + currentValue.spray_effectiveness,
    };
  };
  return dataToShow.reduce(reducer, { spray_coverage: 0, spray_effectiveness: 0 });
};
