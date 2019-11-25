/** Presentational component and container for the ANC listing page */
import React from 'react';
import { useFilters } from './hooks';

/** dumb component responsible for showing ANC listings */
const ANCListView: React.FC<{}> = () => {
  const [filterState, addFilter, setFilterState] = useFilters();

  return <div />;
};

// create container

const ConnectedANCListView = ANCListView;

export default ConnectedANCListView;
