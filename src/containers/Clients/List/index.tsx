import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';
import './clientList.css';
import SearchBox from '../../../components/page/SearchBox/SearchBox';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the clientList component */
export interface ClientListProps {
  opensrpService: typeof OpenSRPService;
  clientsArray: Client[];
  fetchClientsActionCreator: typeof fetchClients;
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
  clientsArray: [],
  fetchClientsActionCreator: fetchClients,
  opensrpService: OpenSRPService,
};

/** Display the client list  */
class ClientList extends React.Component<ClientListProps, any> {
  public static defaultProps: ClientListProps = defaultClientListProps;

  constructor(props: ClientListProps) {
    super(props);
    this.state = {
      totalRecords: 0,
    }
  }

  public async componentDidMount() {
    const params = {
      clientType: 'clients',
      pageNumber: '1',
      pageSize: PAGINATION_SIZE,
    };
    const { fetchClientsActionCreator, opensrpService } = this.props;
    const clientService = new opensrpService('client/searchByCriteria');
    const response = await clientService.list(params);
    console.log('clients total --> ', response.total);
    fetchClientsActionCreator(response.clients);
    this.setState({ totalRecords: response.total });
  }

  public render() {
    /** render loader if there are no clients in state */
    const { clientsArray } = this.props;
    if (!some(clientsArray)) {
      return <Loading />;
    }
    return (
      <div>
        <h3 className="household-title"> Clients ({this.state.totalRecords})</h3>
        {/* <Row>
          <Col md={5}>
            <div className="household-search-bar">
              <SearchBox searchCallBack={() => {}} placeholder={`Search Client`} />
            </div>
          </Col>
        </Row> */}

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
                <tr key={client.id}>
                  <td>{client.id}</td>
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
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients };

/** connect clientsList to the redux store */
const ConnectedClientList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedClientList;
