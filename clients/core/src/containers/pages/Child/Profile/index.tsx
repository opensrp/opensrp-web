import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '@opensrp/server-service';
import './childProfile.css';
import childReducer, {
    fetchChildList,
    removeChildList,
    reducerName as childReducerName,
    getChildArray,
    Child,
} from '../../../../store/ducks/child';
import eventReducer, {
    Event,
    fetchEvents,
    removeEvents,
    reducerName as eventReducerName,
    getEventsArray,
} from '../../../../store/ducks/events';
import Loading from '../../../../components/page/Loading';
import { OPENSRP_EVENT_ENDPOINT, OPENSRP_CLIENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { countDaysBetweenDate } from '../../../../helpers/utils';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
// import InfoCard from '../../../components/page/InfoCardV1';
import { generateOptions } from '../../../../services/opensrp';
import InfoCard from '../../../../components/page/InfoCard';
import RegisterPanel, { RegisterPanelProps, RegisterPanelData } from '../../../../components/page/RegisterPanel';

const getChartOptions = (growthData: any) => {
    console.log('growth data', growthData);
    const options: Highcharts.Options = {
        title: {
            text: 'Child Weight for age growth chart',
        },

        tooltip: {
            formatter(tooltip: Highcharts.TooltipOptions) {
                let title, diff;
                if (this.x == 0) {
                    title = this.y;
                    diff = 0;
                } else {
                    const prevData = growthData[growthData.indexOf(this.y) - 1];
                    title = `${prevData} VS ${this.y}`;
                    diff = this.y - prevData;
                }
                return `
                <div style='background-color: white;'>
                    <div> ${title} </div>
                    <hr>
                    <table>
                        <tbody>
                            <tr>
                                <td style='padding-right: 20px;font-size: 20px;'> weight </td>
                                <td> <b>${this.y}kg</b> </td>
                                <td style='color: lawngreen'> <b> &uarr; </b> </td>
                                <td style='color: lawngreen'> ${diff} </td>
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

export interface ChildBasicInfo {
    child: Child;
}

export function ChildBasicInfo(props: any): React.ReactElement {
    return (
        <Col className="info-body">
            <Table className="info-table" borderless={true}>
                <tbody>
                    <tr>
                        <td className="info-label">HHID Number</td>
                        <td>{props.child.baseEntityId}</td>
                        <td className="info-label">Phone</td>
                        <td>{props.child.attributes.phoneNumber || ''}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Family Name</td>
                        <td>{props.child.lastName}</td>
                        <td className="info-label">Provider</td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Head of Household</td>
                        <td>{props.child.firstName}</td>
                        <td className="info-label">Register date</td>
                        <td>{props.child.dateCreated || ''}</td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    );
}

export class ChildProfile extends React.Component<ChildProfileProps> {
    public async componentDidMount() {
        const { fetchChild, fetchEvents, removeChild, removeEvents } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        const opensrpService = new OpenSRPService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const profileResponse = await opensrpService.list(params);
        removeChild();
        fetchChild(profileResponse);

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
            console.log('======= child profile date ', this.props.child!.birthdate, vaccineTakenDate);
            const days = countDaysBetweenDate(this.props.child!.birthdate, vaccineTakenDate);
            if (days % 7 === 0) return (days / 7).toFixed(0) + '_weeks ';
            else {
                return `${(days / 7).toFixed(0)}_weeks_${Math.abs(days - 7)}_days`;
            }
        };

        this.props.events
            .filter((d: Event) => d.eventType === 'Vaccination' || d.eventType === 'Recurring Service')
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            .map((data: any) => {
                const timeProperty: string = getProperty(data.eventDate.split('T')[0]);
                registerData = {
                    ...registerData,
                    takenDate: data.eventDate.split('T')[0],
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
            client: this.props.child,
            tabs: ['child health'],
            registerNode: <ChildBasicInfo child={this.props.child} />,
        };
    };

    render() {
        const { child } = this.props;
        if (!child) return <Loading />;
        return (
            <Container id="householdProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to="/child">
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to Child List </span>
                        </Link>
                    </span>
                    <h3> Child </h3>
                </div>
                <InfoCard title="Basic information">
                    <ChildBasicInfo child={child} />
                </InfoCard>

                <div style={{ marginTop: '30px' }}></div>

                <InfoCard title="Current Registers">
                    <RegisterPanel {...this.getRegisterConfig()} />
                </InfoCard>
                <InfoCard title="Weight for age growth chart">
                    <div className="chart-div">
                        <HighchartsReact highcharts={Highcharts} options={getChartOptions(this.getGrowthData())} />
                    </div>
                </InfoCard>
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
