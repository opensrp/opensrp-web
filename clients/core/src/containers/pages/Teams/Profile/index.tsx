import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { matchPath } from 'react-router';
import { Col, Container, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import { TEAM_URL, TEAM_PROFILE_URL } from '../../../../constants';
import { OpenSRPService } from '@opensrp/server-service';
import team, { Team, fetchTeams, reducerName as teamsReducer, getTeamById } from '../../../../store/ducks/teams';

import teamMember, {
    TeamMember,
    fetchTeamMembers,
    getTeamMembersArray,
    reducerName as teamMemberReducer,
    removeTeamMembers,
} from '../../../../store/ducks/teamMembers';

import {
    OPENSRP_API_BASE_URL,
    OPENSRP_TEAM_PROFILE_ENDPOINT,
    OPENSRP_TEAM_MEMBER_ENDPOINT,
    OPENSRP_LOCATION_ENDPOINT,
    OPENSRP_TEAM_ENDPOINT,
} from '../../../../configs/env';
import { generateOptions } from '../../../../services/opensrp';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { useTeamMemberTableColumns } from './helpers/tableDefinition';
import InfoCard from '../../../../components/page/InfoCard';
import { Location } from '../../../../store/ducks/adminLocation';
// import InfoCard from '../../../../../components/page/InfoCard';

// /** register the team reducer */
reducerRegistry.register(teamsReducer, team);

/** register the teamMember reducer */
reducerRegistry.register(teamMemberReducer, teamMember);

/** interface for TeamProfile URL params */
interface TeamProfileURLParams {
    id: string;
}

interface MemberListProps {
    tableData: TeamMember[];
}

/**
 * generate data for child table,
 * based on the configuration given in useMemberTableColumns
 * @param props
 */
function MemberTable(props: MemberListProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useTeamMemberTableColumns() }} />;
}

/** interface for TeamProfileProps */
export interface TeamProfileProps {
    team: Team | null;
    members: TeamMember[];
    fetchTeam: typeof fetchTeams;
    fetchMembers: typeof fetchTeamMembers;
    removeMembers: typeof removeTeamMembers;
    opensrpService: typeof OpenSRPService;
}

export interface TeamProfileState {
    location: string;
    supervisor: Team | null;
}

export type ProfileWithRoutesProps = TeamProfileProps & RouteComponentProps<TeamProfileURLParams>;

export const defaultProfileProps: TeamProfileProps = {
    team: null,
    members: [],
    fetchTeam: fetchTeams,
    fetchMembers: fetchTeamMembers,
    removeMembers: removeTeamMembers,
    opensrpService: OpenSRPService,
};

class TeamProfile extends React.Component<ProfileWithRoutesProps, TeamProfileState> {
    public static defaultProps: TeamProfileProps = defaultProfileProps;

    constructor(props: any) {
        super(props);
        this.state = {
            location: '',
            supervisor: null,
        };
    }

    public componentDidMount = async () => {
        const { fetchTeam, fetchMembers, match, removeMembers, opensrpService } = this.props;
        const teamId = match.params.id;
        let teamService = new opensrpService(
            OPENSRP_API_BASE_URL,
            `${OPENSRP_TEAM_PROFILE_ENDPOINT}/${teamId}`,
            generateOptions,
        );
        const team = await teamService.list();
        fetchTeam([team]);

        const teamMemberService = new opensrpService(
            OPENSRP_API_BASE_URL,
            `${OPENSRP_TEAM_MEMBER_ENDPOINT}/${teamId}`,
            generateOptions,
        );
        teamMemberService.list().then((membersResponse: TeamMember[]) => {
            removeMembers();
            fetchMembers(membersResponse);
        });

        /**
         * Fetch assigned locations
         */
        const fetchAssignedLocations = new opensrpService(
            OPENSRP_API_BASE_URL,
            `organization/assignedLocationsAndPlans/${team.identifier}`,
            generateOptions,
        );
        const assignedLocations = await fetchAssignedLocations.list();

        if (assignedLocations.length > 0) {
            /**
             * Finding locations
             */
            const locationService = new opensrpService(
                OPENSRP_API_BASE_URL,
                OPENSRP_LOCATION_ENDPOINT,
                generateOptions,
            );
            const locationRes = await locationService.list();
            const locationIds = assignedLocations
                .map((l: any) => l.jurisdictionId)
                .filter((v: any, i: any, a: any) => a.indexOf(v) === i);

            const selectedLocations = locationRes.locations
                .filter((loc: any) => locationIds.indexOf(loc.id) > -1)
                .map((loc: any) => loc.properties.name)
                .join(', ');

            console.log('team location -->', selectedLocations);
            this.setState({
                ...this.state,
                location: selectedLocations,
            });
        }

        /**
         * Fetch supervisior
         */
        if (team.partOf !== null && team.partOf !== undefined) {
            teamService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT, generateOptions);
            const teamList = await teamService.list();
            const supervisor = teamList.organizations.filter((t: any) => t.id == team.partOf)[0];
            console.log(' team supervisor ', supervisor);

            this.setState({
                ...this.state,
                supervisor,
            });
        }
    };
    public render(): React.ReactNode {
        const { team, members } = this.props;
        const { location, supervisor } = this.state;
        console.log('location ', location, ', supervisor ', supervisor);
        console.log(' state ', this.state);
        if (!team) {
            return <Loading />;
        }
        return (
            <Container id="teamProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to={`${TEAM_URL}`}>
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Teams </span>
                        </Link>
                    </span>
                </div>
                <InfoCard title="Basic information">
                    <Col className="info-body">
                        <Table className="info-table" borderless={true}>
                            <tbody>
                                <tr>
                                    <td className="info-label">Identifier:</td>
                                    <td>{team.identifier}</td>
                                    <td className="info-label">Status:</td>
                                    <td>{team.active ? 'active' : 'deactive'}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Name:</td>
                                    <td>{team.name}</td>
                                    <td className="info-label">Description:</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Location:</td>
                                    <td>{location === null ? '' : location}</td>
                                    <td className="info-label">Supervisor:</td>
                                    <td>{supervisor === null ? '' : supervisor.name}</td>
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

export { TeamProfile };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    team: Team | null;
    members: TeamMember[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const match: any = matchPath(window.location.pathname, {
        path: `${TEAM_PROFILE_URL}/:id`,
    });
    const teamId = match !== null ? match.params.id : '';

    const result = {
        team: getTeamById(state, teamId),
        members: getTeamMembersArray(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchTeam: fetchTeams,
    fetchMembers: fetchTeamMembers,
    removeMembers: removeTeamMembers,
};

const ConnectedTeamProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(TeamProfile));

export default ConnectedTeamProfile;
