import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';
import { Store, ActionCreator } from 'redux';
import Loading from '../../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { OpenSRPService } from '@opensrp/server-service';
import clientsReducer, {
    Client,
    fetchClients,
    getClientsArray,
    reducerName as clientsReducerName,
    setTotalRecords,
    getTotalRecords,
    removeClients,
} from '../../../../store/ducks/clients';
import './clientList.css';
import SearchBox from '../../../../components/page/SearchBox';
import Select from 'react-select';
import '../../../../assets/styles/dropdown.css';
import { PAGINATION_SIZE, PAGINATION_NEIGBOURS } from '../../../../constants';
import { generateOptions } from '../../../../services/opensrp';
import { useClientTableColumns } from './helpers/tableDefinition';
import { OpenSRPTable } from '@opensrp/opensrp-table';
import { Pagination } from '../../../../components/Pagination';
import { DropdownOption, genderOptions } from '../../../../helpers/Dropdown';
import { FetchAction, RemoveAction, SetTotalRecordsAction } from '../../../../store/ducks/baseDux';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** interface for clients table props */
interface ClientTableProps {
    tableData: Client[];
}

/** render the clients table using opensrp-table */
const ClientTable: React.FC<ClientTableProps> = ({ tableData }: ClientTableProps) => (
    <OpenSRPTable {...{ data: tableData, tableColumns: useClientTableColumns() }} />
);

/** props Interface for the clientList component */
export interface ClientListProps {
    service: typeof OpenSRPService;
    clientsArray: Client[];
    fetchClientsCreator: ActionCreator<FetchAction<Client>>;
    totalRecords: number;
    removeClientsCreator: ActionCreator<RemoveAction>;
    setTotalRecordsCreator: ActionCreator<SetTotalRecordsAction>;
}

/** interface for client state */
export interface ClientListState {
    selectedGender: DropdownOption;
    loading: boolean;
    searchText: string;
    currentPage: number;
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
    clientsArray: [],
    fetchClientsCreator: fetchClients,
    removeClientsCreator: removeClients,
    service: OpenSRPService,
    totalRecords: 0,
    setTotalRecordsCreator: setTotalRecords,
};

/** default values for client state */
export const defaultClientListState: ClientListState = {
    selectedGender: { value: '', label: 'All' },
    loading: true,
    searchText: '',
    currentPage: 1,
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

    /** fetch data from server when any filter is applied */
    getDataFromServer = async () => {
        const params = {
            clientType: 'clients',
            pageNumber: this.state.currentPage,
            pageSize: PAGINATION_SIZE,
            gender: this.state.selectedGender.value,
            searchText: this.state.searchText,
        };
        const { fetchClientsCreator, service, removeClientsCreator, setTotalRecordsCreator } = this.props;
        const clientService = new service(OPENSRP_API_BASE_URL, 'client/search', generateOptions);
        const response = await clientService.list();
        removeClientsCreator();
        fetchClientsCreator(response);
        if (response.total > 0) setTotalRecordsCreator(response.total);
        this.setState({
            ...this.state,
            loading: false,
        });
    };

    /** filter data using gender option */
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

    /** filter data using first name or last name */
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
                    <Row>
                        <Col>
                            <ClientTable tableData={clientsArray} />
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

export { ClientList };

/** connect the component to the store */

/** describe props from mapStateToProps */
type DispatchedStateProps = Pick<ClientListProps, 'clientsArray' | 'totalRecords'>;
/** describe mapped action creators */
type MapDispatchToProps = Pick<
    ClientListProps,
    'fetchClientsCreator' | 'removeClientsCreator' | 'setTotalRecordsCreator'
>;

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
    const result = {
        clientsArray: getClientsArray(state),
        totalRecords: getTotalRecords(state),
    };
    return result;
};

/** map props to actions */
const mapDispatchToProps: MapDispatchToProps = {
    fetchClientsCreator: fetchClients,
    removeClientsCreator: removeClients,
    setTotalRecordsCreator: setTotalRecords,
};

/** connect clientsList to the redux store */
const ConnectedClientList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedClientList;
