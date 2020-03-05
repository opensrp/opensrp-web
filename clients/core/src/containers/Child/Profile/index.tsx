import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '../../../services/opensrp';
import './childProfile.css';
import vaccinationConfig from './utils/vaccinationConfig';
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
import { OPENSRP_EVENT_ENDPOINT, OPENSRP_CLIENT_ENDPOINT } from '../../../configs/env';
import SeamlessImmutable from 'seamless-immutable';
import { countDaysBetweenDate, calculateAge } from '../../../helpers/utils';

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
    child: Child | undefined;
    events: Event[];
}

export class ChildProfile extends React.Component<ChildProfileProps> {
    public async componentDidMount() {
        const { fetchChild, fetchEvents } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        const opensrpService = new OpenSRPService(`client/search`);
        const profileResponse = await opensrpService.list(params);
        fetchChild(profileResponse);

        const eventService = new OpenSRPService(`${OPENSRP_EVENT_ENDPOINT}`);
        const eventResponse = await eventService.list(params);
        fetchEvents(eventResponse);
    }

    getRegister = () => {
        const childHealth: any = [];
        let registerData: any = {};

        const getProperty = (vaccineTakenDate: any): string => {
            const days = countDaysBetweenDate(this.props.child!.birthdate, vaccineTakenDate);
            if (days % 7 === 0) return days / 7 + '_weeks ';
            else {
                return `${days / 7}_weeks_${Math.abs(days - 7)}_days`;
            }
        };

        const vaccinationEventList = this.props.events
            .filter(d => d.eventType === 'Vaccination')
            .map((data: any) => {
                const timeProperty: string = getProperty(data.obs[0].values[0]);
                if (registerData[timeProperty] === undefined) {
                    registerData = {
                        ...registerData,
                        takenDate: data.obs[0].values[0],
                        providerId: data.providerId,
                        [timeProperty]: data.obs[0].formSubmissionField,
                    };
                } else {
                    registerData = {
                        ...registerData,
                        takenDate: data.obs[0].values[0],
                        providerId: data.providerId,
                        [timeProperty]: `${registerData[timeProperty]}, ${data.obs[0].formSubmissionField}`,
                    };
                }
            });
        registerData = Object.keys(registerData)
            .filter((k: any) => k !== 'takenDate' && k !== 'providerId')
            .map((k: any) => {
                return {
                    time: k,
                    vaccines: registerData[k],
                    providerId: registerData.providerId,
                    takenDate: registerData.takenDate,
                };
            });

        console.log(registerData, { vaccinationEventList });

        // childHealth.forEach((configData: any) => {
        //     let flag = false,
        //         provider = '',
        //         date = '';

        //     configData.vaccines.forEach((vaccination: any) => {
        //         vaccinationEeventList.forEach((vaccinationEvent: any) => {
        //             if (vaccination.fieldName === vaccinationEvent.formSubmissionField) {
        //                 date = vaccinationEvent.values[0];
        //                 provider = vaccinationEvent.providerId;
        //             }

        //             if (
        //                 countDaysBetweenDate(this.props.child.birthdate, vaccinationEvent.values[0]) <=
        //                     configData.daysAfterBirthDue &&
        //                 vaccination.field_name === vaccinationEvent.formSubmissionField
        //             ) {
        //                 flag = true;
        //             }
        //         });
        //         vaccination = {
        //             ...vaccination,
        //             given: flag ? 'Yes' : 'No',
        //         };

        //         configData = {
        //             ...configData,
        //             provider,
        //             givenDate: date,
        //         };
        //     });
        // });

        return registerData;
    };
    render() {
        const { child } = this.props;
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
                                                                <td>{vaccination.time}</td>
                                                                <td> {vaccination.takenDate} </td>
                                                                <td>{vaccination.providerId}</td>
                                                                <td>{vaccination.vaccines}</td>
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
