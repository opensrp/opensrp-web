/** Presentational component and container for the ANC listing page */
import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/page/Loading';
import { OpenSRPService } from '../../../services/opensrp';
import { Client, fetchClients } from '../../../store/ducks/clients';
import { loadANCList } from './dataLoading';
import { useFilters } from './hooks';

interface ANCListProps {
  ANCList: Client[];
  fetchClientsCreator: any;
  service: typeof OpenSRPService;
}

const defaultANCListProps: ANCListProps = {
  ANCList: [],
  fetchClientsCreator: (f: any) => f,
  service: OpenSRPService,
};

/** dumb component responsible for showing ANC listings */
const ANCListView: React.FC<ANCListProps> = props => {
  const { service, fetchClientsCreator, ANCList } = props;
  const [filterState, addFilter, setFilterState] = useFilters();

  React.useEffect(() => {
    // make api call to get all anc list data on component mount
    loadANCList(service, fetchClientsCreator);
  });

  if (ANCList.length < 1) {
    return <Loading />;
  }

  return <div />;
};

ANCListView.defaultProps = defaultANCListProps;

// create container
interface DispatchedStateToProps {
  ANCList: Client[];
}
const mapStateToProps = (): DispatchedStateToProps => {
  return {
    ANCList: [], // getANCArray;
  };
};

const mapDispatchToProps = {
  fetchClientsCreator: fetchClients,
};

const ConnectedANCListView = connect(
  mapStateToProps,
  mapStateToProps
)(ANCListView);

export default ConnectedANCListView;
