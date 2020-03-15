import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import clientsReducer, {
    Client,
    fetchClients,
    getClientsArray,
    reducerName as clientsReducerName,
    setTotalRecords,
    getTotalRecords,
    removeClients,
} from '../../../store/ducks/clients';
import './clientList.css';
import SearchBox from '../../../components/page/SearchBox';
import Select from 'react-select';
import '../../../assets/styles/dropdown.css';
import { PAGINATION_SIZE } from '../../../constants';
import { generateOptions } from '../../../services/opensrp';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the clientList component */
export interface ClientListProps {
    opensrpService: typeof OpenSRPService;
    clientsArray: Client[];
    fetchClientsActionCreator: typeof fetchClients;
    totalRecords: number;
    removeClients: typeof removeClients;
    setTotalRecords: typeof setTotalRecords;
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

/** interface for client state */
export interface ClientListState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
    clientsArray: [],
    fetchClientsActionCreator: fetchClients,
    removeClients: removeClients,
    opensrpService: OpenSRPService,
    totalRecords: 0,
    setTotalRecords,
};

/** default values for client state */
export const defaultClientListState: ClientListState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
};

/** Display the client list  */
class ClientList extends React.Component<ClientListProps, ClientListState> {
    public static defaultProps: ClientListProps = defaultClientListProps;
    constructor(props: ClientListProps) {
        super(props);
        this.state = defaultClientListState;
    }

    public async componentDidMount() {
        this.getDataFromServer();
    }

    getDataFromServer = async () => {
        const params = {
            clientType: 'clients',
            pageNumber: '1',
            pageSize: PAGINATION_SIZE,
            gender: this.state.selectedGender.value,
            searchText: this.state.searchText,
        };
        const { fetchClientsActionCreator, opensrpService, setTotalRecords, removeClients } = this.props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_CLIENT_ENDPOINT, generateOptions);
        const response = await clientService.list(params);
        removeClients();
        fetchClientsActionCreator(response.clients);
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
        const { clientsArray, totalRecords } = this.props;
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
                    <Table striped={true}>
                        <thead>
                            <tr>
                                <th>Identifier</th>
                                <th>First Name</th>
                                <th>Middle Name</th>
                                <th>Last Name</th>
                                <th>Gender</th>
                                <th>actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {clientsArray.map((client: Client) => {
                                return (
                                    <tr key={client.baseEntityId}>
                                        <td>{client.identifiers.opensrp_id}</td>
                                        <td>{client.firstName}</td>
                                        <td>{client.middleName}</td>
                                        <td>{client.lastName}</td>
                                        <td>{client.gender}</td>
                                        <td>
                                            <a href={`${'#'}`}> view </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </Table>
                </div>
            );
        }
    }
}

export { ClientList };
/** Maybe define default props */
/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
    clientsArray: Client[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        clientsArray: getClientsArray(state),
        totalRecords: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients, removeClients, setTotalRecords, getTotalRecords };

/** connect clientsList to the redux store */
const ConnectedClientList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedClientList;
