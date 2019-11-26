import reducerRegistry from '@onaio/redux-reducer-registry';
import superset from '@onaio/superset-connector';
import { Field, Formik } from 'formik';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Table } from 'reactstrap';
import Ripple from '../../components/page/Loading';
import { PaginationData, Paginator, PaginatorProps } from '../../components/Paginator';
import RiskColoring from '../../components/RiskColoring';
import {
  GET_FORM_DATA_ROW_LIMIT,
  LOCATION_SLICES,
  SUPERSET_FETCH_TIMEOUT_INTERVAL,
  SUPERSET_PREGNANCY_DATA_EXPORT,
  USER_LOCATION_DATA_SLICE,
} from '../../configs/env';
import { SmsTypes } from '../../configs/settings';
import {
  ALL,
  DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  EVENT_ID,
  LOG_FACE,
  LOGFACE_SEARCH_PLACEHOLDER,
  NBC_AND_PNC,
  NBC_AND_PNC_LOGFACE_SMS_TYPES,
  NUTRITION,
  NUTRITION_LOGFACE_SMS_TYPES,
  PREGNANCY,
  PREGNANCY_LOGFACE_SMS_TYPES,
  RISK_LEVEL,
  RISK_LEVELS,
  SELECT_LOCATION,
  SELECT_RISK,
  SELECT_TYPE,
  TYPE,
} from '../../constants';
import {
  FlexObject,
  getFilterFunctionAndLocationLevel,
  getLocationId,
  sortFunction,
} from '../../helpers/utils';
import { OpenSRPService } from '../../services/opensrp';
import supersetFetch from '../../services/superset';
import {
  fetchLocations,
  fetchUserId,
  fetchUserLocations,
  getLocationsOfLevel,
  getUserId,
  getUserLocations,
  Location,
  userIdFetched,
  UserLocation,
  userLocationDataFetched,
} from '../../store/ducks/locations';
import TestReducer, {
  fetchSms,
  getFilterArgs,
  getFilteredSmsData,
  reducerName,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import { addFilterArgs, removeFilterArgs } from '../../store/ducks/sms_events';
import './index.css';
reducerRegistry.register(reducerName, TestReducer);

interface PropsInterface {
  module: string;
  smsData: SmsData[];
  fetchSmsDataActionCreator: typeof fetchSms;
  dataFetched: boolean;
  numberOfRows: number;
  sliceId: string;
  userUUID: string;
  userLocationData: UserLocation[];
  provinces: Location[];
  districts: Location[];
  communes: Location[];
  villages: Location[];
  addFilterArgs: any;
  removeFilterArgs: any;
  fetchLocations: any;
  fetchUserLocations: any;
  userIdFetched: boolean;
  isUserLocationDataFetched: boolean;
  fetchUserIdActionCreator: any;
  filterArgsInStore: Array<(smsData: SmsData) => boolean>;
}

interface State {
  dropdownOpenRiskLevel: boolean;
  dropdownOpenLocation: boolean;
  dropdownOpenType: boolean;
  riskLabel: string;
  locationLabel: string;
  typeLabel: string;
  filteredData: SmsData[];
  currentPage: number;
  intervalId: NodeJS.Timeout | null;
}

const defaultprops: PropsInterface = {
  addFilterArgs,
  communes: [],
  dataFetched: false,
  districts: [],
  fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  fetchUserIdActionCreator: fetchUserId,
  fetchUserLocations,
  filterArgsInStore: [],
  isUserLocationDataFetched: false,
  module: '',
  numberOfRows: DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  provinces: [],
  removeFilterArgs,
  sliceId: '0',
  smsData: [],
  userIdFetched: false,
  userLocationData: [],
  userUUID: '',
  villages: [],
};

export class LogFace extends React.Component<PropsInterface, State> {
  public static defaultProps = defaultprops;

  public static getDerivedStateFromProps(nextProps: PropsInterface, prevState: State) {
    const { riskLabel, locationLabel, typeLabel } = prevState;
    const allLabels: string[] = [riskLabel, locationLabel, typeLabel];
    const userLocationId = getLocationId(nextProps.userLocationData, nextProps.userUUID);

    const { locationFilterFunction } = getFilterFunctionAndLocationLevel(
      userLocationId,
      nextProps.provinces,
      nextProps.districts,
      nextProps.communes,
      nextProps.villages
    );
    if (
      locationFilterFunction &&
      !(
        nextProps.filterArgsInStore
          .map((element: any) => {
            return element.toString();
          })
          .indexOf(locationFilterFunction.toString()) > -1
      )
    ) {
      nextProps.removeFilterArgs();
      nextProps.addFilterArgs([locationFilterFunction as ((smsData: SmsData) => boolean)]);
    }

    if (
      !prevState.filteredData.length &&
      allLabels.every((d: string) => !d.length || d === ALL) &&
      !(
        document.getElementById('input') &&
        (document.getElementById('input') as HTMLInputElement)!.value
      )
    ) {
      return {
        filteredData: nextProps.smsData,
      };
    } else {
      return {
        filteredData: prevState.filteredData.filter(locationFilterFunction),
      };
    }
  }

  constructor(props: PropsInterface) {
    super(props);

    this.state = {
      currentPage: 1,
      dropdownOpenLocation: false,
      dropdownOpenRiskLevel: false,
      dropdownOpenType: false,
      filteredData: [],
      intervalId: null,
      locationLabel: '',
      riskLabel: '',
      typeLabel: '',
    };
  }

  public async componentDidMount() {
    const { fetchSmsDataActionCreator } = this.props;

    this.props.removeFilterArgs();
    const {
      // tslint:disable-next-line: no-shadowed-variable
      fetchLocations,
      // tslint:disable-next-line: no-shadowed-variable
      fetchUserLocations,
      isUserLocationDataFetched,
      // tslint:disable-next-line: no-shadowed-variable
      userIdFetched,
    } = this.props;

    if (!userIdFetched) {
      const opensrpService = new OpenSRPService('/security/authenticate');

      opensrpService.read('').then((response: any) => {
        this.props.fetchUserIdActionCreator((response as any).user.attributes._PERSON_UUID);
      });
    }

    // fetch user location details
    if (!isUserLocationDataFetched) {
      supersetFetch(USER_LOCATION_DATA_SLICE).then((result: UserLocation[]) => {
        fetchUserLocations(result);
      });
    }

    // fetch all location slices
    for (const slice in LOCATION_SLICES) {
      if (slice) {
        await supersetFetch(LOCATION_SLICES[slice]).then((result: Location[]) => {
          fetchLocations(result);
        });
      }
    }

    // check if sms data is fetched and then fetch if not fetched already

    if (!this.props.dataFetched) {
      supersetFetch(this.props.sliceId).then((result: SmsData[]) => {
        fetchSmsDataActionCreator(result);
      });
    }
    const intervalId: NodeJS.Timeout = setInterval(() => {
      const smsDataInDescendingOrderByEventId: SmsData[] = this.props.smsData.sort(sortFunction);

      // pick the lartgest ID if this smsDataInDescendingOrderByEventId list is not empty
      if (smsDataInDescendingOrderByEventId.length) {
        const largestEventID: string = smsDataInDescendingOrderByEventId[0].event_id;
        const supersetParams = superset.getFormData(GET_FORM_DATA_ROW_LIMIT, [
          { comparator: largestEventID, operator: '>', subject: EVENT_ID },
        ]);
        supersetFetch(this.props.sliceId, supersetParams)
          .then((result: SmsData[]) => {
            fetchSmsDataActionCreator(result);
          })
          .catch(error => {
            // console.log(error);
          });
      }
    }, SUPERSET_FETCH_TIMEOUT_INTERVAL);
    this.setState({
      intervalId,
    });
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // we need to prevent a reaload of the page
    e.preventDefault();
  }

  public handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    const filteredData: SmsData[] = this.filterData((e.target as HTMLInputElement).value);
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: 1,
      });
    }
    this.setState({
      filteredData,
    });
  };

  public render() {
    const data = this.state.filteredData.sort(sortFunction);
    const routePaginatorProps: PaginatorProps = {
      endLabel: 'last',
      nextLabel: 'next',
      onPageChange: (paginationData: PaginationData) => {
        this.setState({
          currentPage: paginationData.currentPage,
        });
      },
      pageLimit: 5,
      pageNeighbours: 3,
      previousLabel: 'previous',
      startLabel: 'first',
      totalRecords: data.length,
    };

    return (
      <div className="logface-content">
        <div>
          <h2 id="logface_title">{`${LOG_FACE} - ${this.props.module}`}</h2>
        </div>
        <div className="filter-panel">
          <div className="filters">
            {/*tslint:disable-next-line: jsx-no-lambda no-empty*/}
            <Formik initialValues={{}} onSubmit={() => {}}>
              {() => (
                <Field
                  type="text"
                  name="input"
                  id="input"
                  placeholder={LOGFACE_SEARCH_PLACEHOLDER}
                  className={`form-control logface-search`}
                  onChange={this.handleTermChange}
                  disabled={!this.props.smsData.length}
                />
              )}
            </Formik>
            <div className="location-type-filter">
              <span>{RISK_LEVEL}</span>
              <Dropdown
                isOpen={this.state.dropdownOpenRiskLevel}
                toggle={this.toggleRiskLevelDropDown}
              >
                <DropdownToggle
                  variant="success"
                  id="dropdown-basic"
                  caret={true}
                  disabled={!this.props.smsData.length}
                >
                  <span>{this.state.riskLabel.length ? this.state.riskLabel : SELECT_RISK}</span>
                </DropdownToggle>
                <DropdownMenu>
                  {map(RISK_LEVELS, risk => {
                    return (
                      <DropdownItem onClick={this.handleRiskLevelDropdownClick} key={risk}>
                        {risk}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="location-type-filter">
              <span>{SELECT_LOCATION}</span>
              <Dropdown
                isOpen={this.state.dropdownOpenLocation}
                toggle={this.toggleLocationDropDown}
              >
                <DropdownToggle
                  variant="success"
                  id="dropdown-basic"
                  caret={true}
                  disabled={!this.props.smsData.length}
                >
                  <span>
                    {this.state.locationLabel.length ? this.state.locationLabel : SELECT_LOCATION}
                  </span>
                </DropdownToggle>
                <DropdownMenu>
                  {map(this.getAllLocations().concat(ALL), location => {
                    return (
                      <DropdownItem onClick={this.handleLocationDropdownClick} key={location}>
                        {location}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
            <div className="location-type-filter">
              <span>{TYPE}</span>
              <Dropdown isOpen={this.state.dropdownOpenType} toggle={this.toggleTypeDropDown}>
                <DropdownToggle
                  variant="success"
                  id="dropdown-basic"
                  caret={true}
                  disabled={!this.props.smsData}
                >
                  <span>{this.state.typeLabel.length ? this.state.typeLabel : SELECT_TYPE}</span>
                </DropdownToggle>
                <DropdownMenu>
                  {map(SmsTypes, type => {
                    return (
                      <DropdownItem onClick={this.handleTypeDropdownClick} key={type}>
                        {type}
                      </DropdownItem>
                    );
                  })}
                  <DropdownItem onClick={this.handleTypeDropdownClick} key={ALL}>
                    {ALL}
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
            <a id="export-button" href={SUPERSET_PREGNANCY_DATA_EXPORT} download={true}>
              Export data
            </a>
          </div>
        </div>
        {this.props.dataFetched ? (
          <div className="table-container">
            <Table striped={true} borderless={true}>
              <thead id="header">
                <tr>
                  <th className="default-width">ID</th>
                  <th className="default-width">Event Date</th>
                  <th className="default-width">Location</th>
                  <th className="default-width">SMS Type</th>
                  <th className="default-width">Reporter</th>
                  <th className="default-width">Patient</th>
                  <th className="small-width">Age</th>
                  <th className="large-width">Message</th>
                  <th className="default-width">Risk Level</th>
                </tr>
              </thead>
              <tbody id="body">
                {map(
                  data.slice(
                    (this.state.currentPage - 1) * this.props.numberOfRows,
                    (this.state.currentPage - 1) * this.props.numberOfRows + this.props.numberOfRows
                  ),
                  dataObj => {
                    return (
                      <tr key={dataObj.event_id}>
                        <td className="default-width">{dataObj.event_id}</td>
                        <td className="default-width">{dataObj.EventDate}</td>
                        <td className="default-width">{dataObj.health_worker_location_name}</td>
                        <td className="default-width">{dataObj.sms_type}</td>
                        <td className="default-width">{dataObj.health_worker_name}</td>
                        <td className="default-width">{dataObj.anc_id}</td>
                        <td className="small-width">{dataObj.age}</td>
                        <td className="large-width">{dataObj.message}</td>
                        <td className="default-width">
                          <RiskColoring {...{ risk: dataObj.logface_risk }} />
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </Table>
          </div>
        ) : (
          <Ripple />
        )}
        <div className="paginator">
          <Paginator {...routePaginatorProps} />
        </div>
      </div>
    );
  }

  public componentWillUnmount() {
    if (this.state.intervalId) {
      clearInterval(this.state.intervalId);
    }
  }

  private getFilteredData = (data: SmsData[], e?: React.MouseEvent, type?: string) => {
    const allLabels = [this.state.riskLabel, this.state.locationLabel, this.state.typeLabel];
    if (e && e.target) {
      switch (type) {
        case 'risk':
          allLabels.splice(0, 1, (e.target as HTMLInputElement).innerText);
          break;
        case 'location':
          allLabels.splice(1, 1, (e.target as HTMLInputElement).innerText);
          break;
        case 'type':
          allLabels.splice(2, 1, (e.target as HTMLInputElement).innerText);
          break;
        default:
        // handle this
      }
    }
    const dataFiltered = data.filter((dataItem: FlexObject) => {
      return (
        (allLabels[0].length && allLabels[0] !== ALL
          ? dataItem.logface_risk.toLowerCase().includes(allLabels[0])
          : allLabels[0] === ALL || !allLabels[0].length) &&
        (allLabels[1].length && allLabels[1] !== ALL
          ? dataItem.health_worker_location_name.includes(allLabels[1])
          : allLabels[1] === ALL || !allLabels[1].length) &&
        (allLabels[2].length && allLabels[2] !== ALL
          ? dataItem.sms_type.includes(allLabels[2])
          : allLabels[2] === ALL || !allLabels[2].length)
      );
    });
    return dataFiltered;
  };

  private handleRiskLevelDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.getFilteredData(this.props.smsData, e, 'risk'),
      riskLabel: (e.target as HTMLInputElement).innerText,
    });
  };
  private handleLocationDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.getFilteredData(this.props.smsData, e, 'location'),
      locationLabel: (e.target as HTMLInputElement).innerText,
    });
  };

  private getAllLocations = (): string[] => {
    const locations = [];
    for (const i in this.props.smsData) {
      if (this.props.smsData[i].health_worker_location_name) {
        locations.push(this.props.smsData[i].health_worker_location_name);
      }
    }

    return Array.from(new Set(locations));
  };

  private handleTypeDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.getFilteredData(this.props.smsData, e, 'type'),
      typeLabel: (e.target as HTMLInputElement).innerText,
    });
  };

  private filterData(filterString: string): SmsData[] {
    const { riskLabel, locationLabel, typeLabel } = this.state;
    const isFiltered: boolean = [riskLabel, locationLabel, typeLabel].some(
      (d: string) => d.length || d !== ALL
    );
    let activeData;
    if (isFiltered) {
      if (!filterString.length) {
        activeData = this.getFilteredData(this.props.smsData);
      } else {
        activeData = this.state.filteredData.length
          ? this.state.filteredData
          : this.getFilteredData(this.props.smsData);
      }
    } else {
      activeData = this.props.smsData;
    }
    return activeData.filter(
      dataItem =>
        dataItem.event_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase()) ||
        dataItem.health_worker_name
          .toLocaleLowerCase()
          .includes(filterString.toLocaleLowerCase()) ||
        dataItem.anc_id.toLocaleLowerCase().includes(filterString.toLocaleLowerCase())
    );
  }

  private toggleTypeDropDown = () => {
    this.setState({ dropdownOpenType: !this.state.dropdownOpenType });
  };

  private toggleLocationDropDown = () => {
    this.setState({ dropdownOpenLocation: !this.state.dropdownOpenLocation });
  };

  private toggleRiskLevelDropDown = () => {
    this.setState({
      dropdownOpenRiskLevel: !this.state.dropdownOpenRiskLevel,
    });
  };
}

const mapStateToprops = (state: any, ownProps: any): any => {
  const result = {
    communes: getLocationsOfLevel(state, 'Commune'),
    dataFetched: smsDataFetched(state),
    districts: getLocationsOfLevel(state, 'District'),
    filterArgsInStore: getFilterArgs(state),
    isUserLocationDataFetched: userLocationDataFetched(state),
    provinces: getLocationsOfLevel(state, 'Province'),
    smsData: getFilteredSmsData(state, getFilterArgs(state) as Array<
      (smsData: SmsData) => boolean
    >).filter((smsData: SmsData) => {
      // here we filter based on the module we are in.
      switch (ownProps.module) {
        case PREGNANCY:
          return PREGNANCY_LOGFACE_SMS_TYPES.includes(smsData.sms_type);

        case NBC_AND_PNC:
          return NBC_AND_PNC_LOGFACE_SMS_TYPES.includes(smsData.sms_type);

        case NUTRITION:
          return NUTRITION_LOGFACE_SMS_TYPES.includes(smsData.sms_type);

        default:
          return true;
      }
    }),
    userIdFetched: userIdFetched(state),
    userLocationData: getUserLocations(state),
    userUUID: getUserId(state),
    villages: getLocationsOfLevel(state, 'Village'),
  };
  return result;
};

const mapPropsToActions = {
  addFilterArgs,
  fetchLocations,
  fetchSmsDataActionCreator: fetchSms,
  fetchUserIdActionCreator: fetchUserId,
  fetchUserLocations,
  removeFilterArgs,
};

const ConnectedLogFace = connect(
  mapStateToprops,
  mapPropsToActions
)(LogFace);

export default ConnectedLogFace;
