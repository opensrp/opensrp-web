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
import { CHILD_CLIENT_TYPE } from '../../../../constants';

reducerRegistry.register(reducerName, childReducer);

/** props interface for the childList component */
export interface ChildListProps {
    opensrpService: typeof OpenSRPService;
    childArray: Child[];
    fetchChild: typeof fetchChildList;
    removeChild: typeof removeChildList;
    totalRecords: number;
    setTotalRecords: typeof setTotalRecords;
}

/** state interface for the childList component */
export interface ChildListState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
}

/** default props for the childList component */
export const defaultChildListProps: ChildListProps = {
    opensrpService: OpenSRPService,
    childArray: [],
    fetchChild: fetchChildList,
    removeChild: removeChildList,
    setTotalRecords: setTotalRecords,
    totalRecords: 0,
};

/** default state for the childList component */
export const defaultChildState: ChildListState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
};

/** props interface for the child table */
export interface ChildTableProps {
    tableData: Child[];
}

/**
 * generate data for child table,
 * based on the configuration given in useChildTableColumns
 * @param props
 */
function ChildTable(props: ChildTableProps): React.ReactElement {
    return <OpenSRPTable {...{ data: props.tableData, tableColumns: useChildTableColumns() }} />;
}

/** Display the child list  */
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
            clientType: CHILD_CLIENT_TYPE,
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
        /** render loader if there are no child in state */

        if (this.state.loading) {
            return <Loading />;
        } else {
            return (
                <div>
                    <h3 className="household-title"> All Child ({totalRecords})</h3>
                    <Row>
                        <Col md={{ size: 3, offset: 9 }}> Gender </Col>
                    </Row>
                    <Row>
                        <Col md={9} className="filter-row">
                            <div className="household-search-bar">
                                <SearchBox
                                    searchCallBack={(searchText: string) => this.searchTextfilter(searchText)}
                                    placeholder={`Search Child`}
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

/** connect childList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(ChildList);

export default ConnectedChildList;
