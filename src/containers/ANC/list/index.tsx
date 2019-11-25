/** Presentational component and container for the ANC listing page */
import React from 'react';
import { useFilters } from './hooks';

const ANCListView: React.FC<{}> = () => {
  const [filterState, addFilter, setFilterState] = useFilters();

  return <div />;
};
