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
  SUPERSET_FETCH_TIMEOUT_INTERVAL,
  SUPERSET_PREGNANCY_DATA_EXPORT,
} from '../../configs/env';
import { SmsTypes } from '../../configs/settings';
import {
  ALL,
  DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  EVENT_ID,
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
import { FlexObject, sortFunction } from '../../helpers/utils';
import supersetFetch from '../../services/superset';
import TestReducer, {
  fetchSms,
  getSmsData,
  reducerName,
  SmsData,
  smsDataFetched,
} from '../../store/ducks/sms_events';
import './index.css';

reducerRegistry.register(reducerName, TestReducer);

interface PropsInterface {
  header: string;
  smsData: SmsData[];
  fetchSmsDataActionCreator: typeof fetchSms;
  dataFetched: boolean;
  numberOfRows: number;
  sliceId: string;
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
  dataFetched: false,
  fetchSmsDataActionCreator: fetchSms,
  header: '',
  numberOfRows: DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  sliceId: '0',
  smsData: [],
};

export class LogFace extends React.Component<PropsInterface, State> {
  public static defaultProps = defaultprops;

  public static getDerivedStateFromProps(nextProps: PropsInterface, prevState: State) {
    const { riskLabel, locationLabel, typeLabel } = prevState;
    if (
      !prevState.filteredData.length &&
      !riskLabel.length &&
      !locationLabel.length &&
      !typeLabel.length &&
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
        filteredData: prevState.filteredData,
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

  public componentDidMount() {
    const { fetchSmsDataActionCreator } = this.props;
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
      totalRecords: this.props.smsData.length,
    };
    const data = this.state.filteredData.sort(sortFunction);
    return (
      <div className="logface-content">
        <div>
          <h2 id="logface_title">{`Log Face - ${this.props.header}`}</h2>
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

  private isAllSelected = (e: React.MouseEvent) => {
    return (e.target as HTMLInputElement).innerText === ALL;
  };

  private getFilteredData = (
    e: React.MouseEvent,
    data: SmsData[],
    field: string,
    lowerCase: boolean,
    type?: string
  ) => {
    const allLabels = [this.state.riskLabel, this.state.locationLabel, this.state.typeLabel];
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
      filteredData: this.getFilteredData(e, this.props.smsData, 'logface_risk', true, 'risk'),
      riskLabel: (e.target as HTMLInputElement).innerText,
    });
  };
  private handleLocationDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.getFilteredData(
        e,
        this.props.smsData,
        'health_worker_location_name',
        false,
        'location'
      ),
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
      filteredData: this.getFilteredData(e, this.props.smsData, 'sms_type', false, 'type'),
      typeLabel: (e.target as HTMLInputElement).innerText,
    });
  };

  private filterData(filterString: string): SmsData[] {
    return this.props.smsData.filter(
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
    dataFetched: smsDataFetched(state),
    smsData: getSmsData(state).filter((smsData: SmsData) => {
      // here we filter based on the module we are in.
      switch (ownProps.header) {
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
  };
  return result;
};

const mapPropsToActions = { fetchSmsDataActionCreator: fetchSms };

const ConnectedLogFace = connect(
  mapStateToprops,
  mapPropsToActions
)(LogFace);

export default ConnectedLogFace;
