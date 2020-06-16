import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '@opensrp/server-service';
import vaccinationConfig from './utils/vaccinationConfig';
import classnames from 'classnames';
import ANCReducer, {
    fetchANC,
    getAllANCArray,
    removeANCAction,
    reducerName as ancReducerName,
    ANCClientType as ANC,
} from '../../../../store/ducks/anc';
import eventReducer, {
    Event,
    fetchEvents,
    removeEvents,
    reducerName as eventReducerName,
    getEventsArray,
} from '../../../../store/ducks/events';
import Loading from '../../../../components/page/Loading';
import { OPENSRP_EVENT_ENDPOINT, OPENSRP_CLIENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import SeamlessImmutable from 'seamless-immutable';
import { countDaysBetweenDate, calculateAge } from '../../../../helpers/utils';
// import InfoCard from '../../../components/page/InfoCardV1';
import { generateOptions } from '../../../../services/opensrp';
import InfoCard from '../../../../components/page/InfoCard';

/** register the anc reducer */
reducerRegistry.register(ancReducerName, ANCReducer);

/** register the event reducer */
reducerRegistry.register(eventReducerName, eventReducer);

export interface ANCProfileParams {
    id: string;
}

export interface ANCProfileProps extends RouteComponentProps<ANCProfileParams> {
    fetchANC: typeof fetchANC;
    removeANC: typeof removeANCAction;
    fetchEvents: typeof fetchEvents;
    removeEvents: typeof removeEvents;
    anc: ANC | undefined;
    events: Event[];
}

export class ANCProfile extends React.Component<ANCProfileProps> {
    public async componentDidMount() {
        const { fetchANC, fetchEvents } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        const opensrpService = new OpenSRPService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const profileResponse = await opensrpService.list(params);
        fetchANC(profileResponse);

        const eventService = new OpenSRPService(OPENSRP_API_BASE_URL, `${OPENSRP_EVENT_ENDPOINT}`, generateOptions);
        const eventResponse = await eventService.list(params);
        fetchEvents(eventResponse);
    }

    getRegister = () => {
        const vaccinationEeventList = this.props.events
            .filter(d => d.eventType === 'Vaccination')
            .map((d: any) => {
                return {
                    ...d.obs[0],
                    providerId: d.providerId,
                };
            });

        const ancHealth = SeamlessImmutable(vaccinationConfig).asMutable();

        ancHealth.forEach((configData: any) => {
            let flag = false,
                provider = '',
                date = '';

            configData.vaccines.forEach((vaccination: any) => {
                vaccinationEeventList.forEach((vaccinationEvent: any) => {
                    if (vaccination.fieldName === vaccinationEvent.formSubmissionField) {
                        date = vaccinationEvent.values[0];
                        provider = vaccinationEvent.providerId;
                    }

                    if (
                        countDaysBetweenDate(this.props.anc!.birthdate, vaccinationEvent.values[0]) <=
                            configData.daysAfterBirthDue &&
                        vaccination.field_name === vaccinationEvent.formSubmissionField
                    ) {
                        flag = true;
                    }
                });
                vaccination = {
                    ...vaccination,
                    given: flag ? 'Yes' : 'No',
                };

                configData = {
                    ...configData,
                    provider,
                    givenDate: date,
                };
            });
        });

        return ancHealth;
    };

    render() {
        const { anc } = this.props;
        if (!anc) return <Loading />;
        return (
            <Container id="householdProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to="#">
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Household </span>
                        </Link>
                    </span>
                    <h3> ANC </h3>
                </div>
                <InfoCard title="Basic information">
                    <Col className="info-body">
                        <Table className="info-table" borderless={true}>
                            <tbody>
                                <tr>
                                    <td className="info-label">HHID Number</td>
                                    <td>{anc.baseEntityId}</td>
                                    <td className="info-label">Phone</td>
                                    <td>{anc.attributes.phoneNumber || ''}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Family Name</td>
                                    <td>{anc.lastName}</td>
                                    <td className="info-label">Provider</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Head of Household</td>
                                    <td>{anc.firstName}</td>
                                    <td className="info-label">Register date</td>
                                    <td>{anc.dateCreated || ''}</td>
                                </tr>
                            </tbody>
                        </Table>
                    </Col>
                </InfoCard>
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
                <div id="members-list-container">
                    <Row>
                        <Col className="members-list-header" style={{ borderBottom: '1px solid #e8e8e9' }}>
                            <h5> Weight for age growth chart: </h5>
                        </Col>
                    </Row>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: Partial<Store>) => {
    return {
        client: getAllANCArray(state)[0],
        events: getEventsArray(state),
    };
};

/** map props to actions */
const mapDispatchToProps = {
    fetchANC: fetchANC,
    removeANC: removeANCAction,
    fetchEvents,
    removeEvents,
};

const ConnectedClientProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(ANCProfile));

export default ConnectedClientProfile;
