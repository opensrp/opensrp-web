import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Col, Input, InputGroup, InputGroupAddon, InputGroupText, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import SearchBox from '../../../components/page/SearchBox/SearchBox';
import { OPENSRP_HOUSEHOLD_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
  fetchHouseholds,
  getHouseholdsArray,
  getTotalRecords,
  Household,
  reducerName as clientsReducerName,
  removeHouseholds,
  setTotalRecords,
  clientType,
  searchPlaceholder,
} from '../../../store/ducks/clients';
import './householdList.css';

/** register the clients reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** props Interface for the householdList component */
export interface HouseholdListProps {
  opensrpService: typeof OpenSRPService;
  householdsArray: Household[];
  totalRecordsCount: number;
  fetchHouseholdsActionCreator: typeof fetchHouseholds;
  setTotalRecordsActionCreator: typeof setTotalRecords;
  removeHouseholdsActionCreator: typeof removeHouseholds;
}

/** default props for the householdList component */
export const defaultHouseholdListProps: HouseholdListProps = {
  fetchHouseholdsActionCreator: fetchHouseholds,
  householdsArray: [],
  opensrpService: OpenSRPService,
  removeHouseholdsActionCreator: removeHouseholds,
  setTotalRecordsActionCreator: setTotalRecords,
  totalRecordsCount: 0,
};

/** Display the Household list  */
class HouseholdList extends React.Component<HouseholdListProps> {
  public static defaultProps: HouseholdListProps = defaultHouseholdListProps;
  constructor(props: HouseholdListProps) {
    super(props);
  }

  public async componentDidMount() {
    const {
      fetchHouseholdsActionCreator,
      setTotalRecordsActionCreator,
      opensrpService,
    } = this.props;
    const params = { clientType, pageNumber: '0', pageSize: PAGINATION_SIZE };
    const clientService = new opensrpService(`${OPENSRP_HOUSEHOLD_ENDPOINT}`);
    const response = await clientService.list(params);
    fetchHouseholdsActionCreator(response.clients);
    setTotalRecordsActionCreator(response.total);
  }

  public render() {
    /** render loader if there are no households in state */
    const { householdsArray, totalRecordsCount } = this.props;
    if (!some(householdsArray)) {
      return <Loading />;
    }
    return (
      <div>
        <h3 className="household-title"> Household ({totalRecordsCount}) </h3>
        <Row>
          <Col md={5}>
            <div className="household-search-bar">
              <SearchBox searchCallBack={this.search} placeholder={searchPlaceholder} />
            </div>
          </Col>
        </Row>
        <Row>
          <Col>
            <Table className="shadow-sm">
              <thead>
                <tr>
                  <th>HH ID Number</th>
                  <th>Family Name</th>
                  <th>Head of Household</th>
                  <th>Phone</th>
                  <th>Registered Date</th>
                  <th>Members</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {householdsArray.map((household: Household) => {
                  return (
                    <tr key={household.baseEntityId}>
                      <td>{household.baseEntityId}</td>
                      <td>{household.lastName}</td>
                      <td>{household.attributes.HouseholdHead}</td>
                      <td>{household.attributes.phoneNumber}</td>
                      <td>{household.dateCreated}</td>
                      <td className="members-table-field">{household.attributes.memberCount}</td>
                      <td>
                        <Link to={`/household/profile/${household.baseEntityId}/`}>View</Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Col>
        </Row>
      </div>
    );
  }

  private search = (searchString: string) => {
    this.getHouseholdList(searchString);
  };

  private async getHouseholdList(searchText: string) {
    const {
      fetchHouseholdsActionCreator,
      setTotalRecordsActionCreator,
      removeHouseholdsActionCreator,
      opensrpService,
    } = this.props;
    const params = {
      clientType: 'ec_household',
      pageNumber: '0',
      pageSize: PAGINATION_SIZE,
      searchText,
    };
    const clientService = new opensrpService(`${OPENSRP_HOUSEHOLD_ENDPOINT}`);
    const response = await clientService.list(params);
    removeHouseholdsActionCreator();
    fetchHouseholdsActionCreator(response.clients);
    setTotalRecordsActionCreator(response.total);
  }
}

export { HouseholdList };
/** Maybe define default props */
/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  householdsArray: Household[];
  totalRecordsCount: number;
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    householdsArray: getHouseholdsArray(state),
    totalRecordsCount: getTotalRecords(state),
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = {
  fetchHouseholdsActionCreator: fetchHouseholds,
  removeHouseholdsActionCreator: removeHouseholds,
  setTotalRecordsActionCreator: setTotalRecords,
};

/** connect householdsList to the redux store */
const ConnectedHouseholdList = connect(
  mapStateToProps,
  mapDispatchToProps
)(HouseholdList);

export default ConnectedHouseholdList;
