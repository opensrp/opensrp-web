import * as React from 'react';
import { Col, Row } from 'reactstrap';
import '../../../../assets/styles/dropdown.css';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption } from '../../../../helpers/Dropdown';
import Select from 'react-select';
import './teamForm.css';
import {
    OPENSRP_API_BASE_URL,
    OPENSRP_TEAM_ENDPOINT,
    OPENSRP_TEAM_PROFILE_ENDPOINT,
    OPENSRP_LOCATION_ENDPOINT,
} from '../../../../configs/env';
import { Formik } from 'formik';
import { OpenSRPService } from '@opensrp/server-service';
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { createUUID } from '../../../../helpers/utils';
import { Link, withRouter, match, RouteComponentProps } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Location } from '../../../../store/ducks/adminLocation';
import { identifier } from '@babel/types';

export interface TeamFormProps {
    id: number;
    identifier: string;
    description: string;
    active: boolean;
    name: string;
    partOf: DropdownOption;
    opensrpService: typeof OpenSRPService;
    location: DropdownOption;
}

interface TeamFormURLParams {
    id: string;
}

export const defaultTeamProps: TeamFormProps = {
    id: 0,
    identifier: '',
    description: '',
    active: true,
    name: '',
    partOf: { label: '', value: '' },
    opensrpService: OpenSRPService,
    location: { label: '', value: '' },
};

export type ProfileWithRoutesProps = TeamFormProps & RouteComponentProps<TeamFormURLParams>;

/** Display the team form  */
const TeamForm: React.FC<ProfileWithRoutesProps> = (props: ProfileWithRoutesProps) => {
    const [teamOption, setTeamOption] = useState([]);
    const [locationOption, setLocationOption] = useState([]);
    const [teamOb, setTeamOb] = useState(defaultTeamProps);

    const createTeam = async (values: any, resetForm: any) => {
        const payload = {
            name: values.name,
            description: values.description,
            partOf: values.partOf.value,
            active: values.active,
            identifier: values.identifier,
        };
        const clientService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_TEAM_PROFILE_ENDPOINT, generateOptions);
        clientService
            .create(payload)
            .then((r: any) => {
                toast.success('Saved sucessfully');
                resetForm();
            })
            .catch((err: any) => toast.error('Server error'));
    };
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (values: any, { resetForm }: any) => {
        if (props.match.params.id === undefined) createTeam(values, resetForm);
        else {
            const assignLocation = new OpenSRPService(
                OPENSRP_API_BASE_URL,
                'organization/assignLocationsAndPlans',
                generateOptions,
            );

            assignLocation
                .create([
                    {
                        organization: values.identifier,
                        jurisdiction: values.location.value,
                        fromDate: '2020-06-22',
                    },
                ])
                .then((response: any) => toast.success('Saved Location sucessfully'))
                .catch((err: any) => toast.success('Saved Location sucessfully'));

            const payload = {
                name: values.name,
                description: values.description,
                partOf: values.partOf.value,
                active: values.active,
                identifier: values.identifier,
            };
            const clientService = new OpenSRPService(
                OPENSRP_API_BASE_URL,
                `${OPENSRP_TEAM_PROFILE_ENDPOINT}/${values.identifier}`,
                generateOptions,
            );
            clientService
                .update(payload)
                .then((r: any) => {
                    toast.success('Update sucessful');
                    resetForm();
                })
                .catch((err: any) => toast.error('Server error'));
        }
    };

    const getTeamList = async () => {
        const teamService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT, generateOptions);
        const teamList = await teamService.list();
        const teamDropdownOptions = teamList.organizations.map((t: TeamFormProps) => {
            return {
                value: t.id,
                label: t.name,
            };
        });
        setTeamOption(teamDropdownOptions);

        const teamId = props.match.params.id;
        console.log('teamId == ', teamId);
        if (teamId !== null && teamId !== undefined) {
            const teamService = new OpenSRPService(
                OPENSRP_API_BASE_URL,
                `${OPENSRP_TEAM_PROFILE_ENDPOINT}/${teamId}`,
                generateOptions,
            );
            const teamResponse = await teamService.list();
            console.log(' team --> ', teamResponse, teamOption);
            const parentTeam: any = teamDropdownOptions.filter((t: any) => t.value == parseInt(teamResponse.partOf))[0];
            console.log({ parentTeam });
            const team: any = {
                id: teamResponse.id,
                identifier: teamResponse.identifier,
                description: '',
                active: teamResponse.active,
                name: teamResponse.name,
                partOf: parentTeam,
                location: { label: '', value: '' },
            };
            setTeamOb(team);
        } else {
            defaultTeamProps.identifier = createUUID();
            setTeamOb(defaultTeamProps);
        }
    };

    const getLocationList = async () => {
        const locationService = new OpenSRPService(OPENSRP_API_BASE_URL, OPENSRP_LOCATION_ENDPOINT, generateOptions);
        const response = await locationService.list();
        console.log('location list in team-form ', response);
        const locationOption = response.locations.map((t: Location) => {
            return {
                value: t.id,
                label: t.properties.name,
            };
        });
        setLocationOption(locationOption);
    };

    React.useEffect(() => {
        console.log('id to edit: ', props.match.params.id);
        getTeamList();
        getLocationList();
    }, []);

    return (
        <Formik initialValues={teamOb} onSubmit={onSubmit} enableReinitialize>
            {// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (formik: any): React.ReactNode => {
                return (
                    <div>
                        <ToastContainer
                            position="top-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                        />
                        <Row>
                            <Col>
                                <span className="back-btn-bg">
                                    <Link to="/teams">
                                        <FontAwesomeIcon icon="arrow-left" />
                                        <span className="back-btn"> Back to Teams </span>
                                    </Link>
                                </span>

                                <h3>{props.match.params.id === undefined ? 'Add New Team' : 'Edit Team'}</h3>
                            </Col>
                        </Row>
                        <form className="form-background" onSubmit={formik.handleSubmit}>
                            <Row>Identifier</Row>
                            <Row className="field-row">
                                <input
                                    type="text"
                                    className="input-field"
                                    value={formik.values.identifier}
                                    onChange={formik.handleChange}
                                    name="identifier"
                                    disabled
                                />
                            </Row>
                            <Row>Name</Row>
                            <Row className="field-row">
                                <input
                                    type="text"
                                    className="input-field"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    name="name"
                                />
                            </Row>
                            <Row>Description</Row>
                            <Row className="field-row">
                                <input
                                    type="text"
                                    className="input-field"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    name="description"
                                />
                            </Row>
                            <Row>Reports To</Row>
                            <Row className="field-row">
                                <Select
                                    value={formik.values.partOf}
                                    classNamePrefix="select"
                                    className="form-select"
                                    onChange={e => formik.setFieldValue('partOf', e)}
                                    options={teamOption}
                                    name="partOf"
                                />
                            </Row>
                            <Row>Location</Row>
                            <Row className="field-row">
                                <Select
                                    value={formik.values.location}
                                    classNamePrefix="select"
                                    className="form-select"
                                    onChange={e => formik.setFieldValue('location', e)}
                                    options={locationOption}
                                    name="location"
                                />
                            </Row>
                            <Row>
                                <button type="submit" className="submit-btn-bg">
                                    Submit
                                </button>
                            </Row>
                        </form>
                    </div>
                );
            }}
        </Formik>
    );
};

export default withRouter(TeamForm);
