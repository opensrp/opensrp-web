import * as React from 'react';
import { Col, Row } from 'reactstrap';
import { generateOptions } from '../../../services/opensrp';
import { OpenSRPService } from '@opensrp/server-service';
import '@opensrp/opensrp-table/dist/index.css';
import './locationForm.css';
import { Formik } from 'formik';
import { OPENSRP_API_BASE_URL, OPENSRP_LOCATION_TAG_CREATE_ENDPOINT } from '../../../configs/env';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const FormikForm = (formik: any): React.ReactNode => {
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
                    </Row>
                    <Row>
                        <button type="submit" className="submit-btn-bg">
                            Submit
                        </button>
                    </Row>
                </form>
            </div>
        </div>
    );
};
const LocationTagForm: React.FC<LocationTagForm> = (props: LocationTagForm) => {
    const onSubmit = async (values: LocationTagForm, { resetForm }: any) => {
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
        clientService
            .create(payload)
            .then((r: any) => {
                toast.success('Saved sucessfully');
                resetForm();
            })
            .catch((err: any) => toast.error('Server error'));
    };

    return (
        <Formik initialValues={props} onSubmit={onSubmit}>
            {FormikForm}
        </Formik>
    );
};

LocationTagForm.defaultProps = defaultProps;
export default LocationTagForm;
