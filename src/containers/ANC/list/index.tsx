/** Presentational component and container for the ANC listing page */
import React from 'react';
import { connect } from 'react-redux';
import Loading from '../../../components/page/Loading';
import { OpenSRPService } from '../../../services/opensrp';
import { Client, fetchClients } from '../../../store/ducks/clients';
import { loadANCList } from './dataLoading';
import { useFilters } from './hooks';
import { ANCTable, useColumns } from './tableDefinition';
import * as fixtures from './tests/fixtures';

interface ANCListProps {
  ANCList: Client[];
  fetchClientsCreator: any;
  service: typeof OpenSRPService;
}

const defaultANCListProps: ANCListProps = {
  ANCList: fixtures.allANC,
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

  const ANCTableProps = {
    data: ANCList,
    tableColumns: useColumns(),
  };

  if (ANCList.length < 1) {
    return <Loading />;
  }

  // create table instance
  return (
    <div>
      <ANCTable {...ANCTableProps} />
    </div>
  );
};

ANCListView.defaultProps = defaultANCListProps;

// create container
interface DispatchedStateToProps {
  ANCList: Client[];
}
const mapStateToProps = (): DispatchedStateToProps => {
  return {
    ANCList: fixtures.allANC, // getANCArray;
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
