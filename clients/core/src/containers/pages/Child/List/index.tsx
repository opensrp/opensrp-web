import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import SearchBox from '../../../../components/page/SearchBox';
import { PAGINATION_SIZE, OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import childReducer, {
    fetchChildList,
    getChildArray,
    removeChildList,
    reducerName,
    setTotalRecords,
    getTotalRecords,
    Child,
} from '../../../../store/ducks/child';
import './childList.css';
import Select from 'react-select';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import '../../../../assets/styles/dropdown.css';
import { useChildTableColumns } from './helpers/tableDefinition';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption, genderOptions } from '../../../../helpers/Dropdown';

reducerRegistry.register(reducerName, childReducer);

/** props Interface for the clientList component */
export interface ChildListProps {
    opensrpService: typeof OpenSRPService;
    childArray: Child[];
    fetchChild: typeof fetchChildList;
    removeChild: typeof removeChildList;
    totalRecords: number;
    setTotalRecords: typeof setTotalRecords;
}

export interface ChildListState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
}

/** default props for the clientList component */
export const defaultChildListProps: ChildListProps = {
    opensrpService: OpenSRPService,
    childArray: [],
    fetchChild: fetchChildList,
    removeChild: removeChildList,
    setTotalRecords: setTotalRecords,
    totalRecords: 0,
};

export const defaultChildState: ChildListState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
};

export interface ChildTableProps {
    tableData: Child[];
}

const ChildTable: React.FC<ChildTableProps> = props => {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useChildTableColumns() }} />;
};

/** Display the client list  */
class ChildList extends React.Component<ChildListProps, ChildListState> {
    public static defaultProps: ChildListProps = defaultChildListProps;

    constructor(props: ChildListProps) {
        super(props);
        this.state = defaultChildState;
    }

    public componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer = async () => {
        const params = {
            clientType: 'child',
            pageNumber: '1',
            pageSize: PAGINATION_SIZE,
            gender: this.state.selectedGender.value,
            searchText: this.state.searchText,
        };
        const { fetchChild, opensrpService, setTotalRecords, removeChild } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        const response = await clientService.list(params);
        removeChild();
        fetchChild(response.clients);
        setTotalRecords(response.total);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    genderFilter = (selectedGender: DropdownOption) => {
        this.setState(
            {
                ...this.state,
                selectedGender,
            },
            () => {
                this.getDataFromServer();
            },
        );
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

    public render() {
        const { childArray, totalRecords } = this.props;
        /** render loader if there are no clients in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h3 className="household-title"> All Clients ({totalRecords})</h3>
                    <Row>
                        <Col md={{ size: 3, offset: 9 }}> Gender </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string) => this.searchTextfilter(searchText)}
                                    placeholder={`Search Client`}
                                />
                            </div>
                        </Col>
                        <Col md={3}>
                            <Select
                                value={this.state.selectedGender}
                                classNamePrefix="select"
                                className="basic-single"
                                onChange={(e: any) => this.genderFilter(e as DropdownOption)}
                                options={genderOptions}
                            />
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <ChildTable tableData={childArray} />
                        </Col>
                    </Row>
                </div>
            );
        }
    }
}

export { ChildList };
/** Maybe define default props */
/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    childArray: Child[];
    totalRecords: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        childArray: getChildArray(state),
        totalRecords: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = {
    fetchChild: fetchChildList,
    removeChild: removeChildList,
    setTotalRecords: setTotalRecords,
};

/** connect clientsList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(ChildList);

export default ConnectedChildList;
