import * as React from 'react';
import { Col, Row } from 'reactstrap';
import '../../../../assets/styles/dropdown.css';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption } from '../../../../helpers/Dropdown';
import Select from 'react-select';
import './teamForm.css';
import { OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT } from '../../../../configs/env';
import { Formik } from 'formik';
import { OpenSRPService } from '@opensrp/server-service';
import { useState } from 'react';

export interface TeamFormProps {
    id: number;
    identifier: string;
    description: string;
    active: boolean;
    name: string;
    partOf: DropdownOption;
    opensrpService: typeof OpenSRPService;
}

export const defaultTeamProps: TeamFormProps = {
    id: 0,
    identifier: '',
    description: '',
    active: true,
    name: '',
    partOf: { label: '', value: '' },
    opensrpService: OpenSRPService,
};

/** Display the team form  */
const TeamForm: React.FC<TeamFormProps> = (props: TeamFormProps) => {
    const [teamOption, setTeamOption] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (values: any) => {
        const payload = {
            name: values.name,
            description: values.description,
            partOf: values.partOf.value,
            active: values.active,
            identifier: values.identifier,
        };
        const { opensrpService } = props;
        const clientService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT, generateOptions);
        await clientService.create(payload);
    };

    const getTeamList = async () => {
        const { opensrpService } = props;
        const teamService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_TEAM_ENDPOINT, generateOptions);
        const teamList = await teamService.list();
        const teamDropdownOptions = teamList.map((t: TeamFormProps) => {
            return {
                value: t.id,
                label: t.name,
            };
        });
        setTeamOption(teamDropdownOptions);
    };

    React.useEffect(() => {
        getTeamList();
    }, []);

    return (
        <Formik initialValues={props} onSubmit={onSubmit}>
            {// eslint-disable-next-line @typescript-eslint/no-explicit-any
            (formik: any): React.ReactNode => {
                return (
                    <div>
                        <Row>
                            <Col>
                                <h3>Add New Location</h3>
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
                                    className="basic-single"
                                    onChange={e => formik.setFieldValue('partOf', e)}
                                    options={teamOption}
                                    name="partOf"
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

TeamForm.defaultProps = defaultTeamProps;
export { TeamForm };
