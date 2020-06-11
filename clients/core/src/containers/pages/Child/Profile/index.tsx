import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter, match } from 'react-router-dom';
import { Col, Container, Table } from 'reactstrap';
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
import { OPENSRP_EVENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../../configs/env';
import { countDaysBetweenDate } from '../../../../helpers/utils';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { generateOptions } from '../../../../services/opensrp';
import InfoCard from '../../../../components/page/InfoCard';
import RegisterPanel, { RegisterPanelData, RegisterPanelProps } from '../../../../components/page/RegisterPanel';
import { createMemoryHistory, createLocation } from 'history';

const options: Highcharts.Options = {
    title: {
        text: 'Child Weight for age growth chart',
    },

    tooltip: {
        formatter() {
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
    opensrpService: typeof OpenSRPService;
    child: Child | null;
    events: Event[];
}

export interface ChildBasicInfo {
    child: Child;
}

const matchVariable: match<{ id: string }> = {
    isExact: false,
    params: { id: '1' },
    path: '/household-profile/:id',
    url: `/household-profile/${1}`,
};

export const defaultProps: ChildProfileProps = {
    history: createMemoryHistory(),
    location: createLocation(matchVariable.url),
    match: matchVariable,
    opensrpService: OpenSRPService,
    fetchChild: fetchChildList,
    removeChild: removeChildList,
    fetchEvents: fetchEvents,
    removeEvents: removeEvents,
    child: null,
    events: [],
};

export function ChildBasicInfo(props: ChildBasicInfo): React.ReactElement {
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
    public static defaultProps = defaultProps;
    public async componentDidMount() {
        const { fetchChild, fetchEvents, removeEvents, removeChild, opensrpService } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        const profileService = new opensrpService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const profileResponse = await profileService.list(params);
        removeChild();
        fetchChild(profileResponse);

        const eventService = new opensrpService(OPENSRP_API_BASE_URL, `${OPENSRP_EVENT_ENDPOINT}`, generateOptions);
        const eventResponse = await eventService.list(params);
        removeEvents();
        fetchEvents(eventResponse);
    }

    getRegisterData = (): RegisterPanelData[] => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let registerData: any = {};

        const getProperty = (vaccineTakenDate: number): string => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const days = countDaysBetweenDate(this.props.child!.birthdate, vaccineTakenDate);
            if (days % 7 === 0) return days / 7 + '_weeks ';
            else {
                return `${days / 7}_weeks_${Math.abs(days - 7)}_days`;
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
            client: this.props.child,
            tabs: ['child health'],
        };
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
                <InfoCard title="Basic information">
                    <ChildBasicInfo child={child} />
                </InfoCard>

                <div style={{ marginTop: '30px' }}></div>

                <InfoCard title="Current Registers">
                    <RegisterPanel {...this.getRegisterConfig()} />
                </InfoCard>
                <InfoCard title="Weight for age growth chart">
                    <div className="chart-div">
                        <HighchartsReact highcharts={Highcharts} options={options} />
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
