import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table, FormGroup, Input, Nav, NavItem, NavLink } from 'reactstrap';
import { Store } from 'redux';
import Loading from '../../../components/page/Loading';
import { OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import { OpenSRPService } from '../../../services/opensrp';
import './childProfile.css';

class ChildProfile extends React.Component<any, any> {
    render() {
        return (
            <Container id="householdProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to="#">
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Household </span>
                        </Link>
                    </span>
                    <h3> Child </h3>
                </div>
                <div id="basic-info-container">
                    <Row className="basic-info-header-bg">
                        <Col className="basic-info-header">
                            <span className="basic-info-title"> Basic Information</span>
                            <div className="float-right basic-info-edit">
                                <a href={`${'#'}`}>Edit Profile</a>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="basic-info-body">
                            <Table className="basic-info-table" borderless={true}>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">HHID Number</td>
                                        <td>11223344</td>
                                        <td className="basic-info-label">Phone</td>
                                        <td>01521493386</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Family Name</td>
                                        <td>df</td>
                                        <td className="basic-info-label">Provider</td>
                                        <td>nafiz</td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Head of Household</td>
                                        <td>okaku</td>
                                        <td className="basic-info-label">Register date</td>
                                        <td>02-02-2020</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: '30px' }}>
                    <Row>
                        <Col md={2}>showing reports for: </Col>
                        <Col md={2}>
                            <FormGroup>
                                <Input
                                    type="select"
                                    name="select"
                                    className="shadow-sm"
                                    onChange={() => {}}
                                    style={{ fontSize: '12px', borderRadius: '1px' }}
                                >
                                    <option value="">Current Registers</option>
                                    <option value="Male">Male</option>
                                </Input>
                            </FormGroup>
                        </Col>
                    </Row>
                </div>
                <div id="members-list-container">
                    <Row>
                        <Col className="members-list-header" style={{ borderBottom: '1px solid #e8e8e9' }}>
                            <h5> Current Registers: </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Nav style={{ marginLeft: '2.5%' }}>
                            <NavItem style={{ borderBottom: '2px solid blue' }}>
                                <NavLink>Child health</NavLink>
                            </NavItem>
                        </Nav>
                    </Row>
                    <Row>
                        <Col className="basic-info-body">
                            <Table className="basic-info-table" borderless={true}>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">HHID Number</td>
                                        <td></td>
                                        <td className="basic-info-label">Phone</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Family Name</td>
                                        <td></td>
                                        <td className="basic-info-label">Provider</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Head of Household</td>
                                        <td></td>
                                        <td className="basic-info-label">Register date</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="members-list-body" style={{ padding: '30px' }}>
                            <Table style={{ border: '2px solid #e8e8e9' }}>
                                <thead style={{ backgroundColor: '#f5f5f5' }}>
                                    <tr>
                                        <td>Report</td>
                                        <td>Date</td>
                                        <td>Reporter</td>
                                        <td style={{ width: '50%' }}>Message</td>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Birth</td>
                                        <td>02-02-</td>
                                        <td>24</td>
                                        <td>goo akdjshf kajsdfhak sdjfh akjsd hfjaksd d</td>
                                    </tr>
                                    <tr>
                                        <td>Birth</td>
                                        <td>02-02-</td>
                                        <td>24</td>
                                        <td>goo akdjshf kajsdfhak sdjfh akjsd hfjaksd d</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

export default ChildProfile;
