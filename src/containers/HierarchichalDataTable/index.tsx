import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardFooter, CardTitle, Container, Row, Table } from 'reactstrap';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import { COMPARTMENTS_URL, HIERARCHICAL_DATA_URL } from '../../constants';
import { backPageIcon } from '../PatientDetails';
import { communes, districts, provinces, villages } from './test/fixtures';

interface State {
  data: any;
  district: string;
}

interface Props {
  current_level: number;
  node_id?: number;
  direction: string; // this can be down or up
  from_level?: string;
  risk_highligter?: 'high-risk' | 'low-risk' | 'no-risk' | 'none';
  title: string;
}

const defaultProps: Props = {
  current_level: 0,
  direction: 'down',
  risk_highligter: 'none',
  title: '',
};

class HierarchichalDataTable extends Component<Props, State> {
  public static defaultProps = defaultProps;
  public static getDerivedStateFromProps(nextProps: Props, prevState: State) {
    let dataToShow: any = [];
    if ((nextProps.direction === 'up' && nextProps.current_level === 0) || !nextProps.node_id) {
      dataToShow = provinces;
    } else if (nextProps.direction === 'up' && nextProps.current_level === 1) {
      dataToShow = districts;
      let parentId: number;
      const node = dataToShow.find((dataItem: any) => dataItem.id.toString() === nextProps.node_id);
      if (nextProps.from_level === '2' && node) {
        parentId = node.parent_id;
      } else {
        parentId = communes.find((dataItem: any) => dataItem.id.toString() === nextProps.node_id)
          .parent_id;
        parentId = dataToShow.find((dataItem: any) => dataItem.id === parentId).parent_id;
      }
      dataToShow = dataToShow.filter((dataItem: any) => dataItem.parent_id === parentId);
    } else if (nextProps.direction === 'up' && nextProps.current_level === 2) {
      dataToShow = communes;
      const parent_id = dataToShow.find(
        (dataItem: any) => dataItem.id.toString() === nextProps.node_id
      ).parent_id;
      dataToShow = dataToShow.filter((dataItem: any) => dataItem.parent_id === parent_id);
    } else {
      dataToShow =
        nextProps.current_level === 1
          ? districts
          : nextProps.current_level === 2
          ? communes
          : villages;
      dataToShow = nextProps.node_id
        ? dataToShow.filter((dataItem: any) => dataItem.parent_id.toString() === nextProps.node_id)
        : dataToShow;
    }

    return {
      data: dataToShow,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      data: provinces,
      district: '',
    };
  }

  public render() {
    return (
      <Container fluid={true} className="compartment-data-table">
        <Link to={COMPARTMENTS_URL} className="back-page">
          <FontAwesomeIcon icon={backPageIcon} size="lg" />
          <span>Back to Pregnancy Log Face</span>
        </Link>
        <h1>{this.props.title}</h1>
        <Row>
          <Card className="table-card">
            <CardTitle>{this.header()}</CardTitle>
            <CardBody>
              <Table striped={true} borderless={true}>
                <thead id="header">
                  <tr>
                    <th className="default-width" />
                    <th className="default-width">High Risk</th>
                    <th className="default-width">Low Risk</th>
                    <th className="default-width">No Risk</th>
                    <th className="default-width">Total</th>
                  </tr>
                </thead>
                <tbody id="body">
                  {this.state.data.length ? (
                    this.state.data.map((element: any) => {
                      return (
                        <tr key={element.id}>
                          <td className="default-width">
                            {element.location}
                            <Link
                              to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${
                                this.props.title
                              }/${
                                this.props.current_level ? this.props.current_level + 1 : 1
                              }/down/${element.id}`}
                            >
                              {element.name}
                            </Link>
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === 'high-risk'
                                ? this.props.risk_highligter
                                : ''
                            }`}
                          >
                            {element.high_risk}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === 'low-risk'
                                ? this.props.risk_highligter
                                : ''
                            }`}
                          >
                            {element.low_risk}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === 'no-risk'
                                ? this.props.risk_highligter
                                : ''
                            }`}
                          >
                            {element.no_risk}
                          </td>
                          <td className={'default-width'}>{element.total}</td>
                        </tr>
                      );
                    })
                  ) : (
                    <tr id="no-rows">
                      <td>There seems to be no rows here :-(</td>
                    </tr>
                  )}
                  {(() => {
                    const element = getTotals(this.state.data);
                    return (
                      <tr key={'total'}>
                        <td className="default-width" id="total">
                          Total({this.getLevelString()})
                        </td>
                        <td
                          className={`default-width ${
                            this.props.risk_highligter === 'high-risk'
                              ? this.props.risk_highligter
                              : ''
                          }`}
                        >
                          {element.high_risk}
                        </td>
                        <td
                          className={`default-width ${
                            this.props.risk_highligter === 'low-risk'
                              ? this.props.risk_highligter
                              : ''
                          }`}
                        >
                          {element.low_risk}
                        </td>
                        <td
                          className={`default-width ${
                            this.props.risk_highligter === 'no-risk'
                              ? this.props.risk_highligter
                              : ''
                          }`}
                        >
                          {element.no_risk}
                        </td>
                        <td className="default-width">{element.total}</td>
                      </tr>
                    );
                  })()}
                </tbody>
              </Table>
            </CardBody>
          </Card>
        </Row>
      </Container>
    );
  }

  private getLevelString = () => {
    if (this.props.current_level === 0) {
      return 'Province';
    } else if (this.props.current_level === 1) {
      return 'District';
    } else if (this.props.current_level === 2) {
      return 'Commune';
    } else if (this.props.current_level === 3) {
      return 'Village';
    } else {
      return 'Province';
    }
  };
  private header = () => {
    let province = <span>Province</span>;
    if (this.props.current_level > 0) {
      province = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/0/up/${this.props.node_id}/${this.props.current_level}`}
          key={0}
        >
          Province
        </Link>
      );
    }

    let district = <span>''</span>;
    if (this.props.current_level === 1) {
      district = <span key={1}> / District</span>;
    } else {
      district = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/1/up/${this.props.node_id}/${this.props.current_level}`}
          key={1}
        >
          &nbsp;/ District
        </Link>
      );
    }

    let commune = <span> / Commune</span>;
    if (this.props.current_level === 2) {
      commune = <span key={2}> / Commune</span>;
    } else {
      commune = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/2/up/${this.props.node_id}/${this.props.current_level}`}
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
      high_risk: accumulator.high_risk + currentValue.high_risk,
      low_risk: accumulator.low_risk + currentValue.low_risk,
      no_risk: accumulator.no_risk + currentValue.no_risk,
      total: accumulator.total + currentValue.total,
    };
  };
  return dataToShow.reduce(reducer, { high_risk: 0, low_risk: 0, no_risk: 0, total: 0 });
};

const mapStateToProps = (state: Partial<Store>, ownProps: any): Props => {
  return {
    current_level: parseInt(ownProps.match.params.current_level, 10),
    direction: ownProps.match.params.direction,
    from_level: ownProps.match.params.from_level,
    node_id: ownProps.match.params.node_id,
    risk_highligter: ownProps.match.params.risk_highlighter,
    title: ownProps.match.params.title,
  };
};

const ConnectedHierarchichalDataTable = connect(
  mapStateToProps,
  null
)(HierarchichalDataTable);

export default ConnectedHierarchichalDataTable;
