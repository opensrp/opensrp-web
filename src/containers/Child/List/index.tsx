import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Col, Row, Table, FormGroup, Label, Input } from 'reactstrap';
import { Store } from 'redux';
import LocationBreadcrumb from '../../../components/page/Breadcrumb';
import Loading from '../../../components/page/Loading';
import SearchBox from '../../../components/page/SearchBox/SearchBox';
import { OPENSRP_CLIENT_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';
import './childStyle.css';

/** props Interface for the clientList component */
export interface ChildListProps {
  opensrpService: typeof OpenSRPService;
}

/** default props for the clientList component */
export const defaultChildListProps: ChildListProps = {
  opensrpService: OpenSRPService,
};

/** Display the client list  */
class ChildList extends React.Component<ChildListProps, any> {
  public static defaultProps: ChildListProps = defaultChildListProps;

  constructor(props: ChildListProps) {
    super(props);
    this.state = {
      totalRecords: 0,
      childArray: [],
    };
  }

  public async componentDidMount() {
    const params = {
      clientType: 'child',
      pageNumber: '1',
      pageSize: PAGINATION_SIZE,
    };
    const { opensrpService } = this.props;
    const childService = new opensrpService('client/searchByCriteria');
    const response = await childService.list(params);
    console.log('child total --> ', response.total);
    this.setState({
      totalRecords: response.total,
      childArray: response.clients,
    });
  }

  public render() {
    /** render loader if there are no clients in state */

    if (!some(this.state.childArray)) {
      return <Loading />;
    }
    return (
      <div>
        <h3 className="household-title"> Child ({this.state.totalRecords})</h3>
        <Row>
          <Col md={5}>
            <div className="household-search-bar">
              <SearchBox searchCallBack={() => {}} placeholder={`Search Client`} />
            </div>
          </Col>
          <Col md={3} style={{ marginTop: '23px' }}>
            <FormGroup>
              <Input
                type="select"
                name="select"
                className="shadow-sm"
                style={{ fontSize: '12px', borderRadius: '1px' }}
              >
                <option value="">Select gender</option>
                <option value="Male">Male</option>
                <option value="Female"> Female</option>
              </Input>
            </FormGroup>
          </Col>
        </Row>
        <Row>
          <Col>
            <LocationBreadcrumb />
            <Table striped={true}>
              <thead>
                <tr>
                  <th>Identifier</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Location</th>
                  <th>Age</th>
                  <th>Gender</th>
                  <th>Last contact date</th>
                  <th>Risk</th>
                  <th>Immunization status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {this.state.childArray.map((client: Client) => {
                  return (
                    <tr key={client.id}>
                      <td>{client.id}</td>
                      <td>{client.firstName}</td>
                      <td>{client.lastName}</td>
                      <td></td>
                      <td>{client.attributes.dynamicProperties.age_year_part}</td>
                      <td>{client.gender}</td>
                      <td>{client.attributes.dynamicProperties.last_contact_date.split('T')[0]}</td>
                      <td></td>
                      <td></td>
                      <td>
                        <a href={`${'#'}`}> view </a>
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
}

export { ChildList };
/** Maybe define default props */
/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  childArray: Client[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    childArray: [],
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients };

/** connect clientsList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(ChildList);

export default ConnectedChildList;
