import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { generateOptions } from '../../../services/opensrp';
import { OpenSRPService } from '@opensrp/server-service';
import '@opensrp/opensrp-table/dist/index.css';
import './locationForm.css';
import { Formik } from 'formik';
import { OPENSRP_API_BASE_URL, OPENSRP_LOCATION_TAG_CREATE_ENDPOINT } from '../../../configs/env';

interface LocationTagForm {
    name: string;
    description: string;
    active: boolean;
}

const defaultProps: LocationTagForm = {
    name: '',
    description: '',
    active: false,
};

const LocationTagForm: React.FC<LocationTagForm> = (props: LocationTagForm) => {
    const onSubmit = async (values: LocationTagForm) => {
        const payload = {
            name: values.name,
            description: values.description,
            active: values.active,
        };
        const clientService = new OpenSRPService(
            OPENSRP_API_BASE_URL,
            OPENSRP_LOCATION_TAG_CREATE_ENDPOINT,
            generateOptions,
        );

        const response = await clientService.create(payload);

        console.log({ response });
    };

    return (
        <Formik initialValues={props} onSubmit={onSubmit}>
            {formik => {
                return (
                    <div>
                        <Row>
                            <Col>
                                <h3>New Location Tag</h3>
                            </Col>
                        </Row>
                        <div className="form-background">
                            <form onSubmit={formik.handleSubmit}>
                                <Row>
                                    <label>Name</label>
                                </Row>
                                <Row>
                                    <input
                                        type="text"
                                        className="input-field"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.name}
                                        name="name"
                                    />
                                    {formik.errors.name && <div id="feedback">{formik.errors.name}</div>}
                                </Row>
                                <Row className="input-row">
                                    <label>Description</label>
                                </Row>
                                <Row>
                                    <input
                                        type="text"
                                        className="input-field"
                                        onChange={formik.handleChange}
                                        onBlur={formik.handleBlur}
                                        value={formik.values.description}
                                        name="description"
                                    />
                                    {formik.errors.name && <div id="feedback">{formik.errors.name}</div>}
                                </Row>
                                <Row>
                                    <button type="submit" className="btn-bg">
                                        Submit
                                    </button>
                                </Row>
                            </form>
                        </div>
                    </div>
                );
            }}
        </Formik>
    );
};

LocationTagForm.defaultProps = defaultProps;
export default LocationTagForm;
