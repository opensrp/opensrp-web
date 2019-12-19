/** Presentational component and container for the ANC listing page */
import reducerRegistry from '@onaio/redux-reducer-registry';
import React from 'react';
import { IfFulfilled, IfPending, IfRejected, useAsync } from 'react-async';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../../components/page/Loading';
import { ReactTable } from '../../../../components/ReactTable';
import { ANC } from '../../../../constants';
import { OpenSRPService } from '../../../../services/opensrp';
import clientReducer, {
  Client,
  fetchClients,
  reducerName as clientReducerName,
} from '../../../../store/ducks/clients';
import { loadANCList } from './helpers/dataLoading';
import { useColumns } from './helpers/tableDefinition';
import './index.css';
// TODO - remove fixtures.
import { allANC } from './tests/fixtures';

/**  register clients reducer */
reducerRegistry.register(clientReducerName, clientReducer);

/** types for ANCList page component props */
export interface ANCListProps {
  /** creates action that dispatched , adds clients to store */
  fetchClientsCreator: typeof fetchClients;
  /** the openSRPService */
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

const ANCTable: React.FC<ANCTableProps> = props => {
  return <ReactTable {...{ data: props.data, tableColumns: useColumns() }} />;
};

/** dumb component responsible for showing ANC listings */
export const ANCListView: React.FC<ANCListProps> = props => {
  const { service, fetchClientsCreator, ANCArray } = props;

  const InitialFetchState = useAsync({ promiseFn: loadANCList, service });

  return (
    <div>
      <Helmet>
        <title>{ANC}</title>
      </Helmet>
      <IfFulfilled state={InitialFetchState}>
        {data => (
          <Col>
            <h1 className="homepage-h-1">{`${ANC} (${ANCArray.length})`}</h1>
          </Col>
        )}
      </IfFulfilled>
      {/* Filter section will go here. */}
      <IfPending state={InitialFetchState}>
        <Loading />
      </IfPending>
      <IfRejected state={InitialFetchState}>{error => <h2>{error.message}</h2>}</IfRejected>
      <IfFulfilled state={InitialFetchState}>
        {data => (
          <Col>
            <ANCTable data={props.ANCArray} />
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
