import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Store } from 'redux';
import { Link } from 'react-router-dom';
import { Col, Row, Table } from 'reactstrap';
import SearchBox from '../../../components/page/SearchBox';

/** Display the client list  */
class ClientList extends React.Component<{}, {}> {
    public render() {
        return (
            <div>
                <h3 className="household-title"> Child (408) </h3>
                <Row>
                    <Col md={5}>
                        <div className="household-search-bar">
                            <SearchBox searchCallBack={() => {}} placeholder={'Search Child'} />
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
                                <tr>
                                    <td>1</td>
                                    <td>Proshanto </td>
                                    <td>head</td>
                                    <td>0171211111</td>
                                    <td>22-01-2020</td>
                                    <td className="members-table-field">10</td>
                                    <td>
                                        <Link to={`/child/profile/`}>View</Link>
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }
}

export { ClientList };

/** Map props to state  */
const mapStateToProps = (state: Partial<Store>) => {
    return {};
};

/** map props to actions */
const mapDispatchToProps = {};

/** connect clientsList to the redux store */
const ConnectedChildList = connect(mapStateToProps, mapDispatchToProps)(ClientList);

export default ConnectedChildList;
