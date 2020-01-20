/** consumes props from the filterCardsLogic and creates ANC custom
 * filterCards. provides ANC specific implementation details for filter Cards layout
 */
import { filter } from 'minimatch';
import React from 'react';
import { Card, CardBody, CardText, CardTitle, Col, Row } from 'reactstrap';
import './index.css';

/** props for a single filter card */
interface SingleFilterCardProps {
  id: string;
  /** handles clicking filter on card */
  filterClickHandler: () => void;
  /** number of records filtered based on category and time */
  filteredRecordsNum: number;
  /** the category value used to filter the data */
  filterCategory: string;
  /** integer part of the duration forming part of the filter e.g 2 in 2 weeks */
  timeLength: number;
  /** unit part of the duration forming part of the filter e.g weeks in 2 weeks */
  timeUnit: string; // TODO - this should be from the TimeUnit enum - use Values from FilterLogic enum
  /** whether the filter described by this card is applied */
  active: boolean;
}

// TODO - how do we specify different color templates for the cards general styling - using emotion?
export const SingleFilterCard: React.FC<SingleFilterCardProps> = props => {
  const { filteredRecordsNum: numRecords, filterCategory, timeLength, timeUnit, active } = props;
  return (
    <Card id="card-parent" className={filterCategory.toLowerCase().replace(' ', '-')}>
      <CardBody>
        <CardTitle>
          <p className="font-weight-bold">{numRecords}</p>
        </CardTitle>
        <CardText>{`${filterCategory} in ${timeLength} ${timeUnit}`}</CardText>
        <a>{active ? 'Filters applied' : 'Apply filters'}</a>
      </CardBody>
    </Card>
  );
};

/** we shall be getting this from the filterCards logic */
interface GroupedFilter {
  meta: {
    category: string;
    howLong: number;
    unit: string;
    active: boolean;
  };
  filteredData: any[];
  parentFilterState: any;
  filterId: string;
  filterFunction: any;
}
/** Props FilterCardsUI component */
interface FilterCardsUIProps {
  /** click handler for on filter : really just a dispatch function that
   * gets called with an action object.
   */
  filterClickHandler: (data: GroupedFilter) => void;
  /** the data chunked by the respective filters */
  groupedFilters: GroupedFilter[];
}

/** takes in the categorized filtered data and provides the ui */
const FilterCardsUI: React.FC<FilterCardsUIProps> = props => {
  const { groupedFilters, filterClickHandler } = props;
  return (
    <Row>
      {groupedFilters.map((group, index) => {
        const id = `${group.filterId}-card-${index}`;

        const isActive =
          group.parentFilterState[group.filterId] &&
          group.parentFilterState[group.filterId].activeCard === id;
        const singleFilterProps = {
          active: isActive,
          id,
          filterCategory: group.meta.category,
          filterClickHandler,
          filteredRecordsNum: group.filteredData.length,
          timeLength: group.meta.howLong,
          timeUnit: group.meta.unit,
        };
        return <SingleFilterCard {...singleFilterProps} key={index} />;
      })}
    </Row>
  );
};

export function customReducer(state: any, action: any) {
  switch (action.type) {
    case 'ADD': {
      return {
        ...state,
        filter: {
          [action.filterId]: {
            activeCard: action.activeCard,
            filterFunction: action.filterFunction,
          },
        },
      };
    }
  }
}
