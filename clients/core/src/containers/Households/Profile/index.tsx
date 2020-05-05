import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Col, Container, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import {
    HOUSEHOLD_URL,
    OPENSRP_CLIENT_ENDPOINT,
    OPENSRP_EVENT_ENDPOINT,
    OPENSRP_SINGLE_CLIENT_ENDPOINT,
    HOUSEHOLD_PROFILE_URL,
} from '../../../constants';
import { OpenSRPService } from '@opensrp/server-service';
import { FlexObject } from '../../../helpers/utils';

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
    Household,
    reducerName as householdReducerName,
    getHouseholdById,
} from '../../../store/ducks/households';
import './householdProfile.css';
import { OPENSRP_API_BASE_URL } from '../../../configs/env';
import { generateOptions } from '../../../services/opensrp';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { useMemberTableColumns } from './helpers/tableDefinition';
import InfoCard from '../../../components/page/InfoCard';

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
export interface HouseholdProfileProps {
    household: Household | null;
    events: Event[];
    members: Client[];
    fetchHousehold: typeof fetchHouseholds;
    fetchMembers: typeof fetchClients;
    fetchEvents: typeof fetchEvents;
    removeMembers: typeof removeClients;
    opensrpService: typeof OpenSRPService;
}

export type ProfileWithRoutesProps = HouseholdProfileProps & RouteComponentProps<HouseholdProfileURLParams>;

export const defaultProfileProps: HouseholdProfileProps = {
    household: null,
    events: [],
    members: [],
    fetchHousehold: fetchHouseholds,
    fetchMembers: fetchClients,
    fetchEvents: fetchEvents,
    removeMembers: removeClients,
    opensrpService: OpenSRPService,
};

class HouseholdProfile extends React.Component<ProfileWithRoutesProps> {
    public static defaultProps: HouseholdProfileProps = defaultProfileProps;

    public async componentDidMount(): Promise<void> {
        const { fetchHousehold, fetchMembers, fetchEvents, match, removeMembers, opensrpService } = this.props;
        const householdId = match.params.id;
        const params = { identifier: householdId };

        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_SINGLE_CLIENT_ENDPOINT, generateOptions);
        clientService.list(params).then((clientResponse: Client[]) => fetchHousehold(clientResponse));

        const eventService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_EVENT_ENDPOINT, generateOptions);
        eventService.list(params).then((eventResponse: Event[]) => fetchEvents(eventResponse));

        const memberParams = {
            baseEntityId: householdId,
            clientType: 'householdMember',
        };
        const memberService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        memberService.list(memberParams).then((membersResponse: FlexObject) => {
            removeMembers();
            fetchMembers(membersResponse.clients);
        });
    }
    public render(): React.ReactNode {
        const { household, events, members } = this.props;
        if (!household) {
            return <Loading />;
        }
        return (
            <Container id="household-profile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to={`${HOUSEHOLD_URL}`}>
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Household </span>
                        </Link>
                    </span>
                    <h3> {household.lastName} </h3>
                </div>
                <InfoCard title="Basic information">
                    <Col className="info-body">
                        <Table className="info-table" borderless={true}>
                            <tbody>
                                <tr>
                                    <td className="info-label">HHID Number</td>
                                    <td>{household.baseEntityId}</td>
                                    <td className="info-label">Phone</td>
                                    <td>{household.attributes.phoneNumber || ''}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Family Name</td>
                                    <td>{household.lastName}</td>
                                    <td className="info-label">Provider</td>
                                    <td>{events[0] ? events[0].providerId : ''}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Head of Household</td>
                                    <td>{household.firstName}</td>
                                    <td className="info-label">Register date</td>
                                    <td>{household.dateCreated || ''}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </InfoCard>

                <InfoCard title="Member List">
                    <Col md={12}>
                        <MemberTable tableData={members} />
                    </Col>
                </InfoCard>
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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match: any = matchPath(window.location.pathname, {
        path: `${HOUSEHOLD_PROFILE_URL}/:id`,
    });
    const householdId = match !== null ? match.params.id : '';

    const result = {
        events: getEventsArray(state),
        household: getHouseholdById(state, householdId),
        members: getClientsArray(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchHousehold: fetchHouseholds,
    fetchEvents: fetchEvents,
    fetchMembers: fetchClients,
    removeMembers: removeClients,
};

const ConnectedHouseholdProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(HouseholdProfile));

export default ConnectedHouseholdProfile;
