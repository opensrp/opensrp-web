import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '../../../services/opensrp';
import './childProfile.css';
import vaccinationConfig from './vaccinationConfig';
import classnames from 'classnames';
import childReducer, {
    fetchChildList,
    removeChildList,
    reducerName as childReducerName,
    getChildArray,
    Child,
} from '../../../store/ducks/child';
import eventReducer, {
    Event,
    fetchEvents,
    removeEvents,
    reducerName as eventReducerName,
    getEventsArray,
} from '../../../store/ducks/events';
import Loading from '../../../components/page/Loading';

/** register the child reducer */
reducerRegistry.register(childReducerName, childReducer);

/** register the event reducer */
reducerRegistry.register(eventReducerName, eventReducer);

export interface ChildProfileParams {
    id: string;
}

export interface ChildProfileProps extends RouteComponentProps<ChildProfileParams> {
    fetchChild: typeof fetchChildList;
    removeChild: typeof removeChildList;
    fetchEvents: typeof fetchEvents;
    removeEvents: typeof removeEvents;
    child: Child;
    events: Event[];
}

const calculateAge = (dob: number) => {
    const diff = Date.now() - dob;
    const date = new Date(diff);
    return Math.abs(date.getUTCFullYear() - new Date().getFullYear());
};

/**
 *
 * @param startDate = yyyy-MM-DD
 * @param endDate = yyyy-MM-DD
 */
const countDaysBetweenDate = function(startDate: any, endDate: any) {
    const timeDiff = (new Date(endDate) as any) - (new Date(startDate) as any);
    return timeDiff / (1000 * 60 * 60 * 24);
};

class ChildProfile extends React.Component<ChildProfileProps> {
    public async componentDidMount() {
        const { fetchChild, fetchEvents } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };

        console.log(params);
        const opensrpService = new OpenSRPService(`client/search`);
        const profileResponse = await opensrpService.list(params);
        fetchChild(profileResponse);
        console.log(profileResponse);

        const eventService = new OpenSRPService(`event/search`);
        const eventResponse = await eventService.list(params);
        fetchEvents(eventResponse);
    }
    getRegister = () => {
        console.log('events', this.props.events);
        const vaccinationEeventList = this.props.events
            .filter(d => d.eventType === 'Vaccination')
            .map((d: any) => {
                return {
                    ...d.obs[0],
                    providerId: d.providerId,
                };
            });

        console.log({ vaccinationEeventList });

        const childHealth = JSON.parse(JSON.stringify(vaccinationConfig));

        childHealth.forEach((configData: any) => {
            let flag = false,
                provider = '',
                date = '';

            configData.vaccines.forEach((vaccination: any) => {
                vaccinationEeventList.forEach((vaccinationEvent: any) => {
                    console.log(vaccination.field_name, '  ===  ', vaccinationEvent.formSubmissionField);

                    if (vaccination.fieldName === vaccinationEvent.formSubmissionField) {
                        date = vaccinationEvent.values[0];
                        provider = vaccinationEvent.providerId;
                        console.log({ vaccinationEvent });
                    }

                    if (
                        countDaysBetweenDate(this.props.child.birthdate, vaccinationEvent.values[0]) <=
                            configData.daysAfterBirthDue &&
                        vaccination.field_name === vaccinationEvent.formSubmissionField
                    ) {
                        flag = true;
                    }
                });
                vaccination['given'] = flag ? 'Yes' : 'No';
                configData['provider'] = provider;
                configData['givenDate'] = date;
            });
        });

        return childHealth;
    };
    render() {
        const { child, events } = this.props;
        if (!child) return <Loading />;
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
                            {/* <div className="float-right basic-info-edit">
                                <a href={`${'#'}`}>Edit Profile</a>
                            </div> */}
                        </Col>
                    </Row>
                    <Row>
                        <Col className="basic-info-body">
                            <Table className="basic-info-table" borderless={true}>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label"> Id number </td>
                                        <td> {child.identifiers.opensrp_id} </td>
                                        <td className="basic-info-label">Lowest level</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">First Name</td>
                                        <td>{child.firstName}</td>
                                        <td className="basic-info-label">Phone number</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Last Name</td>
                                        <td>{child.lastName}</td>
                                        <td className="basic-info-label">Last contact date</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Age</td>
                                        <td>{calculateAge(child.birthdate)}</td>
                                        <td className="basic-info-label">Provider</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                                <tbody>
                                    <tr>
                                        <td className="basic-info-label">Gender</td>
                                        <td>{child.gender}</td>
                                        <td className="basic-info-label">Health Facility</td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                </div>
                <div style={{ marginTop: '30px' }}></div>
                <div id="members-list-container">
                    <Row>
                        <Col className="members-list-header" style={{ borderBottom: '1px solid #e8e8e9' }}>
                            <h5> Current Registers: </h5>
                        </Col>
                    </Row>
                    <Row>
                        <Col md="12">
                            <Nav style={{ marginLeft: '2.5%' }} tabs>
                                <NavItem>
                                    <NavLink className={classnames({ active: '1' === '1' })}>Child health</NavLink>
                                </NavItem>
                            </Nav>
                            <TabContent activeTab={'1'}>
                                <TabPane tabId="1">
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
                                                    {this.getRegister().map((vaccination: any, index: number) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{vaccination.name}</td>
                                                                <td> {vaccination.givenDate} </td>
                                                                <td>{vaccination.provider}</td>
                                                                <td>
                                                                    {vaccination.vaccines.map((vaccination: any) => {
                                                                        return (
                                                                            vaccination.name +
                                                                            ' ' +
                                                                            vaccination.given +
                                                                            ', '
                                                                        );
                                                                    })}
                                                                </td>
                                                            </tr>
                                                        );
                                                    })}
                                                </tbody>
                                            </Table>
                                        </Col>
                                    </Row>
                                </TabPane>
                            </TabContent>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: Partial<Store>) => {
    return {
        child: getChildArray(state)[0],
        events: getEventsArray(state),
    };
};

/** map props to actions */
const mapDispatchToProps = {
    fetchChild: fetchChildList,
    removeChild: removeChildList,
    fetchEvents,
    removeEvents,
};

const ConnectedChildProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(ChildProfile));

export default ConnectedChildProfile;
