import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, OPENSRP_HOUSEHOLD_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  fetchClient,
  fetchEvents,
  fetchMembers,
  getClient,
  getEventsArray,
  getMembersArray,
  reducerName as clientReducerName,
} from '../../../store/ducks/client';
import { Event } from '../../../store/ducks/client';
import { Household } from '../../../store/ducks/clients';

/** register the client reducer */
reducerRegistry.register(clientReducerName, clientReducer);

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
      <div>
        <h3> {household.lastName} </h3>
        <div id="basic information">
          <Row>
            <Col>
              <span> Basic Information</span>
              <div className="float-right">Edit Profile</div>
            </Col>
          </Row>
          <Row>
            <Table>
              <tbody>
                <tr>
                  <td>HHID Number</td>
                  <td>{household.baseEntityId}</td>
                  <td>Phone</td>
                  <td>{household.attributes.phoneNumber || ''}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Family Name</td>
                  <td>{household.lastName}</td>
                  <td>Provider</td>
                  <td>{events[0] ? events[0].providerId : ''}</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <td>Head of Household</td>
                  <td>{household.firstName}</td>
                  <td>Register date</td>
                  <td>{household.dateCreated || ''}</td>
                </tr>
              </tbody>
            </Table>
          </Row>
        </div>
      </div>
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
