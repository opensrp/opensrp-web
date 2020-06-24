import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '@opensrp/server-service';
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
import RegisterPanel, { RegisterPanelData, RegisterPanelProps } from '../../../../components/page/RegisterPanel';

const getChartOptions = (growthData: any) => {
    console.log('growth data', growthData);
    const options: Highcharts.Options = {
        title: {
            text: 'Client Weight for age growth chart',
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
                data: growthData,
            },
        ],
    };
    return options;
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

export interface ClientBasicInfo {
    client: Client;
}

export function ClientBasicInfo(props: ClientBasicInfo): React.ReactElement {
    return (
        <Col className="info-body">
            <Table className="info-table" borderless={true}>
                <tbody>
                    <tr>
                        <td className="info-label">HHID Number</td>
                        <td>{props.client.baseEntityId}</td>
                        <td className="info-label">Phone</td>
                        <td>{props.client.attributes.phoneNumber || ''}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Family Name</td>
                        <td>{props.client.lastName}</td>
                        <td className="info-label">Provider</td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Head of Household</td>
                        <td>{props.client.firstName}</td>
                        <td className="info-label">Register date</td>
                        <td>{props.client.dateCreated || ''}</td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    );
}

export class ClientProfile extends React.Component<ClientProfileProps> {
    public async componentDidMount() {
        const { fetchClient, fetchEvents, removeClient, removeEvents } = this.props;
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
        removeEvents();
        fetchEvents(eventResponse);
    }

    getGrowthData = () => {
        const { events } = this.props;

        const data = events
            .filter((e: Event) => e.eventType === 'Growth Monitoring')
            .map((e: Event) => {
                const ob = e.obs[0] || { values: [0] };
                return ob.values !== null ? parseInt(ob.values[0]) : null;
            });

        return data;
    };

    getRegisterData = (): RegisterPanelData[] => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let registerData: any = {};

        const getProperty = (vaccineTakenDate: any): string => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const days = countDaysBetweenDate(this.props.client!.birthdate, vaccineTakenDate);
            if (days % 7 === 0) return (days / 7).toFixed(0) + '_weeks ';
            else {
                return `${(days / 7).toFixed(0)}_weeks_${Math.abs(days - 7)}_days`;
            }
        };

        this.props.events
            .filter((d: Event) => d.eventType === 'Vaccination')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((data: any) => {
                const timeProperty: string = getProperty(data.obs[0].values[0]);
                registerData = {
                    ...registerData,
                    takenDate: data.obs[0].values[0],
                    providerId: data.providerId,
                    [timeProperty]:
                        registerData[timeProperty] === undefined
                            ? data.obs[0].formSubmissionField
                            : `${registerData[timeProperty]}, ${data.obs[0].formSubmissionField}`,
                };
            });
        return Object.keys(registerData)
            .filter((k: string) => k !== 'takenDate' && k !== 'providerId')
            .map((k: string) => {
                return {
                    report: k,
                    message: registerData[k],
                    reporter: registerData.providerId,
                    date: registerData.takenDate,
                };
            });
    };

    getRegisterConfig = (): RegisterPanelProps => {
        return {
            registerData: this.getRegisterData(),
            client: this.props.client,
            tabs: ['client health'],
        };
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
                            <span className="back-btn"> Back to Clients </span>
                        </Link>
                    </span>
                    <h3> Client </h3>
                </div>
                <InfoCard title="Basic information">
                    <ClientBasicInfo client={client} />
                </InfoCard>
                <div style={{ marginTop: '30px' }}></div>
                <InfoCard title="Current Registers">
                    <RegisterPanel {...this.getRegisterConfig()} />
                </InfoCard>
                <div id="members-list-container">
                    <Row>
                        <Col className="members-list-header" style={{ borderBottom: '1px solid #e8e8e9' }}>
                            <h5> Weight for age growth chart: </h5>
                        </Col>
                    </Row>
                    <Row>
                        <div className="chart-div">
                            <HighchartsReact highcharts={Highcharts} options={getChartOptions(this.getGrowthData())} />
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
