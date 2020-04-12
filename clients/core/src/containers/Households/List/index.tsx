import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import SearchBox from '../../../components/page/SearchBox';
import { OPENSRP_API_BASE_URL } from '../../../configs/env';
import { FlexObject } from '../../../helpers/utils';
import { OpenSRPService } from '@opensrp/server-service';
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
import {
    HOUSEHOLD_CLIENT_TYPE,
    OPENSRP_CLIENT_ENDPOINT,
    PAGINATION_NEIGBOURS,
    PAGINATION_SIZE,
} from '../../../constants';
import { generateOptions } from '../../../services/opensrp';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { useHouseholdTableColumns } from './helpers/tableDefinitions';
import { Pagination, Props as PaginationProps } from '../../../components/Pagination';

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

/** interface for household-list component */
export interface HouseholdListState {
    loading: boolean;
    currentPage: number;
    searchPlaceholder: string;
    clientType: HOUSEHOLD_CLIENT_TYPE;
}

/** default state for household-list component */
export const defaultHouseholdListState: HouseholdListState = {
    loading: true,
    currentPage: 1,
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

/** props interface for the household table */
export interface HouseholdTableProps {
    tableData: Household[];
}

/**
 * generate data for household table,
 * based on the configuration given in useChildTableColumns
 * @param props
 */
function HouseholdTable(props: HouseholdTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useHouseholdTableColumns() }} />;
}

/** Display the Household list  */
class HouseholdList extends React.Component<HouseholdListProps, HouseholdListState> {
    public static defaultProps: HouseholdListProps = defaultHouseholdListProps;

    public constructor(props: HouseholdListProps) {
        super(props);
        this.state = defaultHouseholdListState;
    }
    public async componentDidMount(): Promise<void> {
        this.getHouseholdList();
    }

    /** fetch data from server with a specific page number */
    onPageChange = (currentPage: number): void => {
        this.setState(
            {
                ...this.state,
                currentPage,
            },
            () => {
                this.getHouseholdList();
            },
        );
    };

    /** it returns the required options for pagination component */
    getPaginationOptions = (): PaginationProps => {
        return {
            onPageChangeHandler: this.onPageChange,
            pageNeighbors: PAGINATION_NEIGBOURS,
            pageSize: PAGINATION_SIZE,
            totalRecords: this.props.totalRecordsCount,
        };
    };

    public render(): React.ReactNode {
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
                            <HouseholdTable tableData={householdsArray} />
                        </Col>
                        <Col md={{ size: 3, offset: 3 }}>
                            <Pagination {...this.getPaginationOptions()} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }

    private search = (searchText: string): void => {
        this.getHouseholdList({ searchText });
    };

    /**
     * it contains searchText value
     * @param extraParams
     */
    private getHouseholdList(extraParams: FlexObject = {}): void {
        const clientType = this.state.clientType;
        const params = {
            clientType,
            pageNumber: this.state.currentPage,
            pageSize: PAGINATION_SIZE,
            ...extraParams,
        };
        const {
            fetchHouseholdsActionCreator,
            setTotalRecordsActionCreator,
            removeHouseholdsActionCreator,
            opensrpService,
        } = this.props;
        const householdService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        householdService
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
                        if (response.total > 0) setTotalRecordsActionCreator(response.total);
                    },
                );
            })
            .catch(error => error);
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
