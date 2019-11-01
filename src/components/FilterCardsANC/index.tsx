/** consumes props from the filterCardsLogic and creates ANC custom
 * filterCards.ANC implementation details of filter Cards layout
 */
import React from 'react';
import { Button, Card, CardBody, CardSubtitle, CardText, CardTitle, Row } from 'reactstrap';

interface FilterCardProps {
  filterClickHandler: () => void;
  numRecords: number;
  filterCategory: string;
  timeLength: number;
  timeUnit: string; // TODO- this should be from the TimeUnit enum
  active: boolean;
}

// TODO - how do we specify different color templates for the cards general styling
const SingleFilterCard: React.FC<FilterCardProps> = props => {
  const { numRecords, filterCategory, timeLength, timeUnit, active } = props;
  return (
    <Card>
      <CardBody>
        <CardTitle>
          <p>{numRecords}</p>
        </CardTitle>
        <CardText>{`${filterCategory} in ${timeLength} ${timeUnit}`}</CardText>
        <a>{active ? 'Filters applied' : 'Apply filters'}</a>
      </CardBody>
    </Card>
  );
};

interface GroupFilter {
  meta: {
    category: string;
    howLong: number;
    unit: string;
    active: boolean;
  };
  filteredData: any[];
}
interface FilterCardsUIProps {
  filterClickHandler: () => void;
  groupedFilters: GroupFilter[];
}

const FilterCardsUI: React.FC<FilterCardsUIProps> = props => {
  const { groupedFilters, filterClickHandler } = props;
  return (
    <Row>
      {groupedFilters.map((group, index) => {
        const singleFilterProps = {
          active: group.meta.active,
          filterCategory: group.meta.category,
          filterClickHandler,
          numRecords: group.filteredData.length,
          timeLength: group.meta.howLong,
          timeUnit: group.meta.unit,
        };
        return <SingleFilterCard {...singleFilterProps} key={index} />;
      })}
    </Row>
  );
};
