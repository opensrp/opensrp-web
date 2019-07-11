import reducerRegistry from '@onaio/redux-reducer-registry';
import { map, some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { extractClient } from '../../../helpers/utils';
import ClientService from '../../../services/clients';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';
import './clientList.css';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the clientList component */
export interface ClientListProps {
  clientService: typeof ClientService;
  clientsArray: Client[];
  fetchClientsActionCreator: typeof fetchClients;
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
  clientService: ClientService,
  clientsArray: [],
  fetchClientsActionCreator: fetchClients,
};

/** Display the client list  */
class ClientList extends React.Component<ClientListProps, {}> {
  public static defaultProps: ClientListProps = defaultClientListProps;
  constructor(props: ClientListProps) {
    super(props);
  }

  public async componentDidMount() {
    const { fetchClientsActionCreator, clientService } = this.props;

    const response = await clientService.getClientsList();
    const { data } = response!;
    const clientsData = map(data, (client: { [key: string]: any }) => extractClient(client));
    fetchClientsActionCreator(clientsData);
  }

  public render() {
    /** render loader if there are no clients in state */
    const { clientsArray } = this.props;
    if (!some(clientsArray)) {
      return <Loading />;
    }
    return (
      <div>
        <table className="table table-shadow">
          <tbody>
            <tr>
              <th>Identifier</th>
              <th>First Name</th>
              <th>Middle Name</th>
              <th>Last Name</th>
              <th>Gender</th>
              <th>Location</th>
              <th>
                <form>
                  <select className="form-control col-auto custom-select">
                    <option>Last contact</option>
                    <option>other Date</option>
                  </select>
                </form>
              </th>
              <th>actions</th>
            </tr>

            {clientsArray.map((client: Client) => {
              return (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.firstName}</td>
                  <td>{client.middleName}</td>
                  <td>{client.lastName}</td>
                  <td>{client.gender}</td>
                  <td>{client.location}</td>
                  <td>{client.lastContactDate}</td>
                  <td>
                    <a href={`${'#'}`}> view </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
const ConnectedClientList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientList);

export default ConnectedClientList;
