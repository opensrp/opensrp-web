import reducerRegistry from '@onaio/redux-reducer-registry';
import superset from '@onaio/superset-connector';
import { Field, Formik } from 'formik';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Table } from 'reactstrap';
import Ripple from '../../components/page/Loading';
import { PaginationData, Paginator, PaginatorProps } from '../../components/Paginator';
import RiskColoring from '../../components/RiskColoring';
import { SUPERSET_FETCH_TIMEOUT_INTERVAL } from '../../configs/env';
import { SmsTypes } from '../../configs/settings';
import {
  ALL,
  DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  LOGFACE_SEARCH_PLACEHOLDER,
  RISK_LEVEL,
  RISK_LEVELS,
  SELECT_LOCATION,
  SELECT_RISK,
  SELECT_TYPE,
  SUPERSET_PREGNANCY_DATA_EXPORT,
  SUPERSET_SMS_DATA_SLICE,
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
// import { getFormData } from '@onaio/superset-connector/dist/types/utils';

reducerRegistry.register(reducerName, TestReducer);

interface PropsInterface {
  header: string;
  smsData: SmsData[];
  fetchSmsDataActionCreator: typeof fetchSms;
  dataFetched: boolean;
  numberOfRows: number;
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
  smsData: [],
};

export class LogFace extends React.Component<PropsInterface, State> {
  public static defaultProps = defaultprops;

  public static getDerivedStateFromProps(nextProps: PropsInterface, prevState: State) {
    if (
      !prevState.filteredData.length &&
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

  public sortFunction = (firstE1: SmsData, secondE1: SmsData): number => {
    if (firstE1.event_id < secondE1.event_id) {
      return 1;
    } else if (firstE1.event_id > secondE1.event_id) {
      return -1;
    } else {
      return 0;
    }
  };

  public componentDidMount() {
    const { fetchSmsDataActionCreator } = this.props;
    if (!this.props.dataFetched) {
      supersetFetch(SUPERSET_SMS_DATA_SLICE).then((result: SmsData[]) => {
        fetchSmsDataActionCreator(result);
      });
    } else {
      const intervalId: NodeJS.Timeout = setInterval(() => {
        const smsDataInDescendingOrderByEventId: SmsData[] = this.props.smsData.sort(
          this.sortFunction
        );

        // pick the lartgest ID if this smsDataInDescendingOrderByEventId list is not empty
        if (smsDataInDescendingOrderByEventId.length) {
          const largestEventID: string = smsDataInDescendingOrderByEventId[0].event_id;
          const supersetParams = superset.getFormData(2000, [
            { comparator: largestEventID, operator: '>', subject: 'event_id' },
          ]);
          supersetFetch(SUPERSET_SMS_DATA_SLICE, supersetParams)
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

  private isAllSelected = (e: React.MouseEvent) => {
    return (e.target as HTMLInputElement).innerText === ALL;
  };

  private getFilteredData = (
    e: React.MouseEvent,
    data: SmsData[],
    field: string,
    lowerCase: boolean
  ) => {
    return data.filter((dataItem: FlexObject) => {
      const val = lowerCase ? dataItem[field].toLowerCase() : dataItem[field];
      return val.includes((e.target as HTMLInputElement).innerText);
    });
  };

  private handleRiskLevelDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.isAllSelected(e)
        ? this.props.smsData
        : this.getFilteredData(e, this.props.smsData, 'logface_risk', true),
      riskLabel: (e.target as HTMLInputElement).innerText,
    });
  };
  private handleLocationDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentPage: 1,
      filteredData: this.isAllSelected(e)
        ? this.props.smsData
        : this.getFilteredData(e, this.props.smsData, 'health_worker_location_name', false),
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
      filteredData: this.isAllSelected(e)
        ? this.props.smsData
        : this.getFilteredData(e, this.props.smsData, 'sms_type', false),
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

const mapStateToprops = (state: any) => {
  const result = {
    dataFetched: smsDataFetched(state),
    smsData: getSmsData(state),
  };
  return result;
};

const mapPropsToActions = { fetchSmsDataActionCreator: fetchSms };

const ConnectedLogFace = connect(
  mapStateToprops,
  mapPropsToActions
)(LogFace);

export default ConnectedLogFace;
