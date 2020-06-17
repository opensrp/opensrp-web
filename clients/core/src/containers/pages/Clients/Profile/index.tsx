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
import clientsReducer, {
    Client,
    fetchClients,
    getClientsArray,
    reducerName as clientsReducerName,
    removeClients,
} from '../../../../store/ducks/clients';
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
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import InfoCard from '../../../components/page/InfoCardV1';
import { generateOptions } from '../../../../services/opensrp';
import InfoCard from '../../../../components/page/InfoCard';

const options: Highcharts.Options = {
    title: {
        text: 'Weight for age growth chart',
    },

    tooltip: {
        formatter(tooltip: Highcharts.TooltipOptions) {
            return `
            <div style='background-color: white;'>
                <div> 12 vs 14 </div>
                <hr>
                <table>
                    <tbody>
                        <tr>
                            <td style='padding-right: 20px;font-size: 20px;'> weight </td>
                            <td> <b>68.6kg</b> </td>
                            <td style='color: lawngreen'> <b> &uarr; </b> </td>
                            <td style='color: lawngreen'> +23 </td>
                        </tr>
                        
                    </tbody>
                </table>
            </div>
            `;
        },
        shared: true,
        useHTML: true,
        backgroundColor: 'white',
        borderColor: 'white',
        borderRadius: 5,
        style: {
            fontSize: '15px',
        },
    },
    series: [
        {
            type: 'line',
            data: [1, 2, 3],
        },
    ],
};

/** register the client reducer */
reducerRegistry.register(clientsReducerName, clientsReducer);

/** register the event reducer */
reducerRegistry.register(eventReducerName, eventReducer);

export interface ClientProfileParams {
    id: string;
}

export interface ClientProfileProps extends RouteComponentProps<ClientProfileParams> {
    fetchClient: typeof fetchClients;
    removeClient: typeof removeClients;
    fetchEvents: typeof fetchEvents;
    removeEvents: typeof removeEvents;
    client: Client | undefined;
    events: Event[];
}

export class ClientProfile extends React.Component<ClientProfileProps> {
    public async componentDidMount() {
        const { fetchClient, fetchEvents, removeClient } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        const opensrpService = new OpenSRPService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const profileResponse = await opensrpService.list(params);
        removeClient();
        fetchClient(profileResponse);

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

        const clientHealth = SeamlessImmutable(vaccinationConfig).asMutable();

        clientHealth.forEach((configData: any) => {
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
                        countDaysBetweenDate(this.props.client!.birthdate, vaccinationEvent.values[0]) <=
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

        return clientHealth;
    };

    render() {
        const { client } = this.props;
        if (!client) return <Loading />;
        return (
            <Container id="householdProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to="#">
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Household </span>
                        </Link>
                    </span>
                    <h3> Client </h3>
                </div>
                <InfoCard title="Basic information">
                    <Col className="info-body">
                        <Table className="info-table" borderless={true}>
                            <tbody>
                                <tr>
                                    <td className="info-label">HHID Number</td>
                                    <td>{client.baseEntityId}</td>
                                    <td className="info-label">Phone</td>
                                    <td>{client.attributes.phoneNumber || ''}</td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Family Name</td>
                                    <td>{client.lastName}</td>
                                    <td className="info-label">Provider</td>
                                    <td></td>
                                </tr>
                            </tbody>
                            <tbody>
                                <tr>
                                    <td className="info-label">Head of Household</td>
                                    <td>{client.firstName}</td>
                                    <td className="info-label">Register date</td>
                                    <td>{client.dateCreated || ''}</td>
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
                    <Row>
                        <div className="chart-div">
                            <HighchartsReact highcharts={Highcharts} options={options} />
                        </div>
                    </Row>
                </div>
            </Container>
        );
    }
}

const mapStateToProps = (state: Partial<Store>) => {
    return {
        client: getClientsArray(state)[0],
        events: getEventsArray(state),
    };
};

/** map props to actions */
const mapDispatchToProps = {
    fetchClient: fetchClients,
    removeClient: removeClients,
    fetchEvents,
    removeEvents,
};

const ConnectedClientProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(ClientProfile));

export default ConnectedClientProfile;
