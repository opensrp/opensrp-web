import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import SearchBox from '../../../../components/page/SearchBox';
import { OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import ANCReducer, {
    fetchANC,
    getAllANCArray,
    removeANCAction,
    reducerName,
    setTotalANCRecords,
    getTotalANCRecords,
    ANCClientType as ANC,
} from '../../../../store/ducks/anc';
import './anc.css';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { useANCTableColumns } from './helpers/tableDefinition';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { ANC_CLIENT_TYPE, OPENSRP_CLIENT_ENDPOINT, PAGINATION_NEIGBOURS, PAGINATION_SIZE } from '../../../../constants';
import { Pagination } from '../../../../components/Pagination';

reducerRegistry.register(reducerName, ANCReducer);

/** props interface for the ANCList component */
export interface ANCProps {
    opensrpService: typeof OpenSRPService;
    ancArray: ANC[];
    fetchANC: typeof fetchANC;
    removeANC: typeof removeANCAction;
    totalRecords: number;
    setTotalRecords: typeof setTotalANCRecords;
}

/** state interface for the ancList component */
export interface ANCState {
    loading: boolean;
    searchText: string;
    currentPage: number;
}

/** default props for the ancList component */
export const defaultANCProps: ANCProps = {
    opensrpService: OpenSRPService,
    ancArray: [],
    fetchANC: fetchANC,
    removeANC: removeANCAction,
    setTotalRecords: setTotalANCRecords,
    totalRecords: 0,
};

/** default state for the ancList component */
export const defaultANCState: ANCState = {
    loading: true,
    searchText: '',
    currentPage: 1,
};

/** props interface for the anc table */
export interface ANCTableProps {
    tableData: ANC[];
}

/**
 * generate data for anc table,
 * based on the configuration given in useANCTableColumns
 * @param props
 */
function ANCTable(props: ANCTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useANCTableColumns() }} />;
}

/** Display the anc list  */
class ANCList extends React.Component<ANCProps, ANCState> {
    public static defaultProps: ANCProps = defaultANCProps;

    constructor(props: ANCProps) {
        super(props);
        this.state = defaultANCState;
    }

    public componentDidMount() {
        this.getDataFromServer();
    }

    /** fetch data from the server. it gets invoked when any filter changes */
    getDataFromServer = async () => {
        const params = {
            clientType: ANC_CLIENT_TYPE,
            pageNumber: '1',
            pageSize: PAGINATION_SIZE,
            searchText: this.state.searchText,
        };
        const { fetchANC, opensrpService, setTotalRecords, removeANC } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        const response = await clientService.list(params);
        removeANC();
        fetchANC(response.clients);
        setTotalRecords(response.total);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    searchTextfilter = (searchText: string) => {
        this.setState(
            {
                ...this.state,
                searchText,
            },
            () => {
                this.getDataFromServer();
            },
        );
    };

    /** fetch data from server with a specific page number */
    onPageChange = (currentPage: number, pageSize: number): void => {
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
    getPaginationOptions = () => {
        return {
            onPageChangeHandler: this.onPageChange,
            pageNeighbors: PAGINATION_NEIGBOURS,
            pageSize: PAGINATION_SIZE,
            totalRecords: this.props.totalRecords,
        };
    };

    public render() {
        const { ancArray, totalRecords } = this.props;
        /** render loader if there are no anc in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div style={{ fontSize: '14px' }}>
                    <h3 className="household-title"> All ANC ({totalRecords})</h3>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string) => this.searchTextfilter(searchText)}
                                    placeholder={`Search ANC`}
                                />
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ANCTable tableData={ancArray} />
                        </Col>
                        <Col md={{ size: 3, offset: 3 }}>
                            <Pagination {...this.getPaginationOptions()} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export { ANCList };

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    ancArray: ANC[];
    totalRecords: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        ancArray: getAllANCArray(state),
        totalRecords: getTotalANCRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchANC: fetchANC,
    removeANC: removeANCAction,
    setTotalRecords: setTotalANCRecords,
};

/** connect ancList to the redux store */
const ConnectedANCList = connect(mapStateToProps, mapDispatchToProps)(ANCList);

export default ConnectedANCList;
