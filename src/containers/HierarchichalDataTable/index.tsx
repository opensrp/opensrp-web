import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardTitle, Container, Row, Table } from 'reactstrap';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import {
  BACK,
  BACKPAGE_ICON,
  COMMUNE,
  COMPARTMENTS_URL,
  DISTRICT,
  HIERARCHICAL_DATA_URL,
  HIGH_RISK,
  LOW_RISK,
  NO_RISK,
  PROVINCE,
  TOTAL,
  UP,
  VILLAGE,
} from '../../constants';
import supersetFetch from '../../services/superset';
import locationsReducer, {
  fetchLocations,
  getLocationsOfLevel,
  Location,
  reducerName,
} from '../../store/ducks/locations';
// import { communes, districts, provinces, villages } from './test/fixtures';

reducerRegistry.register(reducerName, locationsReducer);

interface LocationWithData extends Location {
  high_risk: number;
  low_risk: number;
  no_risk: number;
  total: number;
}

interface State {
  data: any;
  district: string;
}

interface Props {
  current_level: number;
  node_id?: string;
  direction: string; // this can be down or up
  from_level?: string;
  risk_highligter?: 'high-risk' | 'low-risk' | 'no-risk' | 'none';
  title: string;
  fetchLocationsActionCreator: typeof fetchLocations;
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
}

const defaultProps: Props = {
  communes: [],
  current_level: 0,
  direction: 'down',
  districts: [],
  fetchLocationsActionCreator: fetchLocations,
  provinces: [],
  risk_highligter: 'none',
  title: '',
  villages: [],
};

function addDataToLocations(locations: Location[]): LocationWithData[] {
  return locations.map(location => {
    return {
      ...location,
      high_risk: 10,
      low_risk: 20,
      no_risk: 30,
      total: 60,
    };
  });
}

class HierarchichalDataTable extends Component<Props, State> {
  public static defaultProps = defaultProps;
  public static getDerivedStateFromProps(nextProps: Props) {
    const provinces = addDataToLocations(nextProps.provinces);
    const districts = addDataToLocations(nextProps.districts);
    const communes = addDataToLocations(nextProps.communes);
    const villages = addDataToLocations(nextProps.villages);
    let dataToShow: LocationWithData[] = [];
    if ((nextProps.direction === UP && nextProps.current_level === 0) || !nextProps.node_id) {
      dataToShow = provinces;
    } else if (nextProps.direction === UP && nextProps.current_level === 1) {
      dataToShow = districts;
      let parentId: string;
      const node = dataToShow.find(
        (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
      );
      if (nextProps.from_level === '2' && node) {
        parentId = node.parent_id;
      } else {
        const commune = communes.find(
          (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
        );
        parentId = commune!.parent_id;
        parentId = dataToShow.find(
          (dataItem: LocationWithData) => dataItem.location_id === parentId
        )!.parent_id;
      }
      dataToShow = dataToShow.filter(
        (dataItem: LocationWithData) => dataItem.parent_id === parentId
      );
    } else if (nextProps.direction === UP && nextProps.current_level === 2) {
      dataToShow = communes;
      const parent_id = dataToShow.find(
        (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
      )!.parent_id;
      dataToShow = dataToShow.filter(
        (dataItem: LocationWithData) => dataItem.parent_id === parent_id
      );
    } else {
      dataToShow =
        nextProps.current_level === 1
          ? districts
          : nextProps.current_level === 2
          ? communes
          : villages;
      dataToShow = nextProps.node_id
        ? dataToShow.filter(
            (dataItem: LocationWithData) => dataItem.parent_id === nextProps.node_id
          )
        : dataToShow;
    }

    return {
      data: dataToShow,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      data: addDataToLocations(props.provinces),
      district: '',
    };
  }

  public componentDidMount() {
    const { fetchLocationsActionCreator } = this.props;
    const locationSlices = ['2754', '2755', '2756', '2757'];
    for (const slice in locationSlices) {
      if (slice) {
        supersetFetch(locationSlices[slice]).then((result: Location[]) => {
          fetchLocationsActionCreator(result);
        });
      }
    }
  }

  public render() {
    return (
      <Container fluid={true} className="compartment-data-table">
        <Link to={COMPARTMENTS_URL} className="back-page">
          <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
          <span>{BACK}</span>
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
                    <th className="default-width">{HIGH_RISK}</th>
                    <th className="default-width">{LOW_RISK}</th>
                    <th className="default-width">{NO_RISK}</th>
                    <th className="default-width">{TOTAL}</th>
                  </tr>
                </thead>
                <tbody id="body">
                  {this.state.data.length ? (
                    this.state.data.map((element: LocationWithData) => {
                      return (
                        <tr key={element.location_id}>
                          <td className="default-width">
                            {/* {element.location} */}
                            <Link
                              to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${
                                this.props.title
                              }/${
                                this.props.current_level ? this.props.current_level + 1 : 1
                              }/down/${element.location_id}`}
                            >
                              {element.location_name}
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
      return PROVINCE;
    } else if (this.props.current_level === 1) {
      return DISTRICT;
    } else if (this.props.current_level === 2) {
      return COMMUNE;
    } else if (this.props.current_level === 3) {
      return VILLAGE;
    } else {
      return PROVINCE;
    }
  };
  private header = () => {
    let province = <span>{PROVINCE}</span>;
    if (this.props.current_level > 0) {
      province = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/0/${UP}/${this.props.node_id}/${this.props.current_level}`}
          key={0}
        >
          {PROVINCE}
        </Link>
      );
    }

    let district = <span>''</span>;
    if (this.props.current_level === 1) {
      district = <span key={1}>/ {DISTRICT}</span>;
    } else {
      district = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/1/${UP}/${this.props.node_id}/${this.props.current_level}`}
          key={1}
        >
          &nbsp;/ {DISTRICT}
        </Link>
      );
    }

    let commune = <span> / {COMMUNE}</span>;
    if (this.props.current_level === 2) {
      commune = <span key={2}> / {COMMUNE}</span>;
    } else {
      commune = (
        <Link
          to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${this.props.title}/2/${UP}/${this.props.node_id}/${this.props.current_level}`}
          key={2}
        >
          &nbsp;/ {COMMUNE}
        </Link>
      );
    }

    const village = <span key={3}> / {VILLAGE}</span>;
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

const getTotals = (dataToShow: LocationWithData[]) => {
  const reducer = (accumulator: Partial<LocationWithData>, currentValue: any) => {
    return {
      high_risk: accumulator.high_risk + currentValue.high_risk,
      low_risk: accumulator.low_risk + currentValue.low_risk,
      no_risk: accumulator.no_risk + currentValue.no_risk,
      total: accumulator.total + currentValue.total,
    };
  };
  return dataToShow.reduce(reducer, { high_risk: 0, low_risk: 0, no_risk: 0, total: 0 });
};

const mapStateToProps = (state: Partial<Store>, ownProps: any): any => {
  return {
    communes: getLocationsOfLevel(state, 'Commune'),
    current_level: parseInt(ownProps.match.params.current_level, 10),
    direction: ownProps.match.params.direction,
    districts: getLocationsOfLevel(state, 'District'),
    from_level: ownProps.match.params.from_level,
    node_id: ownProps.match.params.node_id,
    provinces: getLocationsOfLevel(state, 'Province'),
    risk_highligter: ownProps.match.params.risk_highlighter,
    title: ownProps.match.params.title,
    villages: getLocationsOfLevel(state, 'Village'),
  };
};

const mapDispatchToProps = { fetchLocationsActionCreator: fetchLocations };

const ConnectedHierarchichalDataTable = connect(
  mapStateToProps,
  mapDispatchToProps
)(HierarchichalDataTable);

export default ConnectedHierarchichalDataTable;
