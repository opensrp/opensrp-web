import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Store, ActionCreator } from 'redux';
import Loading from '../../../../components/page/Loading';
import { OPENSRP_TEAM_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import teamsReducer, {
    Team,
    fetchTeams,
    getTeamsArray,
    reducerName as teamsReducerName,
    setTotalRecords,
    getTotalRecords,
    removeTeams,
} from '../../../../store/ducks/teams';
import './teams.css';
import SearchBox from '../../../../components/page/SearchBox';
import '../../../../assets/styles/dropdown.css';
import { PAGINATION_SIZE, PAGINATION_NEIGHBORS } from '../../../../constants';
import { generateOptions } from '../../../../services/opensrp';
import { useTeamTableColumns } from './helpers/tableDefinition';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { Pagination, Props as PaginationProps } from '../../../../components/Pagination';
import { DropdownOption } from '../../../../helpers/Dropdown';
import { FetchAction, RemoveAction, SetTotalRecordsAction } from '../../../../store/ducks/baseDux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';

/** register the teams reducer */
reducerRegistry.register(teamsReducerName, teamsReducer);

/** interface for teams table props */
interface TeamTableProps {
    tableData: Team[];
}

/** render the teams table using opensrp-table */
const TeamTable: React.FC<TeamTableProps> = ({ tableData }: TeamTableProps) => (
    <OpenSRPTable {...{ data: tableData, tableColumns: useTeamTableColumns() }} />
);

/** props Interface for the teamList component */
export interface TeamListProps {
    service: typeof OpenSRPService;
    teamsArray: Team[];
    fetchTeamsCreator: ActionCreator<FetchAction<Team>>;
    totalRecords: number;
    removeTeamsCreator: ActionCreator<RemoveAction>;
    setTotalRecordsCreator: ActionCreator<SetTotalRecordsAction>;
}

/** interface for team state */
export interface TeamListState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
    currentPage: number;
}

/** default props for the teamList component */
export const defaultTeamListProps: TeamListProps = {
    teamsArray: [],
    fetchTeamsCreator: fetchTeams,
    removeTeamsCreator: removeTeams,
    service: OpenSRPService,
    totalRecords: 0,
    setTotalRecordsCreator: setTotalRecords,
};

/** default values for team state */
export const defaultTeamListState: TeamListState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
    currentPage: 1,
};

/** Display the team list  */
class TeamList extends React.Component<TeamListProps, TeamListState> {
    public static defaultProps: TeamListProps = defaultTeamListProps;
    constructor(props: TeamListProps) {
        super(props);
        this.state = defaultTeamListState;
    }

    public async componentDidMount(): Promise<void> {
        this.getDataFromServer();
    }

    /** fetch data from server when any filter is applied */
    getDataFromServer = async (extraParams?: any): Promise<void> => {
        const params = {
            pageNumber: this.state.currentPage,
            pageSize: PAGINATION_SIZE,
            ...extraParams,
        };
        const { fetchTeamsCreator, service, removeTeamsCreator, setTotalRecordsCreator } = this.props;
        const teamService = new service(OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT, generateOptions);
        const response = await teamService.list(params);
        removeTeamsCreator();
        fetchTeamsCreator(response.organizations);
        if (!(response.organizations.length > 0 && response.total == 0)) {
            setTotalRecordsCreator(response.total);
        }
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    /** filter data using first name or last name */
    searchTextfilter = (searchText: string): void => {
        this.setState(
            {
                ...this.state,
                searchText,
                currentPage: 1,
            },
            () => {
                this.getDataFromServer(searchText === '' ? {} : { name: searchText });
            },
        );
    };

    /** fetch data from server with a specific page number */
    onPageChange = (currentPage: number): void => {
        this.setState(
            {
                ...this.state,
                currentPage,
            },
            () => {
                this.getDataFromServer();
            },
        );
    };

    /** it returns the required options for pagination component */
    getPaginationOptions = (): PaginationProps => {
        return {
            onPageChangeHandler: this.onPageChange,
            pageNeighbors: PAGINATION_NEIGHBORS,
            pageSize: PAGINATION_SIZE,
            totalRecords: this.props.totalRecords,
        };
    };

    public render(): React.ReactNode {
        const { teamsArray, totalRecords } = this.props;
        /** render loader if there are no clients in state */
        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div className="client-page">
                    <Helmet>
                        <title>Teams</title>
                    </Helmet>
                    <h3 className="household-title"> All Teams ({totalRecords})</h3>
                    <Row>
                        <Col md={12} className="new-province">
                            <Link to="/team-form"> + Add New Team </Link>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string): void => this.searchTextfilter(searchText)}
                                    placeholder={`Search Team`}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={12}>
                            <TeamTable tableData={teamsArray} />
                        </Col>
                    </Row>
                    <Row>
                        <Col md={{ size: 9, offset: 3 }}>
                            <Pagination {...this.getPaginationOptions()} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export { TeamList };

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>) => {
    const result = {
        teamsArray: getTeamsArray(state),
        totalRecords: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchTeamsCreator: fetchTeams,
    removeTeamsCreator: removeTeams,
    setTotalRecordsCreator: setTotalRecords,
};

/** connect teamList to the redux store */
const ConnectedTeamList = connect(mapStateToProps, mapDispatchToProps)(TeamList);

export default ConnectedTeamList;
