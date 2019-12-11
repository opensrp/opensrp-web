/** Presentational component and container for the ANC listing page */
import reducerRegistry from '@onaio/redux-reducer-registry';
import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { ReactTable } from '../../../components/ReactTable';
import { OpenSRPService } from '../../../services/opensrp';
import clientReducer, {
  Client,
  fetchClients,
  reducerName as clientReducerName,
} from '../../../store/ducks/clients';
// TODO - remove fixtures.
import { allANC } from '../../ANC/list/tests/fixtures';
import { loadANCList } from './helpers/dataLoading';
import { useFilters } from './helpers/hooks';
import { createColumns } from './helpers/tableDefinition';

/**  register clients reducer */
reducerRegistry.register(clientReducerName, clientReducer);

/** types for ANCList page component props */
interface ANCListProps {
  /** creates action that dispatched , adds clients to store */
  fetchClientsCreator: typeof fetchClients;
  /** the opensrpService */
  service: typeof OpenSRPService;
  /** all anc records in store */
  ANCArray: Client[];
}

/** default props */
const defaultANCListProps: ANCListProps = {
  ANCArray: [],
  fetchClientsCreator: fetchClients,
  service: OpenSRPService,
};

interface ANCTableProps {
  data: Client[];
}

/** dumb component responsible for showing ANC listings */
const ANCListView: React.FC<ANCListProps> = props => {
  const { service, fetchClientsCreator, ANCArray } = props;

  /** these filters are applied to the data as its being retrieved from the store */
  const [filterState, addFilter, setFilterState] = useFilters();

  const state = useAsync({ promiseFn: loadANCList, service });
  const columns = createColumns();

  return (
    <div>
      {/* Filter section will go here. */}
      <IfPending state={state}>
        <Loading />
      </IfPending>
      <IfRejected state={state}>{error => alert(error.message)}</IfRejected>
      <IfFulfilled state={state}>
        {data => (
          <Col>
            <ReactTable {...{ data: ANCArray, tableColumns: React.useMemo(() => columns, []) }} />;
          </Col>
        )}
      </IfFulfilled>
    </div>
  );
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
