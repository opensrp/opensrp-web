// import { any } from 'prop-types';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { Field, Formik } from 'formik';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Table } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import RiskColoring from '../../components/RiskColoring';
import { SmsTypes } from '../../configs/settings';
import supersetFetch from '../../services/superset';
import TestReducer, {
  fetchSms,
  getTestData,
  reducerName,
  SmsReducer,
} from '../../store/ducks/sms_events';
import './index.css';

reducerRegistry.register(reducerName, TestReducer);

interface PropsInterface {
  testData: SmsReducer[];
  fetchTestDataActionCreator: typeof fetchSms;
}

interface State {
  dropdownOpenLocation: boolean;
  dropdownOpenType: boolean;
  filteredData: SmsReducer[];
}

const defaultprops: PropsInterface = {
  fetchTestDataActionCreator: fetchSms,
  testData: [],
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
        filteredData: nextProps.testData,
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
      dropdownOpenLocation: false,
      dropdownOpenType: false,
      filteredData: [],
    };
  }

  public componentDidMount() {
    const { fetchTestDataActionCreator } = this.props;
    supersetFetch('2057').then((result: any) => {
      fetchTestDataActionCreator(result);
    });
  }

  public handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    // we need to prevent a reaload of the page
    e.preventDefault();
  }

  // tslint:disable-next-line: no-empty
  public handleTermChange = (e: React.FormEvent<HTMLInputElement>) => {
    const filteredData: SmsReducer[] = this.filterData((e.target as HTMLInputElement).value);
    this.setState({
      filteredData,
    });
    // console.log(e.target.value);
  };

  public render() {
    // const data = this.props.testData;
    // console.log(this.state.filteredData);
    const data = this.state.filteredData;

    return (
      <div className="logface-content">
        <div>
          <h2 id="logface_title">Log Face</h2>
        </div>
        <div className="filter-search-div">
          {/*tslint:disable-next-line: jsx-no-lambda no-empty*/}
          <Formik initialValues={{}} onSubmit={() => {}}>
            {() => (
              <Field
                type="text"
                name="input"
                id="input"
                placeholder="Search ID, Reporter, Patients"
                className={`form-control`}
                onChange={this.handleTermChange}
              />
            )}
          </Formik>
          <div className="filters">
            <div className="location-type-filter">
              Select Location
              <Dropdown
                isOpen={this.state.dropdownOpenLocation}
                toggle={this.toggleLocationDropDown}
              >
                <DropdownToggle variant="success" id="dropdown-basic" caret={true}>
                  Select Location
                </DropdownToggle>
                <DropdownMenu>
                  {map(this.getAllLocations(), location => {
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
              Type
              <Dropdown isOpen={this.state.dropdownOpenType} toggle={this.toggleTypeDropDown}>
                <DropdownToggle variant="success" id="dropdown-basic" caret={true}>
                  Select Type
                </DropdownToggle>
                <DropdownMenu>
                  {map(SmsTypes, type => {
                    return (
                      <DropdownItem onClick={this.handleTypeDropdownClick} key={type}>
                        {type}
                      </DropdownItem>
                    );
                  })}
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
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
              {map(data, dataObj => {
                return (
                  <tr key={dataObj.event_id}>
                    <td className="default-width">{dataObj.event_id}</td>
                    <td className="default-width">{dataObj.EventDate}</td>
                    <td className="default-width">{dataObj.health_worker_location_name}</td>
                    <td className="default-width">{dataObj.sms_type}</td>
                    <td className="default-width">{dataObj.health_worker_name}</td>
                    <td className="default-width">{dataObj.anc_id}</td>
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
                      <RiskColoring {...{ Risk: dataObj.logface_risk }} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </div>
      </div>
    );
  }

  private handleLocationDropdownClick = (e: React.MouseEvent) => {
    // console.log(e.target.innerText);
    const filteredData: SmsReducer[] = this.props.testData.filter(dataItem => {
      return dataItem.health_worker_location_name.includes(
        (e.target as HTMLInputElement).innerText
      );
    });
    this.setState({
      filteredData,
    });
  };

  private getAllLocations = (): string[] => {
    const locations = [];
    for (const i in this.props.testData) {
      if (this.props.testData[i].health_worker_location_name) {
        locations.push(this.props.testData[i].health_worker_location_name);
      }
    }

    return Array.from(new Set(locations));
  };

  private handleTypeDropdownClick = (e: React.MouseEvent) => {
    // get e.target.innerText and use it to filter location
    const filteredData: SmsReducer[] = this.props.testData.filter(dataItem => {
      return dataItem.sms_type.includes((e.target as HTMLInputElement).innerText);
    });
    this.setState({
      filteredData,
    });
  };

  private filterData(filterString: string): SmsReducer[] {
    return this.props.testData.filter(
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
}

const mapStateToprops = (state: any) => {
  const result = {
    testData: getTestData(state),
  };
  return result;
};

const mapPropsToActions = { fetchTestDataActionCreator: fetchSms };

const ConnectedLogFace = connect(
  mapStateToprops,
  mapPropsToActions
)(LogFace);

export default ConnectedLogFace;
