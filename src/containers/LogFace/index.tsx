// import { any } from 'prop-types';
import reducerRegistry from '@onaio/redux-reducer-registry';
import { map } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Form, FormGroup, Input, Table } from 'reactstrap';
import RiskColoring from '../../components/RiskColoring';
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

const defaultprops: PropsInterface = {
  fetchTestDataActionCreator: fetchSms,
  testData: [],
};

export class LogFace extends React.Component<PropsInterface, {}> {
  public static defaultProps = defaultprops;

  constructor(props: any) {
    super(props);
  }
  public componentDidMount() {
    const { fetchTestDataActionCreator } = this.props;
    // supersetFetch('2057').then((result: any) => {
    // debugger
    fetchTestDataActionCreator(results);
    // });
  }

  // tslint:disable-next-line: no-empty
  public handleSubmit() {}
  // tslint:disable-next-line: no-empty
  public handleTermChange() {}
  public handleKeyPress(event: { key: string }) {
    if (event.key === 'Enter') {
      this.handleSearch();
    }
  }
  // tslint:disable-next-line: no-empty
  public handleSearch() {}

  public render() {
    const data = this.props.testData;

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
                  placeholder="Search ID, Reporter, Patients"
                  onChange={this.handleTermChange}
                  onKeyPress={this.handleKeyPress}
                />
              </div>
            </FormGroup>
          </Form>
          <div className="filters">
            <div className="location-type-filter">
              Location
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <div>
                    <Input
                      type="text"
                      placeholder="Filter by Location"
                      onChange={this.handleTermChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </div>
                </FormGroup>
              </Form>
            </div>
            <div className="location-type-filter">
              Type
              <Form onSubmit={this.handleSubmit}>
                <FormGroup>
                  <div>
                    <Input
                      type="text"
                      placeholder="Filter by Type"
                      onChange={this.handleTermChange}
                      onKeyPress={this.handleKeyPress}
                    />
                  </div>
                </FormGroup>
              </Form>
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
