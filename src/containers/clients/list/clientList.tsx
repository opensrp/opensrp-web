import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** define props for the clentList component */

/** default props for the clientList component */

/** Display the client list  */
class ClientList extends React.Component<{}, {}> {
  constructor(props: {}) {
    super(props);
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
