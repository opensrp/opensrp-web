import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, OPENSRP_HOUSEHOLD_ENDPOINT } from '../../../configs/env';
import { HOUSEHOLD_URL } from '../../../constants';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  fetchClient,
  getClient,
  reducerName as clientReducerName,
} from '../../../store/ducks/client';
import { Client } from '../../../store/ducks/clients';
import EventReducer, {
  Event,
  fetchEvents,
  getEventsArray,
  reducerName as eventReducerName,
} from '../../../store/ducks/events';
import { Household } from '../../../store/ducks/households';
import memberReducer, {
  fetchMembers,
  getMembersArray,
  reducerName as memberReducerName,
} from '../../../store/ducks/members';
import './householdProfile.css';

/** register the client reducer */
reducerRegistry.register(clientReducerName, clientReducer);

/** register the client reducer */
reducerRegistry.register(memberReducerName, memberReducer);

/** register the client reducer */
reducerRegistry.register(eventReducerName, EventReducer);

/** interface for HouseholdProfile URL params */
interface HouseholdProfileURLParams {
  id: string;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
  household: Household;
  events: Event[];
  members: Household[];
  fetchClientActionCreator: typeof fetchClient;
  fetchMembersActionCreator: typeof fetchMembers;
  fetchEventsActionCreator: typeof fetchEvents;
  opensrpService: typeof OpenSRPService;
}

class HouseholdProfile extends React.Component<HouseholdProfileProps> {
  public async componentDidMount() {
    const {
      fetchClientActionCreator,
      fetchMembersActionCreator,
      fetchEventsActionCreator,
      match,
    } = this.props;
    const householdId = match.params.id || '';
    const params = { identifier: householdId };
    const clientService = new OpenSRPService(`${OPENSRP_CLIENT_ENDPOINT}`);
    const clientResponse = await clientService.list(params);
    if (clientResponse[0]) {
      fetchClientActionCreator(clientResponse[0]);
      const eventService = new OpenSRPService('event/search');
      const eventsResponse = await eventService.list(params);
      fetchEventsActionCreator(eventsResponse);
      const memberParams = {
        baseEntityId: householdId,
        clientType: 'householdMember',
      };
      const memberService = new OpenSRPService(`${OPENSRP_HOUSEHOLD_ENDPOINT}`);
      const membersResponse = await memberService.list(memberParams);
      fetchMembersActionCreator(membersResponse.clients);
    }
  }
  public render() {
    const { household, events, members } = this.props;
    if (!household) {
      return <Loading />;
    }
    return (
      <Container>
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
                        <td>{member.attributes.age_year_part}</td>
                        <td>{member.attributes.registration_status}</td>
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

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  household: Household;
  events: Event[];
  members: Household[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    events: getEventsArray(state),
    household: getClient(state),
    members: getMembersArray(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  fetchClientActionCreator: fetchClient,
  fetchEventsActionCreator: fetchEvents,
  fetchMembersActionCreator: fetchMembers,
};

const ConnectedHouseholdProfile = withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(HouseholdProfile)
);

export default ConnectedHouseholdProfile;
