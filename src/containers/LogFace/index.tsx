// import { any } from 'prop-types';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { Field, Formik } from 'formik';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import { Table } from 'reactstrap';
import Ripple from '../../components/page/Loading';
import RiskColoring from '../../components/RiskColoring';
import { SmsTypes } from '../../configs/settings';
import {
  ALL,
  DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  LOGFACE_SEARCH_PLACEHOLDER,
  PREGNANCY_LOGFACE_HEADING,
  RISK_LEVEL,
  RISK_LEVELS,
  SELECT_LOCATION,
  SELECT_RISK,
  SELECT_TYPE,
  SUPERSET_PREGNANCY_DATA_EXPORT,
  SUPERSET_SMS_DATA_SLICE,
  TYPE,
} from '../../constants';
import { FlexObject } from '../../helpers/utils';
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
  currentIndex: number;
}

const defaultprops: PropsInterface = {
  dataFetched: false,
  fetchSmsDataActionCreator: fetchSms,
  numberOfRows: DEFAULT_NUMBER_OF_LOGFACE_ROWS,
  smsData: [],
};

export class LogFace extends React.Component<PropsInterface, State> {
  public static defaultProps = defaultprops;

  public static getDerivedStateFromProps(nextProps: any, prevState: any) {
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
        filtereData: prevState.filteredData,
      };
    }
  }

  constructor(props: any) {
    super(props);

    this.state = {
      currentIndex: 1,
      dropdownOpenLocation: false,
      dropdownOpenRiskLevel: false,
      dropdownOpenType: false,
      filteredData: [],
      locationLabel: '',
      riskLabel: '',
      typeLabel: '',
    };
  }

  public componentDidMount() {
    const { fetchSmsDataActionCreator } = this.props;
    if (!this.props.dataFetched) {
      supersetFetch(SUPERSET_SMS_DATA_SLICE).then((result: any) => {
        fetchSmsDataActionCreator(result);
      });
    }
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // we need to prevent a reaload of the page
    e.preventDefault();
  }

  // tslint:disable-next-line: no-empty
  public handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    const filteredData: SmsData[] = this.filterData((e.target as HTMLInputElement).value);
    if (this.state.currentIndex > 1) {
      this.setState({
        currentIndex: 1,
      });
    }
    this.setState({
      filteredData,
    });
    // console.log(e.target.value);
  };

  public render() {
    const data = this.state.filteredData.sort((a: FlexObject, b: FlexObject) => {
      return (new Date(b.EventDate) as any) - (new Date(a.EventDate) as any);
    });
    return (
      <div className="logface-content">
        <div>
          <h2 id="logface_title">{PREGNANCY_LOGFACE_HEADING}</h2>
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
                    (this.state.currentIndex - 1) * this.props.numberOfRows,
                    (this.state.currentIndex - 1) * this.props.numberOfRows +
                      this.props.numberOfRows
                  ),
                  dataObj => {
                    return (
                      <tr key={dataObj.event_id}>
                        <td className="default-width">{dataObj.event_id}</td>
                        <td className="default-width">{dataObj.EventDate}</td>
                        <td className="default-width">{dataObj.health_worker_location_name}</td>
                        <td className="default-width">{dataObj.sms_type}</td>
                        <td className="default-width">{dataObj.health_worker_name}</td>
                        <td className="default-width">
                          <Link to={`/patient_detail/${dataObj.anc_id}`}>{dataObj.anc_id}</Link>
                        </td>
                        <td className="small-width">{dataObj.age}</td>
                        <td className="large-width">
                          {typeof dataObj.message === 'string' &&
                            dataObj.message.split('\n').map((item, key) => {
                              return (
                                <React.Fragment key={key}>
                                  {item}
                                  <br />
                                </React.Fragment>
                              );
                            })}
                        </td>
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
          {this.state.currentIndex > 1 && (
            <button onClick={this.previousPage} id={'previous'}>
              previous
            </button>
          )}
          {this.state.currentIndex < Math.ceil(data.length / this.props.numberOfRows) && (
            <button onClick={this.nextPage} id={'next'}>
              next
            </button>
          )}
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

  private previousPage = () => {
    this.setState({
      currentIndex: this.state.currentIndex - 1,
    });
  };

  private nextPage = () => {
    this.setState({
      currentIndex: this.state.currentIndex + 1,
    });
  };
  private handleRiskLevelDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentIndex: 1,
      filteredData: this.isAllSelected(e)
        ? this.props.smsData
        : this.getFilteredData(e, this.props.smsData, 'logface_risk', true),
      riskLabel: (e.target as HTMLInputElement).innerText,
    });
  };
  private handleLocationDropdownClick = (e: React.MouseEvent) => {
    this.setState({
      currentIndex: 1,
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
      currentIndex: 1,
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
