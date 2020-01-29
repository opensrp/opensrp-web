import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import {
  OPENSRP_CLIENT_ENDPOINT,
  OPENSRP_EVENT_ENDPOINT,
  OPENSRP_HOUSEHOLD_ENDPOINT,
} from '../../../configs/env';
import { HOUSEHOLD_URL } from '../../../constants';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducer,
  removeClients,
} from '../../../store/ducks/clients';
import eventReducer, {
  Event,
  fetchEvents,
  getEventsArray,
  reducerName as eventReducerName,
} from '../../../store/ducks/events';
import householdsReducer, {
  fetchHouseholds,
  getHouseholdsArray,
  Household,
  reducerName as householdReducerName,
} from '../../../store/ducks/households';
import './householdProfile.css';

/** register the event reducer */
reducerRegistry.register(eventReducerName, eventReducer);

/** register the client reducer */
reducerRegistry.register(clientsReducer, clientReducer);

/** register the household reducer */
reducerRegistry.register(householdReducerName, householdsReducer);

/** interface for HouseholdProfile URL params */
interface HouseholdProfileURLParams {
  id: string;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
  household: Household | null;
  events: Event[];
  members: Client[];
  fetchClientActionCreator: typeof fetchHouseholds;
  fetchMembersActionCreator: typeof fetchClients;
  fetchEventsActionCreator: typeof fetchEvents;
  removeMembersActionCreator: typeof removeClients;
  opensrpService: typeof OpenSRPService;
}

class HouseholdProfile extends React.Component<HouseholdProfileProps> {
  public async componentDidMount() {
    const {
      fetchClientActionCreator,
      fetchMembersActionCreator,
      fetchEventsActionCreator,
      match,
      removeMembersActionCreator,
    } = this.props;
    const householdId = match.params.id || '';
    const params = { identifier: householdId };
    const clientService = new OpenSRPService(`${OPENSRP_CLIENT_ENDPOINT}`);
    const clientResponse = await clientService.list(params);
    if (clientResponse[0]) {
      fetchClientActionCreator(clientResponse);
      const eventService = new OpenSRPService(`${OPENSRP_EVENT_ENDPOINT}`);
      const eventsResponse = await eventService.list(params);
      fetchEventsActionCreator(eventsResponse);
      const memberParams = {
        baseEntityId: householdId,
        clientType: 'householdMember',
      };
      const memberService = new OpenSRPService(`${OPENSRP_HOUSEHOLD_ENDPOINT}`);
      const membersResponse = await memberService.list(memberParams);
      removeMembersActionCreator();
      fetchMembersActionCreator(membersResponse.clients);
    }
  }
  public render() {
    const { household, events, members } = this.props;
    if (!household) {
      return <Loading />;
    }
    return (
      <Container id="householdProfile">
        <div className="page-title">
          <span className="back-btn-bg">
            <Link to={`${HOUSEHOLD_URL}`}>
              <FontAwesomeIcon icon="arrow-left" />
              <span className="back-btn"> Back to Household </span>
            </Link>
          </span>
          <h3> {household.lastName} </h3>
        </div>
        <div id="basic-info-container">
          <Row className="basic-info-header-bg">
            <Col className="basic-info-header">
              <span className="basic-info-title"> Basic Information</span>
              <div className="float-right basic-info-edit">
                <a href={`${'#'}`}>Edit Profile</a>
              </div>
            </Col>
          </Row>
          <Row>
            <Col className="basic-info-body">
              <Table className="basic-info-table" borderless={true}>
                <tbody>
                  <tr>
                    <td className="basic-info-label">HHID Number</td>
                    <td>{household.baseEntityId}</td>
                    <td className="basic-info-label">Phone</td>
                    <td>{household.attributes.phoneNumber || ''}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="basic-info-label">Family Name</td>
                    <td>{household.lastName}</td>
                    <td className="basic-info-label">Provider</td>
                    <td>{events[0] ? events[0].providerId : ''}</td>
                  </tr>
                </tbody>
                <tbody>
                  <tr>
                    <td className="basic-info-label">Head of Household</td>
                    <td>{household.firstName}</td>
                    <td className="basic-info-label">Register date</td>
                    <td>{household.dateCreated || ''}</td>
                  </tr>
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
        <div id="members-list-container">
          <Row>
            <Col className="members-list-header">
              <span> Members List</span>
            </Col>
          </Row>
          <Row>
            <Col className="members-list-body">
              <Table striped={true}>
                <thead>
                  <tr>
                    <td>First Name</td>
                    <td>Last Name</td>
                    <td>Age</td>
                    <td>Register Status</td>
                    <td>Actions</td>
                  </tr>
                </thead>
                <tbody>
                  {members.map((member: Client) => {
                    return (
                      <tr key={member.baseEntityId}>
                        <td>{member.firstName}</td>
                        <td>{member.lastName}</td>
                        <td>{member.attributes.dynamicProperties.age_year_part}</td>
                        <td>{member.attributes.dynamicProperties.registration_status}</td>
                        <td>
                          <a href={`${'#'}`}> View </a>
                          <a href={`${'#'}`} className="remove-btn">
                            Remove
                          </a>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>
            </Col>
          </Row>
        </div>
      </Container>
    );
  }
}

export { HouseholdProfile };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  household: Household | null;
  events: Event[];
  members: Household[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    events: getEventsArray(state),
    household: getHouseholdsArray(state).length > 0 ? getHouseholdsArray(state)[0] : null,
    members: getClientsArray(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  fetchClientActionCreator: fetchHouseholds,
  fetchEventsActionCreator: fetchEvents,
  fetchMembersActionCreator: fetchClients,
  removeMembersActionCreator: removeClients,
};

const ConnectedHouseholdProfile = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HouseholdProfile)
);

export default ConnectedHouseholdProfile;
