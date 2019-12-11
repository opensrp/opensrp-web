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
import { LOCATION_SLICES } from '../../configs/env';
import {
  ALL,
  BACK,
  BACKPAGE_ICON,
  COMMUNE,
  DISTRICT,
  FEEDING_CATEGORY,
  GROWTH_STATUS,
  HIERARCHICAL_DATA_URL,
  HIGH,
  INAPPROPRIATELY_FED,
  LOGFACE_RISK,
  LOW,
  NBC_AND_PNC_CHILD,
  NBC_AND_PNC_COMPARTMENTS_URL,
  NBC_AND_PNC_WOMAN,
  NO,
  NO_RISK,
  NO_RISK_LOWERCASE,
  NUTRITION,
  NUTRITION_COMPARTMENTS_URL,
  NUTRITION_STATUS,
  OVERWEIGHT,
  PREGNANCY,
  PREGNANCY_COMPARTMENTS_URL,
  PROVINCE,
  RED,
  RED_ALERT,
  RISK,
  SEVERE_WASTING,
  SMS_FILTER_FUNCTION,
  STUNTED,
  TOTAL,
  UP,
  VILLAGE,
} from '../../constants';
import { locationDataIsAvailable } from '../../helpers/utils';
import { getModuleLink } from '../../helpers/utils';
import supersetFetch from '../../services/superset';
import locationsReducer, {
  fetchLocations,
  getLocationsOfLevel,
  Location,
  reducerName,
} from '../../store/ducks/locations';
import smsReducer, {
  getFilterArgs,
  getFilteredSmsData,
  reducerName as smsReducerName,
} from '../../store/ducks/sms_events';
import { getSmsData, SmsData } from '../../store/ducks/sms_events';

reducerRegistry.register(reducerName, locationsReducer);
reducerRegistry.register(smsReducerName, smsReducer);

export interface LocationWithData extends Location {
  redAlert?: number;
  inappropriateFeeding?: number;
  risk?: number;
  no_risk?: number;
  overweight?: number;
  stunting?: number;
  total: number;
  wasting?: number;
}

interface State {
  data: LocationWithData[];
  district: string;
  villageData: SmsData[];
}

type RISK_HIGHLIGHTER_TYPE =
  | RED
  | HIGH
  | LOW
  | NO
  | STUNTED
  | INAPPROPRIATELY_FED
  | OVERWEIGHT
  | SEVERE_WASTING
  | ALL
  | '';
interface Props {
  current_level: number;
  node_id?: string;
  direction: string; // this can be down or up
  from_level?: string;
  risk_highligter?: RISK_HIGHLIGHTER_TYPE;
  title: string;
  fetchLocationsActionCreator: typeof fetchLocations;
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
  smsData: SmsData[];
  compartMentUrl: string;
  module: string;
  permissionLevel: number;
}

const defaultProps: Props = {
  communes: [],
  compartMentUrl: '#',
  current_level: 0,
  direction: 'down',
  districts: [],
  fetchLocationsActionCreator: fetchLocations,
  module: '',
  permissionLevel: 3,
  provinces: [],
  risk_highligter: '',
  smsData: [],
  title: '',
  villages: [],
};

interface Totals {
  redAlert?: number;
  risk?: number;
  no_risk?: number;
  inappropriateFeeding?: number;
  overweight?: number;
  stunting?: number;
  wasting?: number;
}

function getVillageRiskTotals(
  location: Location,
  smsData: SmsData[],
  module: string,
  riskHighlighter: any
): Totals {
  const nutritionStatusConstants = [SEVERE_WASTING, OVERWEIGHT];
  const growthStatusConstants = [STUNTED];
  const feedingCategoryConstants = [INAPPROPRIATELY_FED];
  let field: string;
  if (nutritionStatusConstants.includes(riskHighlighter)) {
    field = NUTRITION_STATUS;
  } else if (growthStatusConstants.includes(riskHighlighter)) {
    field = GROWTH_STATUS;
  } else if (feedingCategoryConstants.includes(riskHighlighter)) {
    field = FEEDING_CATEGORY;
  } else {
    field = LOGFACE_RISK;
  }
  const reducer = (accumulator: Totals, dataItem: SmsData) => {
    switch ((dataItem as any)[field]) {
      case RED:
        return {
          ...accumulator,
          redAlert: (accumulator as any).redAlert + 1,
        };
      case HIGH:
        return {
          ...accumulator,
          risk: (accumulator as any).risk + 1,
        };
      case LOW:
        return {
          ...accumulator,
          risk: (accumulator as any).risk + 1,
        };
      case NO_RISK_LOWERCASE:
        return {
          ...accumulator,
          no_risk: (accumulator as any).no_risk + 1,
        };
      case OVERWEIGHT:
        return {
          ...accumulator,
          overweight: (accumulator as any).overweight + 1,
        };
      case SEVERE_WASTING:
        return {
          ...accumulator,
          wasting: (accumulator as any).wasting + 1,
        };
      case STUNTED:
        return {
          ...accumulator,
          stunting: (accumulator as any).stunting + 1,
        };
      case INAPPROPRIATELY_FED:
        return {
          ...accumulator,
          inappropriateFeeding: (accumulator as any).inappropriateFeeding + 1,
        };
      default:
        return accumulator as any;
    }
  };
  let totalsMap: Totals;
  if (module !== NUTRITION) {
    totalsMap = {
      no_risk: 0,
      redAlert: 0,
      risk: 0,
    };
  } else {
    totalsMap = {
      inappropriateFeeding: 0,
      overweight: 0,
      stunting: 0,
      wasting: 0,
    };
  }
  return smsData
    .filter((dataItem: SmsData) => dataItem.location_id === location.location_id)
    .reduce(reducer, totalsMap);
}
function getRiskTotals(locations: LocationWithData[], module: string) {
  const reducer = (accumulator: Totals, location: LocationWithData): Totals => {
    if (module !== NUTRITION) {
      return {
        no_risk: (accumulator as any).no_risk + location.no_risk,
        redAlert: (accumulator as any).redAlert + location.redAlert,
        risk: (accumulator as any).risk + location.risk,
      };
    } else {
      return {
        inappropriateFeeding:
          (accumulator as any).inappropriateFeeding + location.inappropriateFeeding,
        overweight: (accumulator as any).overweight + location.overweight,
        stunting: (accumulator as any).stunting + location.stunting,
        wasting: (accumulator as any).wasting + location.wasting,
      };
    }
  };
  let totalsMap: Totals;
  if (module !== NUTRITION) {
    totalsMap = {
      no_risk: 0,
      redAlert: 0,
      risk: 0,
    };
  } else {
    totalsMap = {
      inappropriateFeeding: 0,
      overweight: 0,
      stunting: 0,
      wasting: 0,
    };
  }
  return locations.reduce(reducer, totalsMap);
}
function getTotal(riskTotals: Totals, module: string) {
  if (module !== NUTRITION) {
    return (riskTotals as any).redAlert + riskTotals.risk + riskTotals.no_risk;
  } else {
    return (
      (riskTotals as any).overweight +
      (riskTotals as any).stunting +
      (riskTotals as any).inappropriateFeeding +
      (riskTotals as any).wasting
    );
  }
}
function addDataToLocations(
  locations: {
    [key: string]: Location[];
  },
  smsData: SmsData[],
  module: string,
  riskHighlighter: any
): { [key: string]: LocationWithData[] } {
  const villagesWithData: LocationWithData[] = [];
  for (const village in locations.villages) {
    if (locations.villages[village]) {
      const villageRiskTotals: Totals = getVillageRiskTotals(
        locations.villages[village],
        smsData,
        module,
        riskHighlighter
      );
      const totalRisk = getTotal(villageRiskTotals, module);
      if (module !== NUTRITION) {
        villagesWithData.push({
          ...locations.villages[village],
          no_risk: villageRiskTotals.no_risk,
          redAlert: villageRiskTotals.redAlert,
          risk: villageRiskTotals.risk,
          total: totalRisk,
        });
      } else {
        villagesWithData.push({
          inappropriateFeeding: villageRiskTotals.inappropriateFeeding,
          ...locations.villages[village],
          overweight: villageRiskTotals.overweight,
          stunting: villageRiskTotals.stunting,
          total: totalRisk,
          wasting: villageRiskTotals.wasting,
        });
      }
    }
  }

  const communesWithData: LocationWithData[] = [];
  for (const commune in locations.communes) {
    if (locations.communes[commune]) {
      const villagesInThisCommune = villagesWithData.filter(
        (village: LocationWithData) => village.parent_id === locations.communes[commune].location_id
      );
      const communeRisktotals = getRiskTotals(villagesInThisCommune, module);
      const totalRisk = getTotal(communeRisktotals, module);
      if (module !== NUTRITION) {
        communesWithData.push({
          ...locations.communes[commune],
          no_risk: communeRisktotals.no_risk,
          redAlert: communeRisktotals.redAlert,
          risk: communeRisktotals.risk,
          total: totalRisk,
        });
      } else {
        communesWithData.push({
          ...locations.communes[commune],
          inappropriateFeeding: communeRisktotals.inappropriateFeeding,
          overweight: communeRisktotals.overweight,
          stunting: communeRisktotals.stunting,
          total: totalRisk,
          wasting: communeRisktotals.wasting,
        });
      }
    }
  }

  const districtsWithData: LocationWithData[] = [];
  for (const district in locations.districts) {
    if (locations.districts[district]) {
      const communesInThisDistrict = communesWithData.filter(
        (commune: LocationWithData) =>
          commune.parent_id === locations.districts[district].location_id
      );
      const districtRisktotals = getRiskTotals(communesInThisDistrict, module);
      const totalRisk = getTotal(districtRisktotals, module);
      if (module !== NUTRITION) {
        districtsWithData.push({
          ...locations.districts[district],
          no_risk: districtRisktotals.no_risk,
          redAlert: districtRisktotals.redAlert,
          risk: districtRisktotals.risk,
          total: totalRisk,
        });
      } else {
        districtsWithData.push({
          ...locations.districts[district],
          inappropriateFeeding: districtRisktotals.inappropriateFeeding,
          overweight: districtRisktotals.overweight,
          stunting: districtRisktotals.stunting,
          total: totalRisk,
          wasting: districtRisktotals.wasting,
        });
      }
    }
  }

  const provincesWithData: LocationWithData[] = [];
  for (const province in locations.provinces) {
    if (locations.provinces[province]) {
      const districtsInThisProvince = districtsWithData.filter(
        (district: LocationWithData) =>
          district.parent_id === locations.provinces[province].location_id
      );
      const provinceRisktotals = getRiskTotals(districtsInThisProvince, module);
      const totalRisk = getTotal(provinceRisktotals, module);
      if (module !== NUTRITION) {
        provincesWithData.push({
          ...locations.provinces[province],
          no_risk: provinceRisktotals.no_risk,
          redAlert: provinceRisktotals.redAlert,
          risk: provinceRisktotals.risk,
          total: totalRisk,
        });
      } else {
        provincesWithData.push({
          ...locations.provinces[province],
          inappropriateFeeding: provinceRisktotals.inappropriateFeeding,
          overweight: provinceRisktotals.overweight,
          stunting: provinceRisktotals.stunting,
          total: totalRisk,
          wasting: provinceRisktotals.wasting,
        });
      }
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
      nextProps.smsData,
      nextProps.module,
      nextProps.risk_highligter
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
        nextProps.current_level === 0
          ? locationsWithData.provinces
          : nextProps.current_level === 1
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

    // get data to show on the VillageData component.
    const locationIds = dataToShow.map((location: LocationWithData) => location.location_id);
    const nutritionStatusConstants = [SEVERE_WASTING, OVERWEIGHT];
    const growthStatusConstants = [STUNTED];
    const feedingCategoryConstants = [INAPPROPRIATELY_FED];
    let field: string;
    if (nutritionStatusConstants.includes((nextProps as any).risk_highligter)) {
      field = NUTRITION_STATUS;
    } else if (growthStatusConstants.includes((nextProps as any).risk_highligter)) {
      field = GROWTH_STATUS;
    } else if (feedingCategoryConstants.includes((nextProps as any).risk_highligter)) {
      field = FEEDING_CATEGORY;
    } else {
      field = LOGFACE_RISK;
    }
    const villageData = nextProps.smsData.filter((dataItem: SmsData) => {
      return (
        locationIds.includes(dataItem.location_id) &&
        (nextProps.risk_highligter === ALL
          ? true
          : nextProps.risk_highligter
          ? (dataItem as any)[field].includes(
              nextProps.risk_highligter ? nextProps.risk_highligter : ''
            )
          : true)
      );
    });

    return {
      data: dataToShow,
      villageData,
    };
  }

  constructor(props: Props) {
    super(props);
    this.state = {
      data: [],
      district: '',
      villageData: [],
    };
  }

  public componentDidMount() {
    const { fetchLocationsActionCreator } = this.props;
    if (
      locationDataIsAvailable(
        this.props.villages,
        this.props.communes,
        this.props.districts,
        this.props.provinces
      )
    ) {
      for (const slice in LOCATION_SLICES) {
        if (slice) {
          supersetFetch(LOCATION_SLICES[slice]).then((result: Location[]) => {
            fetchLocationsActionCreator(result);
          });
        }
      }
    }
  }

  public render() {
    if (
      locationDataIsAvailable(
        this.props.villages,
        this.props.communes,
        this.props.districts,
        this.props.provinces
      )
    ) {
      return (
        <Container fluid={true} className="compartment-data-table">
          <Link to={this.urlToRedirect()} className="back-page">
            <span>
              <FontAwesomeIcon icon={BACKPAGE_ICON} size="lg" />
              <span>{BACK}</span>
            </span>
          </Link>
          <h1>{this.props.title}</h1>
          <Row className="villageDataRow">
            <Card className="table-card">
              <CardTitle>{this.header()}</CardTitle>
              <CardBody>
                <Table striped={true} borderless={true}>
                  <thead id="header">
                    {this.props.module !== NUTRITION ? (
                      <tr>
                        <th className="default-width" />
                        <th className="default-width">{RED_ALERT}</th>
                        <th className="default-width">{RISK}</th>
                        <th className="default-width">{NO_RISK}</th>
                        <th className="default-width">{TOTAL}</th>
                      </tr>
                    ) : (
                      <tr>
                        <th className="default-width" />
                        <th className="default-width">{STUNTED}</th>
                        <th className="default-width">{SEVERE_WASTING}</th>
                        <th className="default-width">{OVERWEIGHT}</th>
                        <th className="default-width">{INAPPROPRIATELY_FED}</th>
                        <th className="default-width">{TOTAL}</th>
                      </tr>
                    )}
                  </thead>
                  <tbody id="body">
                    {this.state.data.length ? (
                      this.state.data.map((element: LocationWithData) => {
                        return this.props.module !== NUTRITION ? (
                          <tr key={element.location_id}>
                            <td className="default-width">
                              {this.props.current_level === 3 ? (
                                element.location_name
                              ) : (
                                <Link
                                  to={`${getModuleLink(
                                    this.props.module
                                  )}${HIERARCHICAL_DATA_URL}/${this.props.module}/${
                                    this.props.risk_highligter
                                  }/${this.props.title}/${
                                    this.props.current_level ? this.props.current_level + 1 : 1
                                  }/down/${element.location_id}/${this.props.permissionLevel}`}
                                >
                                  {element.location_name}
                                </Link>
                              )}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === RED ? this.props.risk_highligter : ''
                              }`}
                            >
                              {element.redAlert}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === LOW ||
                                this.props.risk_highligter === HIGH
                                  ? this.props.risk_highligter
                                  : ''
                              }`}
                            >
                              {element.risk}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === NO ? this.props.risk_highligter : ''
                              }`}
                            >
                              {element.no_risk}
                            </td>
                            <td className={'default-width'}>{element.total}</td>
                          </tr>
                        ) : (
                          <tr key={element.location_id}>
                            <td className="default-width">
                              {this.props.current_level === 3 ? (
                                element.location_name
                              ) : (
                                <Link
                                  to={`${getModuleLink(
                                    this.props.module
                                  )}${HIERARCHICAL_DATA_URL}/${this.props.module}/${
                                    this.props.risk_highligter
                                  }/${this.props.title}/${
                                    this.props.current_level ? this.props.current_level + 1 : 1
                                  }/down/${element.location_id}/${this.props.permissionLevel}`}
                                >
                                  {element.location_name}
                                </Link>
                              )}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === STUNTED
                                  ? this.props.risk_highligter.split(' ').join('-')
                                  : ''
                              }`}
                            >
                              {element.stunting}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === SEVERE_WASTING
                                  ? this.props.risk_highligter.split(' ').join('-')
                                  : ''
                              }`}
                            >
                              {element.wasting}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === OVERWEIGHT
                                  ? this.props.risk_highligter.split(' ').join('-')
                                  : ''
                              }`}
                            >
                              {element.overweight}
                            </td>
                            <td
                              className={`default-width ${
                                this.props.risk_highligter === INAPPROPRIATELY_FED
                                  ? this.props.risk_highligter.split(' ').join('-')
                                  : ''
                              }`}
                            >
                              {element.inappropriateFeeding}
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
                      const element = getTotals(this.state.data, this.props.module);
                      return this.props.module !== NUTRITION ? (
                        <tr key={'total'}>
                          <td className="default-width" id="total">
                            Total({this.getLevelString()})
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === RED ? this.props.risk_highligter : ''
                            }`}
                          >
                            {element.redAlert}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === LOW ||
                              this.props.risk_highligter === HIGH
                                ? this.props.risk_highligter
                                : ''
                            }`}
                          >
                            {element.risk}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === NO ? this.props.risk_highligter : ''
                            }`}
                          >
                            {element.no_risk}
                          </td>
                          <td className="default-width">{element.total}</td>
                        </tr>
                      ) : (
                        <tr key={'total'}>
                          <td className="default-width" id="total">
                            Total({this.getLevelString()})
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === STUNTED
                                ? this.props.risk_highligter.split(' ').join('-')
                                : ''
                            }`}
                          >
                            {element.stunting}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === SEVERE_WASTING
                                ? this.props.risk_highligter.split(' ').join('-')
                                : ''
                            }`}
                          >
                            {element.wasting}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === OVERWEIGHT
                                ? this.props.risk_highligter.split(' ').join('-')
                                : ''
                            }`}
                          >
                            {element.overweight}
                          </td>
                          <td
                            className={`default-width ${
                              this.props.risk_highligter === INAPPROPRIATELY_FED
                                ? this.props.risk_highligter.split(' ').join('-')
                                : ''
                            }`}
                          >
                            {element.inappropriateFeeding}
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
          {this.state.villageData.length ? (
            <VillageData
              {...{
                current_level: this.props.current_level,
                module: this.props.module,
                smsData: this.state.villageData,
              }}
            />
          ) : null}
        </Container>
      );
    } else {
      return <Loading />;
    }
  }

  private urlToRedirect() {
    switch (this.props.module) {
      case PREGNANCY:
        return PREGNANCY_COMPARTMENTS_URL;
      case NBC_AND_PNC_WOMAN:
        return NBC_AND_PNC_COMPARTMENTS_URL;
      case NBC_AND_PNC_CHILD:
        return NBC_AND_PNC_COMPARTMENTS_URL;
      case NUTRITION:
        return NUTRITION_COMPARTMENTS_URL;
      default:
        return '';
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
  private dontDisplayProvince() {
    return this.props.permissionLevel > 0;
  }
  private dontDisplayDistrict() {
    return this.props.permissionLevel > 1;
  }

  private dontDisplayCommune() {
    return this.props.permissionLevel > 2;
  }
  private header = () => {
    let province = <span key={0}>{PROVINCE}</span>;
    if (this.dontDisplayProvince()) {
      province = <span key={0}>{null}</span>;
    } else if (this.props.current_level > 0) {
      province = (
        <Link
          to={`${getModuleLink(this.props.module)}${HIERARCHICAL_DATA_URL}/${this.props.module}/${
            this.props.risk_highligter
          }/${this.props.title}/0/${UP}/${this.props.node_id}/${this.props.permissionLevel}/${
            this.props.current_level
          }`}
          key={0}
        >
          {PROVINCE}
        </Link>
      );
    }

    let district = <span key={1}>''</span>;
    if (this.dontDisplayDistrict()) {
      district = <span key={1}>{null}</span>;
    } else if (this.props.current_level === 1) {
      district = <span key={1}>{DISTRICT}</span>;
    } else {
      district = (
        <Link
          to={`${getModuleLink(this.props.module)}${HIERARCHICAL_DATA_URL}/${this.props.module}/${
            this.props.risk_highligter
          }/${this.props.title}/1/${UP}/${this.props.node_id}/${this.props.permissionLevel}/${
            this.props.current_level
          }`}
          key={1}
        >
          {DISTRICT}
        </Link>
      );
    }

    let commune = <span key={2}>{COMMUNE}</span>;
    if (this.dontDisplayCommune()) {
      commune = <span key={2}>{null}</span>;
    } else if (this.props.current_level === 2) {
      commune = <span key={2}>{COMMUNE}</span>;
    } else {
      commune = (
        <Link
          to={`${getModuleLink(this.props.module)}${HIERARCHICAL_DATA_URL}/${this.props.module}/${
            this.props.risk_highligter
          }/${this.props.title}/2/${UP}/${this.props.node_id}/${this.props.permissionLevel}/${
            this.props.current_level
          }`}
          key={2}
        >
          {COMMUNE}
        </Link>
      );
    }

    const village = <span key={3}>{VILLAGE}</span>;
    const provinceDivider = this.dontDisplayProvince() ? (
      <span key={Math.random()}>{null}</span>
    ) : (
      <span className={'divider'} key={Math.random()}>
        &nbsp; / &nbsp;
      </span>
    );
    const districtDivider = this.dontDisplayDistrict() ? (
      <span key={Math.random()}>{null}</span>
    ) : (
      <span className={'divider'} key={Math.random()}>
        &nbsp; / &nbsp;
      </span>
    );
    const communeDivider = this.dontDisplayCommune() ? (
      <span key={Math.random()}>{null}</span>
    ) : (
      <span className={'divider'} key={Math.random()}>
        &nbsp; / &nbsp;
      </span>
    );
    switch (this.props.current_level) {
      case 0:
        return province;
      case 1:
        return [province, provinceDivider, district];
      case 2:
        return [province, provinceDivider, district, districtDivider, commune];
      case 3:
        return [
          province,
          provinceDivider,
          district,
          districtDivider,
          commune,
          communeDivider,
          village,
        ];
      default:
        return province;
    }
  };
}

const getTotals = (dataToShow: LocationWithData[], module: string) => {
  const reducer = (accumulator: Partial<LocationWithData>, currentValue: any) => {
    if (module !== NUTRITION) {
      return {
        no_risk: accumulator.no_risk + currentValue.no_risk,
        redAlert: accumulator.redAlert + currentValue.redAlert,
        risk: accumulator.risk + currentValue.risk,
        total: accumulator.total + currentValue.total,
      };
    } else {
      return {
        inappropriateFeeding: accumulator.inappropriateFeeding + currentValue.inappropriateFeeding,
        overweight: accumulator.overweight + currentValue.overweight,
        stunting: accumulator.stunting + currentValue.stunting,
        total: accumulator.total + currentValue.total,
        wasting: accumulator.wasting + currentValue.wasting,
      };
    }
  };
  let totalsMap: { [key: string]: number };
  if (module !== NUTRITION) {
    totalsMap = {
      no_risk: 0,
      redAlert: 0,
      risk: 0,
      total: 0,
    };
  } else {
    totalsMap = {
      inappropriateFeeding: 0,
      overweight: 0,
      stunting: 0,
      total: 0,
      wasting: 0,
    };
  }
  return dataToShow.reduce(reducer, totalsMap);
};

const mapStateToProps = (state: Partial<Store>, ownProps: any): any => {
  return {
    communes: getLocationsOfLevel(state, 'Commune'),
    current_level: parseInt(ownProps.match.params.current_level, 10),
    direction: ownProps.match.params.direction,
    districts: getLocationsOfLevel(state, 'District'),
    from_level: ownProps.match.params.from_level,
    module: ownProps.match.params.module,
    node_id: ownProps.match.params.node_id,
    permissionLevel: ownProps.match.params.permission_level,
    provinces: getLocationsOfLevel(state, 'Province'),
    risk_highligter: ownProps.match.params.risk_highlighter,
    smsData: getFilterArgs(state)
      ? getFilteredSmsData(state, getFilterArgs(state) as SMS_FILTER_FUNCTION[])
      : getSmsData(state),
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
