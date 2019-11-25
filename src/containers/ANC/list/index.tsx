/** Presentational component and container for the ANC listing page */
import React from 'react';
import { FilerCardLogic } from '../../../components/FilterCardLogic';
import { useFilters } from './rename';

const ANCListView: React.FC<{}> = () => {
  const { filterState, addFilter } = useFilters();
  const filerCardLogicProps = {
    ANCState: { ...filterState },
  };

  return (
    <div>
      <FilerCardLogic {...filerCardLogicProps} />
    </div>
  );
};
