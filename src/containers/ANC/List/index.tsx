import reducerRegistry from '@onaio/redux-reducer-registry';
import { some } from 'lodash';
import * as React from 'react';
import { connect } from 'react-redux';
import { Table, Row, Col } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT, PAGINATION_SIZE } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import clientsReducer, {
  Client,
  fetchClients,
  getClientsArray,
  reducerName as clientsReducerName,
} from '../../../store/ducks/clients';
import './ancStyle.css';
import SearchBox from '../../../components/page/SearchBox/SearchBox';
import LocationBreadcrumb from '../../../components/page/Breadcrumb';

/** props Interface for the clientList component */
export interface ANCListProps {
  opensrpService: typeof OpenSRPService;
}

/** default props for the clientList component */
export const defaultANCListProps: ANCListProps = {
  opensrpService: OpenSRPService,
};

/** Display the client list  */
class ANCList extends React.Component<ANCListProps, any> {
  public static defaultProps: ANCListProps = defaultANCListProps;

  constructor(props: ANCListProps) {
    super(props);
    this.state = {
      totalRecords: 0,
      ancArray: [],
    };
  }

  public async componentDidMount() {
    const params = {
      clientType: 'anc',
      pageNumber: '1',
      pageSize: PAGINATION_SIZE,
    };
    const { opensrpService } = this.props;
    const ancService = new opensrpService('client/searchByCriteria');
    const response = await ancService.list(params);
    console.log('child total --> ', response.total);
    this.setState({
      totalRecords: response.total,
      ancArray: response.clients,
    });
  }

  public render() {
    /** render loader if there are no clients in state */

    if (!some(this.state.ancArray)) {
      return <Loading />;
    }
    return (
      <div>
        <h3 className="household-title"> ANC ({this.state.totalRecords})</h3>
        {/* <Row>
          <Col md={5}>  
            <div className="household-search-bar">
              <SearchBox searchCallBack={() => {}} placeholder={`Search Client`} />
            </div>
          </Col>
        </Row> */}
        <LocationBreadcrumb />
        <Table striped={true}>
          <thead>
            <tr>
              <th>Identifier</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Location</th>
              <th>Age</th>
              <th>EDD</th>
              <th>Gestational age</th>
              <th>Last contact</th>
              <th>Risk category</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.ancArray.map((client: Client) => {
              return (
                <tr key={client.id}>
                  <td>{client.id}</td>
                  <td>{client.firstName}</td>
                  <td>{client.lastName}</td>
                  <td></td>
                  <td>{client.attributes.dynamicProperties.age_year_part}</td>
                  <td></td>
                  <td></td>
                  <td>{client.attributes.dynamicProperties.last_contact_date.split('T')[0]}</td>
                  <td></td>
                  <td>
                    <a href={`${'#'}`}> view </a>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    );
  }
}

export { ANCList };
/** Maybe define default props */
/** connect the component to the store */

/** Interface to describe props from mapStateToProps */
interface DispatchedStateProps {
  ancArray: Client[];
}

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>): DispatchedStateProps => {
  const result = {
    ancArray: [],
  };
  return result;
};

/** map props to actions */
const mapDispatchToProps = { fetchClientsActionCreator: fetchClients };

/** connect clientsList to the redux store */
const ConnectedANCList = connect(mapStateToProps, mapDispatchToProps)(ANCList);

export default ConnectedANCList;
