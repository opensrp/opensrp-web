/** a custom-Bootstrap powered card that used for filtering */

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
