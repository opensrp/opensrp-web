import moment from 'moment';
import React from 'react';
import { Card, CardBody, Col, Row } from 'reactstrap';

// TODO - see if this can be made an enum
/** enumerable values for time unit */
export const periodUnitTuple = [
  'seconds',
  'minutes',
  'hours',
  'days',
  'weeks',
  'months',
  'years',
] as const;
export type PeriodUnitTuple = typeof periodUnitTuple;
export type PeriodUnitType = PeriodUnitTuple[number];

/** Type interface for duration */
interface DurationType {
  /** amount in integers  */
  howLong: number;
  /** time unit e.g. 'hours', 'minutes' you get it. */
  unit: PeriodUnitType;
}

/** props for FilterCards component */
export interface Props<T> {
  /** an array of the records that are getting filtered, the filtration
   * will be based on one of the properties of each object in the data array
   */
  data: T[];

  /** the string value of the property under which the data should be filtered
   * on
   */
  categoryField: string;

  /** An array of duration objects; works as a form of pseudo filter
   * helping zero down further after data has been filtered using above property name
   */
  periods: DurationType[];

  /** Proprty field that data will be filtered against for the given periods */
  etaField: string;

  /** a union type of the categories that you wish to be subject of the filter ;
   * This will usually be enumerable values that the property given above can
   * have.
   */
  categories: Set<string>;
}

export const defaultProps: Props<{}> = {
  categories: new Set(''),
  categoryField: '',
  data: [],
  etaField: '',
  periods: [{ howLong: 1, unit: 'weeks' }, { howLong: 2, unit: 'weeks' }],
};

/**  track category + period  in state so as to know what card to be active */

const FilterCards: React.FC<{}> = props => {
  return (
    <Row>
      <FilterCard />
    </Row>
  );
};

/** Create a dictionary where {category: number of records} */
function groupFilterData<T>(
  periods: DurationType[],
  data: T[],
  categories: Set<string>,
  categoryField: string,
  etaField: string
) {
  const dictionary: { [key: string]: number } = {};
  // TODO - the period is in the form given by the server, need to parse that in an identifible format.
  periods.forEach(period => {
    categories.forEach(category => {
      dictionary[`${period.howLong}-${period.unit}-${category}`] = data.filter(
        entry => (entry as any)[categoryField] === category && isInPeriod<T>(entry, period, etaField)
      );
    });
  });
}

/** returns boolean showing whether the data object etaField's value
 * is in between the Date.now through to Date.now + period
 */
function isInPeriod<T>(dataObj: T, period: DurationType, etaField: string): boolean {
  const now = moment();
  return false
}

/** so if length of data = length of one the groups from groupFilter then
 * we have a match for the active filter.
 */

/**
 * A util function that when given an edd, it returns a boolean that tels
 */
FilterCards.defaultProps = defaultProps;

export { FilterCards };

/** single filter card */
export const FilterCard = (props: any) => {
  return (
    <Col md={1}>
      <Card>
        <CardBody>
          <p>24</p>
          <p>High Risk in 2 weeks</p>
          // tslint:disable-next-line: jsx-no-lambda
          <p onClick={() => alert('clicked')}> applyFilter </p>
        </CardBody>
      </Card>
    </Col>
  );
};
