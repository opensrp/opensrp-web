import * as React from 'react';
import { Col, Row } from 'reactstrap';
import '../../../../assets/styles/dropdown.css';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption } from '../../../../helpers/Dropdown';
import Select from 'react-select';
import './locationForm.css';
import { OPENSRP_API_BASE_URL, OPENSRP_LOCATION_CREATE_ENDPOINT } from '../../../../configs/env';
import { Formik } from 'formik';
import { OpenSRPService } from '@opensrp/server-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const locationOption: DropdownOption[] = [{ value: '', label: 'All' }];

export interface LocationFormProps {
    parentLocation: DropdownOption;
    locationTag: DropdownOption;
    name: string;
    description: string;
}

export const defaultLocationProps: LocationFormProps = {
    parentLocation: { value: '', label: 'All' },
    locationTag: { value: '', label: 'All' },
    name: '',
    description: '',
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
                    <h3>Add New Location</h3>
                </Col>
            </Row>
            <form className="form-background">
                <Row>Location Name</Row>
                <Row className="field-row">
                    <input
                        type="text"
                        className="input-field"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </Row>
                <Row>Location Description</Row>
                <Row className="field-row">
                    <input
                        type="text"
                        className="input-field"
                        onChange={formik.handleChange}
                        value={formik.values.name}
                    />
                </Row>
                <Row>Tag</Row>
                <Row className="field-row">
                    <Select
                        value={formik.values.locationTag}
                        classNamePrefix="select"
                        className="basic-single"
                        onChange={formik.handleChange}
                        options={locationOption}
                    />
                </Row>
                <Row>Parent Location</Row>
                <Row className="field-row">
                    <Select
                        value={formik.values.parentLocation}
                        classNamePrefix="select"
                        className="basic-single"
                        onChange={formik.handleChange}
                        options={locationOption}
                    />
                </Row>
            </form>
        </div>
    );
};

/** Display the location form  */
const LocationForm: React.FC<LocationFormProps> = (props: LocationFormProps) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (values: any, { resetForm }: any) => {
        const payload = {
            name: values.name,
            description: values.description,
        };
        const clientService = new OpenSRPService(
            OPENSRP_API_BASE_URL,
            OPENSRP_LOCATION_CREATE_ENDPOINT,
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

LocationForm.defaultProps = defaultLocationProps;
export { LocationForm };
