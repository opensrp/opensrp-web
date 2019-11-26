/** Presentational component and container for the ANC listing page */
import React from 'react';
import { useAsync } from 'react-async';
import { OpenSRPService } from '../../../services/opensrp';
import store from '../../../store';
import { loadANCList } from './dataLoading';
import { useFilters } from './hooks';

interface ANCListProps {
  fetchClientsCreator: any;
  service: typeof OpenSRPService;
}

const defaultANCListProps: ANCListProps = {
  fetchClientsCreator: (f: any) => f,
  service: OpenSRPService,
};

/** dumb component responsible for showing ANC listings */
const ANCListView: React.FC<ANCListProps> = props => {
  const { service, fetchClientsCreator } = props;
  const [filterState, addFilter, setFilterState] = useFilters();
  const { data, error, isPending } = useAsync({ promiseFn: loadANCList, service });
  if (isPending) {
    return <h1>Loading</h1>;
  }
  if (error) {
    return <h1>Something went wrong</h1>;
  }
  if (data) {
    store.dispatch(fetchClientsCreator(data));
    return <h1>Start rendering table</h1>;
  }
  return null;
};

ANCListView.defaultProps = defaultANCListProps;

// create container

const ConnectedANCListView = ANCListView;

export default ConnectedANCListView;
