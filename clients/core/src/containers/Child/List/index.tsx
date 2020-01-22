import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';

/** Display the client list  */
class ClientList extends React.Component<{}, {}> {
    public render() {
        return <div> child list </div>;
    }
}

export { ClientList };

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>) => {
    return {};
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect clientsList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedChildList;
