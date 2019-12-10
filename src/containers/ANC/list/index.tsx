/** Presentational component and container for the ANC listing page */

import reducerRegistry from '@onaio/redux-reducer-registry';
import React from 'react';
import { useAsync } from 'react-async';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientReducerName,
} from '../../../store/ducks/clients';
import { allANC } from '../../ANC/list/tests/fixtures';
import { loadANCList } from './dataLoading';
import { useFilters } from './hooks';
import { ANCTable, useColumns } from './tableDefinition';
/**  register clients reducer */
reducerRegistry.register(clientReducerName, clientReducer);

interface ANCListProps {
  fetchClientsCreator: any;
  service: typeof OpenSRPService;
  ANCArray: Client[];
}

const defaultANCListProps: ANCListProps = {
  ANCArray: [],
  fetchClientsCreator: (f: any) => f,
  service: OpenSRPService,
};

/** dumb component responsible for showing ANC listings */
const ANCListView: React.FC<ANCListProps> = props => {
  const { service, fetchClientsCreator } = props;
  const [filterState, addFilter, setFilterState] = useFilters();
  const { data, error, isPending } = useAsync({ promiseFn: loadANCList, service });
  const columns = useColumns(); // Pretty sure this is an anti-pattern

  // this will be used when making an api call that requires filtering,
  // this is specific to the anc
  // const deferredFunction = useAsync({deferFn: loadFilteredANCList});

  if (isPending) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>{error.message}</h1>;
  }
  if (data) {
    // will aggregate the search params and make a combined filter api request.
    // deferredFunction.run(filterState);

    return (
      <div>
        <Col>
          <ANCTable {...{ tableColumns: columns, data: props.ANCArray }} />
        </Col>
      </div>
    );
  }
  return null;
};

ANCListView.defaultProps = defaultANCListProps;

// create container
type DispatchedProps = Pick<ANCListProps, 'ANCArray'>;
type DispatchActions = Pick<ANCListProps, 'fetchClientsCreator'>;

const mapStateToProps = (state: Partial<Store>): DispatchedProps => {
  return {
    ANCArray: allANC, // getClientsArray(state),
  };
};

const mapDispatchToProps: DispatchActions = {
  fetchClientsCreator: fetchClients,
};

const ConnectedANCListView = connect(
  mapStateToProps,
  mapDispatchToProps
)(ANCListView);

export default ConnectedANCListView;
