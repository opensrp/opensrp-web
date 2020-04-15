import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { HOUSEHOLD_URL, OPENSRP_CLIENT_ENDPOINT, OPENSRP_EVENT_ENDPOINT } from '../../../constants';
import { OpenSRPService } from '@opensrp/server-service';

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
import { OPENSRP_API_BASE_URL } from '../../../configs/env';
import { generateOptions } from '../../../services/opensrp';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { useMemberTableColumns } from './helpers/tableDefinition';

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

interface MemberListProps {
    tableData: Client[];
}

/**
 * generate data for child table,
 * based on the configuration given in useMemberTableColumns
 * @param props
 */
function MemberTable(props: MemberListProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useMemberTableColumns() }} />;
}

/** interface for HouseholdProfileProps */
export interface HouseholdProfileProps extends RouteComponentProps<HouseholdProfileURLParams> {
    household: Household | null;
    events: Event[];
    members: Client[];
    fetchClient: typeof fetchHouseholds;
    fetchMembers: typeof fetchClients;
    fetchEvents: typeof fetchEvents;
    removeMembers: typeof removeClients;
}

class HouseholdProfile extends React.Component<HouseholdProfileProps> {
    public async componentDidMount(): Promise<void> {
        const { fetchClient, fetchMembers, fetchEvents, match, removeMembers } = this.props;
        const householdId = match.params.id || 'ea0edc48-4752-4ad0-a834-f1f68c7ae310';
        const params = { identifier: householdId };
        const clientService = new OpenSRPService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const clientResponse = await clientService.list(params);
        if (clientResponse[0]) {
            fetchClient(clientResponse);
            const eventService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_EVENT_ENDPOINT, generateOptions);
            const eventsResponse = await eventService.list(params);
            fetchEvents(eventsResponse);
            const memberParams = {
                baseEntityId: householdId,
                clientType: 'householdMember',
            };
            const memberService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
            const membersResponse = await memberService.list(memberParams);
            removeMembers();
            fetchMembers(membersResponse.clients);
        }
    }
    public render(): React.ReactNode {
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
                        <Col md={12}>
                            <MemberTable tableData={members} />
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
    fetchClient: fetchHouseholds,
    fetchEvents: fetchEvents,
    fetchMembers: fetchClients,
    removeMembers: removeClients,
};

const ConnectedHouseholdProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(HouseholdProfile));

export default ConnectedHouseholdProfile;
