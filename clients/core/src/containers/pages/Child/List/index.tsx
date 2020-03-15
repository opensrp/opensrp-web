import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import SearchBox from '../../../components/page/SearchBox';
import { OPENSRP_CHILD_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import childReducer, {
    fetchChildList,
    getChildArray,
    removeChildList,
    reducerName,
    setTotalRecords,
    getTotalRecords,
    Child,
} from '../../../store/ducks/child';
import './childList.css';
import Select from 'react-select';
import '../../../assets/styles/dropdown.css';

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

/** default options for genders */
export const genderOptions: DropdownOption[] = [
    { value: '', label: 'All' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
];

/** interface for dropdown option */
export interface DropdownOption {
    value: string;
    label: string;
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
        const clientService = new opensrpService(`${OPENSRP_CHILD_ENDPOINT}`);
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
                            <Table striped={true}>
                                <thead>
                                    <tr>
                                        <th>Identifier</th>
                                        <th>First Name</th>
                                        <th>Last Name</th>
                                        <th>Location</th>
                                        <th>Age</th>
                                        <th>Gender</th>
                                        <th>Last contact date</th>
                                        <th>Risk</th>
                                        <th>Immunization status</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {childArray.map((child: Child) => {
                                        return (
                                            <tr key={child.baseEntityId}>
                                                <td>{child.identifiers.opensrp_id}</td>
                                                <td>{child.firstName}</td>
                                                <td>{child.lastName}</td>
                                                <td></td>
                                                <td>{child.attributes.dynamicProperties.age_year_part}</td>
                                                <td>{child.gender}</td>
                                                <td>
                                                    {child.attributes.dynamicProperties.last_contact_date.split('T')[0]}
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td>
                                                    <a href={`${'#'}`}> view </a>
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
