import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import reducerRegistry from '@onaio/redux-reducer-registry';
import * as React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps, withRouter } from 'react-router-dom';
import { Col, Container, Row, Table, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { Store } from 'redux';
import { OpenSRPService } from '@opensrp/server-service';
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
import { OPENSRP_EVENT_ENDPOINT, OPENSRP_CLIENT_ENDPOINT, OPENSRP_API_BASE_URL } from '../../../configs/env';
import SeamlessImmutable from 'seamless-immutable';
import { countDaysBetweenDate, calculateAge } from '../../../helpers/utils';
import * as Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import InfoCard from '../../../components/page/InfoCardV1';
import { generateOptions } from '../../../services/opensrp';

const options: Highcharts.Options = {
    title: {
        text: 'My chart',
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
                            <td style='padding-right: 20px;font-size: 25px;'> weight </td>
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
        const opensrpService = new OpenSRPService(OPENSRP_API_BASE_URL, `/client/search`, generateOptions);
        const profileResponse = await opensrpService.list(params);
        fetchChild(profileResponse);

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

        const childHealth = SeamlessImmutable(vaccinationConfig).asMutable();

        childHealth.forEach((configData: any) => {
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
                        countDaysBetweenDate(this.props.child!.birthdate, vaccinationEvent.values[0]) <=
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

        return childHealth;
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
                <InfoCard rowData={[]} title={'Basic Information'} link={'/child'} linkLable={'edit profile'} />
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
                    <Row>
                        <HighchartsReact highcharts={Highcharts} options={options} />
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
