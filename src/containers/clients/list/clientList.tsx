import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { ClientService } from '../../../services/clients';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the clentList component */
export interface ClientListProps {
  clientsArray: Client[];
  fetchClientsActionCreator: typeof fetchClients;
  // service used to retrieve data from opensrp
}

/** default props for the clientList component */
export const defaultClientListProps: ClientListProps = {
  clientsArray: [],
  fetchClientsActionCreator: fetchClients,
  // service used to retrieve data from opensrp
};

/** Display the client list  */
class ClientList extends React.Component<ClientListProps, {}> {
  public static defaultProps: ClientListProps = defaultClientListProps;
  constructor(props: ClientListProps) {
    super(props);
  }

  public async componentDidMount() {
    // place functionality for the api calls here
  }

  public render() {
    return <div>some JSX here</div>;
  }
}

export { ClientList };
/** Maybe define default props */
/** connect the compoenent to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateprops {
  clientsArray: Client[];
}

/** Map props to state  */
const mapstateToProps = (state: Partial<Store>): DispatchedStateprops => {
  const result = {
    clientsArray: getClientsArray(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = { fetchClientsactionCreator: fetchClients };

/** connect clientsList to the redux store */
const ConnectedClientList = connect(
  mapstateToProps,
  mapDispatchToProps
)(ClientList);

export default ConnectedClientList;
