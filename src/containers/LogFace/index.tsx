// import { any } from 'prop-types';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Table } from 'reactstrap';
import { Dropdown, DropdownItem, DropdownMenu, DropdownToggle } from 'reactstrap';
import RiskColoring from '../../components/RiskColoring';
import { SmsTypes } from '../../configs/settings';
import TestReducer, {
  fetchSms,
  getTestData,
  reducerName,
  SmsReducer,
} from '../../store/ducks/sms_events';
import './index.css';
import { result as results } from './result';

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
    // supersetFetch('2057').then((result: any) => {
    fetchTestDataActionCreator(results);
    // });
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
          <Form id="searchbox" onSubmit={this.handleSubmit}>
            <FormGroup>
              <div>
                <Input
                  type="text"
                  id="input"
                  placeholder="Search ID, Reporter, Patients"
                  onChange={this.handleTermChange}
                />
              </div>
            </FormGroup>
          </Form>
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
                      <DropdownItem onClick={this.handleLocationDropdownClick}>
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
                      <DropdownItem onClick={this.handleTypeDropdownClick}>{type}</DropdownItem>
                    );
                  })}
                  <DropdownItem>Something else</DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </div>
        </div>
        <div className="table-container">
          <Table striped={true} borderless={true}>
            <div id="headdiv">
              <thead>
                <tr>
                  <th id="default-width">ID</th>
                  <th id="default-width">Event Date</th>
                  <th id="default-width">Location</th>
                  <th id="default-width">SMS Type</th>
                  <th id="default-width">Reporter</th>
                  <th id="default-width">Patient</th>
                  <th id="small-width">Age</th>
                  <th id="large-width">Message</th>
                  <th id="default-width">Risk Level</th>
                </tr>
              </thead>
            </div>
            <div id="bodydiv">
              <tbody>
                {map(data, dataObj => {
                  return (
                    <tr key={dataObj.event_id}>
                      <td id="default-width">{dataObj.event_id}</td>
                      <td id="default-width">{dataObj.EventDate}</td>
                      <div id="default-width">
                        <a href="...">
                          <td>{dataObj.health_worker_location_name}</td>
                        </a>
                      </div>
                      <div id="default-width">
                        <a href="...">
                          <td>{dataObj.sms_type}</td>
                        </a>
                      </div>
                      <div id="default-width">
                        <a href="...">
                          <td>{dataObj.health_worker_name}</td>
                        </a>
                      </div>
                      <div id="default-width">
                        <a href="...">
                          <td>{dataObj.anc_id}</td>
                        </a>
                      </div>
                      <td id="small-width">{dataObj.age}</td>
                      <td id="large-width">
                        {dataObj.message.split('\n').map((item, key) => {
                          return (
                            <React.Fragment key={key}>
                              {item}
                              <br />
                            </React.Fragment>
                          );
                        })}
                      </td>
                      <div>
                        <RiskColoring {...{ Risk: dataObj.logface_risk }} />
                      </div>
                    </tr>
                  );
                })}
              </tbody>
            </div>
          </Table>
        </div>
      </div>
    );
  }

  private handleLocationDropdownClick = (e: React.FormEvent<HTMLInputElement>) => {
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

  private handleTypeDropdownClick = (e: React.FormEvent<HTMLInputElement>) => {
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
