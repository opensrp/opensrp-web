import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
    Client,
    fetchClients,
    getClientsArray,
    reducerName as clientsReducerName,
    setTotalRecords,
} from '../../../store/ducks/clients';
import './clientList.css';
import SearchBox from '../../../components/page/SearchBox';
import Select from 'react-select';
import '../../../assets/styles/dropdown.css';
import { PAGINATION_SIZE } from '../../../constants';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the clientList component */
export interface ClientListProps {
    opensrpService: typeof OpenSRPService;
    clientsArray: Client[];
    fetchClientsActionCreator: typeof fetchClients;
    totalRecords: number;
}

export const genderOptions: DropdownOption[] = [
    { value: 'All', label: 'All' },
    { value: 'Male', label: 'Male' },
    { value: 'Female', label: 'Female' },
    { value: 'Others', label: 'Others' },
];

export interface DropdownOption {
    value: string;
    label: string;
}

export interface ClientListState {
    selectedGender: string;
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
    clientsArray: [],
    fetchClientsActionCreator: fetchClients,
    opensrpService: OpenSRPService,
    totalRecords: 0,
};

export const defaultClientListState: ClientListState = {
    selectedGender: 'All',
};

/** Display the client list  */
class ClientList extends React.Component<ClientListProps, ClientListState> {
    public static defaultProps: ClientListProps = defaultClientListProps;
    constructor(props: ClientListProps) {
        super(props);
        this.state = defaultClientListState;
    }

    public async componentDidMount() {
        const params = {
            clientType: 'clients',
            pageNumber: '1',
            pageSize: PAGINATION_SIZE,
        };
        const { fetchClientsActionCreator, opensrpService } = this.props;
        const clientService = new opensrpService(`${OPENSRP_CLIENT_ENDPOINT}`);
        const response = await clientService.list(params);
        // console.log('clients total --> ', response.total);
        fetchClientsActionCreator(response.clients);
    }

    searchFilter = (searchText: string) => {
        console.log(searchText);
    };

    genderFilter = (gender: string) => {
        console.log(gender);
    };
    public render() {
        /** render loader if there are no clients in state */
        const { clientsArray } = this.props;
        if (!some(clientsArray)) {
            return <Loading />;
        }
        return (
            <div>
                <h3 className="household-title"> All Clients ({this.props.totalRecords})</h3>
                <Row>
                    <Col md={{ size: 3, offset: 9 }}> Gender </Col>
                </Row>
                <Row>
                    <Col md={9} className="filter-row">
                        <div className="household-search-bar">
                            <SearchBox searchCallBack={this.searchFilter} placeholder={`Search Client`} />
                        </div>
                    </Col>
                    <Col md={3}>
                        <Select
                            classNamePrefix="select"
                            className="basic-single"
                            onChange={(e: any) => this.genderFilter(e.value)}
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
                                <tr key={client._id}>
                                    <td>{client._id}</td>
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
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients, setTotalRecords };

/** connect clientsList to the redux store */
const ConnectedClientList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedClientList;
