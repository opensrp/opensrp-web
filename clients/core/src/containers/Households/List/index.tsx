import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import SearchBox from '../../../components/page/SearchBox';
import { OPENSRP_HOUSEHOLD_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { FlexObject } from '../../../helpers/utils';
import { OpenSRPService } from '../../../services/opensrp';
import householdsReducer, {
    fetchHouseholds,
    getHouseholdsArray,
    getTotalRecords,
    Household,
    reducerName as householdsReducerName,
    removeHouseholds,
    setTotalRecords,
} from '../../../store/ducks/households';
import './householdList.css';
import { HOUSEHOLD_CLIENT_TYPE } from '../../../constants';

/** register the households reducer */
reducerRegistry.register(householdsReducerName, householdsReducer);

/** props Interface for the householdList component */
export interface HouseholdListProps {
    opensrpService: typeof OpenSRPService;
    householdsArray: Household[];
    totalRecordsCount: number;
    fetchHouseholdsActionCreator: typeof fetchHouseholds;
    setTotalRecordsActionCreator: typeof setTotalRecords;
    removeHouseholdsActionCreator: typeof removeHouseholds;
}

export interface HouseholdListState {
    loading: boolean;
    pageNumber: number;
    searchPlaceholder: string;
    clientType: HOUSEHOLD_CLIENT_TYPE;
}

export const defaultHouseholdListState: HouseholdListState = {
    loading: true,
    pageNumber: 1,
    searchPlaceholder: 'Search Household',
    clientType: HOUSEHOLD_CLIENT_TYPE,
};

/** default props for the householdList component */
export const defaultHouseholdListProps: HouseholdListProps = {
    fetchHouseholdsActionCreator: fetchHouseholds,
    householdsArray: [],
    opensrpService: OpenSRPService,
    removeHouseholdsActionCreator: removeHouseholds,
    setTotalRecordsActionCreator: setTotalRecords,
    totalRecordsCount: 0,
};

/** Display the Household list  */
class HouseholdList extends React.Component<HouseholdListProps, HouseholdListState> {
    public static defaultProps: HouseholdListProps = defaultHouseholdListProps;

    public constructor(props: HouseholdListProps) {
        super(props);
        this.state = defaultHouseholdListState;
    }
    public async componentDidMount() {
        this.getHouseholdList();
    }

    public render() {
        /** render loader if there are no households in state */
        const { householdsArray, totalRecordsCount } = this.props;
        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h3 className="household-title"> Household ({totalRecordsCount}) </h3>
                    <Row>
                        <Col md={5}>
                            <div className="household-search-bar">
                                <SearchBox searchCallBack={this.search} placeholder={this.state.searchPlaceholder} />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <Table className="shadow-sm">
                                <thead>
                                    <tr>
                                        <th>HH ID Number</th>
                                        <th>Family Name</th>
                                        <th>Head of Household</th>
                                        <th>Phone</th>
                                        <th>Registered Date</th>
                                        <th>Members</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {householdsArray.map((household: Household) => {
                                        return (
                                            <tr key={household.baseEntityId}>
                                                <td>{household.baseEntityId}</td>
                                                <td>{household.lastName}</td>
                                                <td>{household.attributes.dynamicProperties.family_head}</td>
                                                <td>{household.attributes.dynamicProperties.phone_number}</td>
                                                <td>{household.dateCreated}</td>
                                                <td className="members-table-field">
                                                    {household.attributes.dynamicProperties.member_count}
                                                </td>
                                                <td>
                                                    <Link to={`/household/profile/${household.baseEntityId}/`}>
                                                        View
                                                    </Link>
                                                </td>
                                            </tr>
                                        );
                                    })}
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    private search = (searchText: string) => {
        this.getHouseholdList({ searchText });
    };

    /**
     * it can contain searchText or level or both
     * @param extraParams
     */
    private getHouseholdList(extraParams: FlexObject = {}) {
        const clientType = this.state.clientType;
        const params = {
            clientType,
            pageNumber: this.state.pageNumber,
            pageSize: PAGINATION_SIZE,
            ...extraParams,
        };
        const {
            fetchHouseholdsActionCreator,
            setTotalRecordsActionCreator,
            removeHouseholdsActionCreator,
            opensrpService,
        } = this.props;
        const hosueholdService = new opensrpService(`${OPENSRP_HOUSEHOLD_ENDPOINT}`);
        hosueholdService
            .list(params)
            .then((response: FlexObject) => {
                removeHouseholdsActionCreator();
                this.setState(
                    {
                        ...this.state,
                        loading: false,
                    },
                    () => {
                        fetchHouseholdsActionCreator(response.clients);
                        setTotalRecordsActionCreator(response.total);
                    },
                );
            })
            .catch(error => {});
    }
}

export { HouseholdList };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    householdsArray: Household[];
    totalRecordsCount: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        householdsArray: getHouseholdsArray(state),
        totalRecordsCount: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchHouseholdsActionCreator: fetchHouseholds,
    removeHouseholdsActionCreator: removeHouseholds,
    setTotalRecordsActionCreator: setTotalRecords,
};

/** connect householdsList to the redux store */
const ConnectedHouseholdList = connect(mapStateToProps, mapDispatchToProps)(HouseholdList);

export default ConnectedHouseholdList;
