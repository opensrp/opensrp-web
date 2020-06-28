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
import RegisterPanel, { RegisterPanelData, RegisterPanelProps } from '../../../../components/page/RegisterPanel';
import { ANC_URL } from '../../../../constants';
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

export interface ANCBasicInfo {
    anc: ANC;
}

export function ANCBasicInfo(props: any): React.ReactElement {
    return (
        <Col className="info-body">
            <Table className="info-table" borderless={true}>
                <tbody>
                    <tr>
                        <td className="info-label">HHID Number</td>
                        <td>{props.anc.baseEntityId}</td>
                        <td className="info-label">Phone</td>
                        <td>{props.anc.attributes.phoneNumber || ''}</td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Family Name</td>
                        <td>{props.anc.lastName}</td>
                        <td className="info-label">Provider</td>
                        <td></td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Age</td>
                        <td>{props.anc.attributes['attributes.dynamicProperties.age_year_part'] || ''}</td>
                        <td className="info-label">Gestational Age</td>
                        <td>
                            {props.anc.attributes['attributes.dynamicProperties.gestational_age'] || ''} {'weeks'}
                        </td>
                    </tr>
                </tbody>
                <tbody>
                    <tr>
                        <td className="info-label">Last Contact Date </td>
                        <td>{props.anc.attributes['attributes.dynamicProperties.last_contact_date']}</td>
                        <td className="info-label">Expected delivery date</td>
                        <td>
                            {props.anc.attributes['attributes.dynamicProperties.edd'] || ''}
                            {console.log('setting edd', props)}
                        </td>
                    </tr>
                </tbody>
            </Table>
        </Col>
    );
}

export class ANCProfile extends React.Component<ANCProfileProps> {
    public async componentDidMount() {
        const { fetchANC, fetchEvents, removeANC } = this.props;
        const { match } = this.props;
        const params = {
            identifier: match.params.id,
        };
        console.log('anc values ======> ', localStorage.getItem(`anc_values_${match.params.id}`));
        const opensrpService = new OpenSRPService(OPENSRP_API_BASE_URL, `client/search`, generateOptions);
        const profileResponse = await opensrpService.list(params);
        const storageValue = localStorage.getItem(`anc_values_${match.params.id}`) || '';
        profileResponse[0]['attributes'] = JSON.parse(storageValue);

        removeANC();
        fetchANC(profileResponse);
        const eventService = new OpenSRPService(OPENSRP_API_BASE_URL, `${OPENSRP_EVENT_ENDPOINT}`, generateOptions);
        const eventResponse = await eventService.list(params);
        fetchEvents(eventResponse);
    }

    getRegisterData = (): RegisterPanelData[] => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        let registerData: any = {};

        const getProperty = (vaccineTakenDate: any): string => {
            // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
            const days = countDaysBetweenDate(this.props.anc!.birthdate, vaccineTakenDate);
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
            client: this.props.anc,
            tabs: ['ANC health'],
            registerNode: <ANCBasicInfo anc={this.props.anc} />,
        };
    };

    render() {
        const { anc } = this.props;
        if (!anc) return <Loading />;
        return (
            <Container id="householdProfile">
                <div className="page-title">
                    <span className="back-btn-bg">
                        <Link to={ANC_URL}>
                            <FontAwesomeIcon icon="arrow-left" />
                            <span className="back-btn"> Back to ANC List </span>
                        </Link>
                    </span>
                    <h3> ANC </h3>
                </div>
                <InfoCard title="Basic information">
                    <ANCBasicInfo anc={anc} />
                </InfoCard>
                <div style={{ marginTop: '30px' }}></div>
                <InfoCard title="Current Registers">
                    <RegisterPanel {...this.getRegisterConfig()} />
                </InfoCard>
            </Container>
        );
    }
}

const mapStateToProps = (state: Partial<Store>) => {
    return {
        anc: getAllANCArray(state)[0],
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

const ConnectedANCProfile = withRouter(connect(mapStateToProps, mapDispatchToProps)(ANCProfile));

export default ConnectedANCProfile;
