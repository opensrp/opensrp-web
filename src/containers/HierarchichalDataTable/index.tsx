import React, { Component } from 'react';
import 'react-table/react-table.css';
import { Card, CardBody, CardTitle, Container, Row, Table } from 'reactstrap';
import './index.css';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Store } from 'redux';
import Loading from '../../components/page/Loading/index';
import VillageData from '../../components/VillageData';
import {
  BACK,
  BACKPAGE_ICON,
  COMMUNE,
  COMPARTMENTS_URL,
  DISTRICT,
  HIERARCHICAL_DATA_URL,
  HIGH,
  HIGH_RISK,
  LOCATION_SLICES,
  LOW,
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
  locationsDataFetched,
  reducerName,
} from '../../store/ducks/locations';
import smsReducer, { reducerName as smsReducerName } from '../../store/ducks/sms_events';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';

reducerRegistry.register(reducerName, locationsReducer);
reducerRegistry.register(smsReducerName, smsReducer);

export interface LocationWithData extends Location {
  high_risk: number;
  low_risk: number;
  no_risk: number;
  total: number;
}

interface State {
  data: LocationWithData[];
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
  smsData: SmsData[];
  locationsFetched: boolean;
}

const defaultProps: Props = {
  communes: [],
  current_level: 0,
  direction: 'down',
  districts: [],
  fetchLocationsActionCreator: fetchLocations,
  locationsFetched: false,
  provinces: [],
  risk_highligter: 'none',
  smsData: [],
  title: '',
  villages: [],
};

interface RiskTotals {
  high_risk: number;
  low_risk: number;
  no_risk: number;
}

function getVillageRiskTotals(location: Location, smsData: SmsData[]): RiskTotals {
  const reducer = (accumulator: RiskTotals, dataItem: SmsData) => {
    switch (dataItem.logface_risk) {
      case HIGH:
        return {
          ...accumulator,
          high_risk: accumulator.high_risk + 1,
        };
      case LOW:
        return {
          ...accumulator,
          low_risk: accumulator.low_risk + 1,
        };
      case NO_RISK:
        return {
          ...accumulator,
          no_risk: accumulator.no_risk + 1,
        };
      default:
        return accumulator;
    }
  };
  return smsData
    .filter((dataItem: SmsData) => dataItem.location_id === location.location_id)
    .reduce(reducer, {
      high_risk: 0,
      low_risk: 0,
      no_risk: 0,
    });
}
function getRiskTotals(locations: LocationWithData[]) {
  const reducer = (accumulator: RiskTotals, location: LocationWithData): RiskTotals => {
    return {
      high_risk: accumulator.high_risk + location.high_risk,
      low_risk: accumulator.low_risk + location.low_risk,
      no_risk: accumulator.no_risk + location.no_risk,
    };
  };
  return locations.reduce(reducer, {
    high_risk: 0,
    low_risk: 0,
    no_risk: 0,
  });
}
function getTotal(riskTotals: RiskTotals) {
  return riskTotals.high_risk + riskTotals.low_risk + riskTotals.no_risk;
}
function addDataToLocations(
  locations: {
    [key: string]: Location[];
  },
  smsData: SmsData[]
): { [key: string]: LocationWithData[] } {
  const villagesWithData: LocationWithData[] = [];
  for (const village in locations.villages) {
    if (locations.villages[village]) {
      const villageRiskTotals: RiskTotals = getVillageRiskTotals(
        locations.villages[village],
        smsData
      );
      const totalRisk = getTotal(villageRiskTotals);
      villagesWithData.push({
        ...locations.villages[village],
        high_risk: villageRiskTotals.high_risk,
        low_risk: villageRiskTotals.low_risk,
        no_risk: villageRiskTotals.no_risk,
        total: totalRisk,
      });
    }
  }

  const communesWithData: LocationWithData[] = [];
  for (const commune in locations.communes) {
    if (locations.communes[commune]) {
      const villagesInThisCommune = villagesWithData.filter(
        (village: LocationWithData) => village.parent_id === locations.communes[commune].location_id
      );
      const communeRisktotals = getRiskTotals(villagesInThisCommune);
      const totalRisk = getTotal(communeRisktotals);
      communesWithData.push({
        ...locations.communes[commune],
        high_risk: communeRisktotals.high_risk,
        low_risk: communeRisktotals.low_risk,
        no_risk: communeRisktotals.no_risk,
        total: totalRisk,
      });
    }
  }

  const districtsWithData: LocationWithData[] = [];
  for (const district in locations.districts) {
    if (locations.districts[district]) {
      const communesInThisDistrict = communesWithData.filter(
        (commune: LocationWithData) =>
          commune.parent_id === locations.districts[district].location_id
      );
      const districtRisktotals = getRiskTotals(communesInThisDistrict);
      const totalRisk = getTotal(districtRisktotals);
      districtsWithData.push({
        ...locations.districts[district],
        high_risk: districtRisktotals.high_risk,
        low_risk: districtRisktotals.low_risk,
        no_risk: districtRisktotals.no_risk,
        total: totalRisk,
      });
    }
  }

  const provincesWithData: LocationWithData[] = [];
  for (const province in locations.provinces) {
    if (locations.provinces[province]) {
      const districtsInThisProvince = districtsWithData.filter(
        (district: LocationWithData) =>
          district.parent_id === locations.provinces[province].location_id
      );
      const provinceRisktotals = getRiskTotals(districtsInThisProvince);
      const totalRisk = getTotal(provinceRisktotals);
      provincesWithData.push({
        ...locations.provinces[province],
        high_risk: provinceRisktotals.high_risk,
        low_risk: provinceRisktotals.low_risk,
        no_risk: provinceRisktotals.no_risk,
        total: totalRisk,
      });
    }
  }

  return {
    communes: communesWithData,
    districts: districtsWithData,
    provinces: provincesWithData,
    villages: villagesWithData,
  };
}

class HierarchichalDataTable extends Component<Props, State> {
  public static defaultProps = defaultProps;
  public static getDerivedStateFromProps(nextProps: Props) {
    const locationsWithData = addDataToLocations(
      {
        communes: nextProps.communes,
        districts: nextProps.districts,
        provinces: nextProps.provinces,
        villages: nextProps.villages,
      },
      nextProps.smsData
    );
    let dataToShow: LocationWithData[] = [];
    if ((nextProps.direction === UP && nextProps.current_level === 0) || !nextProps.node_id) {
      dataToShow = locationsWithData.provinces;
    } else if (nextProps.direction === UP && nextProps.current_level === 1) {
      dataToShow = locationsWithData.districts;
      let parentId: string;
      const node = dataToShow.find(
        (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
      );
      if (nextProps.from_level === '2' && node) {
        parentId = node.parent_id;
      } else {
        const commune = locationsWithData.communes.find(
          (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
        );
        if (commune) {
          parentId = commune.parent_id;
        } else {
          return [];
        }
        parentId = dataToShow.find(
          (dataItem: LocationWithData) => dataItem.location_id === parentId
        )!.parent_id;
      }
      dataToShow = dataToShow.filter(
        (dataItem: LocationWithData) => dataItem.parent_id === parentId
      );
    } else if (nextProps.direction === UP && nextProps.current_level === 2) {
      dataToShow = locationsWithData.communes;
      const node = dataToShow.find(
        (dataItem: LocationWithData) => dataItem.location_id === nextProps.node_id
      );
      let parentId: null | string = null;
      if (node) {
        parentId = node.parent_id;
      } else {
        return [];
      }
      dataToShow = dataToShow.filter(
        (dataItem: LocationWithData) => dataItem.parent_id === parentId
      );
    } else {
      dataToShow =
        nextProps.current_level === 1
          ? locationsWithData.districts
          : nextProps.current_level === 2
          ? locationsWithData.communes
          : locationsWithData.villages;
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
      data: [],
      district: '',
    };
  }
  /**
   * Given a village return it's commune's location ID
   * @param {Location} village - village Location to find commnue
   */
  public getCommune = (village: Location & Partial<{ level: VILLAGE }>): string => {
    return village.parent_id;
  };

  public getDistrict = (village: Location & Partial<{ level: VILLAGE }>): string => {
    const communeId = this.getCommune(village);
    return this.props.communes.find((location: Location) => location.location_id === communeId)!
      .parent_id;
  };

  public getProvince = (village: Location & Partial<{ level: VILLAGE }>): string => {
    const districtId = this.getDistrict(village);
    return this.props.districts.find((location: Location) => location.location_id === districtId)!
      .parent_id;
  };
  public componentDidMount() {
    const { fetchLocationsActionCreator } = this.props;
    for (const slice in LOCATION_SLICES) {
      if (slice) {
        supersetFetch(LOCATION_SLICES[slice]).then((result: Location[]) => {
          fetchLocationsActionCreator(result);
        });
      }
    }
  }

  public render() {
    if (this.props.locationsFetched) {
      return (
        <Container fluid={true} className="compartment-data-table">
          <Link to={COMPARTMENTS_URL} className="back-page">
            <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
            <span>{BACK}</span>
          </Link>
          <h1>{this.props.title}</h1>
          <Row className="villageDataRow">
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
                              {this.props.current_level === 3 ? (
                                element.location_name
                              ) : (
                                <Link
                                  to={`${HIERARCHICAL_DATA_URL}/${this.props.risk_highligter}/${
                                    this.props.title
                                  }/${
                                    this.props.current_level ? this.props.current_level + 1 : 1
                                  }/down/${element.location_id}`}
                                >
                                  {element.location_name}
                                </Link>
                              )}
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
          <VillageData
            {...{
              current_level: this.props.current_level,
              smsData: this.props.smsData.filter((dataItem: SmsData) => {
                const locationIds = this.state.data.map(
                  (location: LocationWithData) => location.location_id
                );
                return locationIds.includes(dataItem.location_id);
              }),
            }}
          />
        </Container>
      );
    } else {
      return <Loading />;
    }
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
      district = <span key={1}> / {DISTRICT}</span>;
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
    locationsFetched: locationsDataFetched(state),
    node_id: ownProps.match.params.node_id,
    provinces: getLocationsOfLevel(state, 'Province'),
    risk_highligter: ownProps.match.params.risk_highlighter,
    smsData: getSmsData(state),
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
