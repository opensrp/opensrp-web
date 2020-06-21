import * as React from 'react';
import { Col, Row } from 'reactstrap';
import '../../../../assets/styles/dropdown.css';
import { generateOptions } from '../../../../services/opensrp';
import '@opensrp/opensrp-table/dist/index.css';
import { DropdownOption } from '../../../../helpers/Dropdown';
import Select from 'react-select';
import './locationForm.css';
import {
    OPENSRP_API_BASE_URL,
    OPENSRP_LOCATION_CREATE_ENDPOINT,
    OPENSRP_LOCATION_ENDPOINT,
    OPENSRP_LOCATION_TAG_ENDPOINT,
} from '../../../../configs/env';
import { Formik } from 'formik';
import { OpenSRPService } from '@opensrp/server-service';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from 'react';
import { createUUID } from '../../../../helpers/utils';

export interface LocationFormProps {
    parentLocation: DropdownOption;
    locationTag: DropdownOption;
    name: string;
    description: string;
    opensrpService: typeof OpenSRPService;
    identifier: number;
}

export const defaultLocationProps: LocationFormProps = {
    parentLocation: { value: '', label: '' },
    locationTag: { value: '', label: '' },
    name: '',
    description: '',
    opensrpService: OpenSRPService,
    identifier: 0,
};

/** Display the location form  */
const LocationForm: React.FC<LocationFormProps> = (props: LocationFormProps) => {
    const [locationOption, setLocation] = useState([]);
    const [tagOption, setTag] = useState([]);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async (values: any, { resetForm }: any) => {
        const payload = {
            id: values.identifier,
            properties: {
                name: values.name,
                parentId: parseInt(values.parentLocation.value),
                version: 0,
                type: 'Residential Structure',
                status: 'Pending Review',
                uid: createUUID(),
                parentName: values.parentLocation.label,
                tagName: values.locationTag.label,
            },
            locationTags: [
                {
                    active: true,
                    name: values.locationTag.label,
                    description: values.locationTag.label,
                    id: parseInt(values.locationTag.value),
                },
            ],
            type: 'Feature',
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

    const getLocationlist = async () => {
        const params = {
            pageSize: 100,
            pageNumber: 1,
        };
        const { opensrpService } = props;
        const locationService = new opensrpService(OPENSRP_API_BASE_URL, OPENSRP_LOCATION_ENDPOINT, generateOptions);
        const locationResponse = await locationService.list(params);
        const locationOption = locationResponse.locations.map((r: any) => {
            return {
                label: r.properties.name,
                value: r.id,
            };
        });

        const locationTagService = new opensrpService(
            OPENSRP_API_BASE_URL,
            OPENSRP_LOCATION_TAG_ENDPOINT,
            generateOptions,
        );
        const tagResponse = await locationTagService.list();
        const tagOption = tagResponse.map((r: any) => {
            return {
                label: r.name,
                value: r.id,
            };
        });

        setLocation(locationOption);
        setTag(tagOption);
    };

    React.useEffect(() => {
        getLocationlist();
    }, []);

    return (
        <Formik initialValues={props} onSubmit={onSubmit}>
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
                                <h3>Add New Location</h3>
                            </Col>
                        </Row>
                        <form className="form-background" onSubmit={formik.handleSubmit}>
                            <Row>Identifier</Row>
                            <Row className="field-row">
                                <input
                                    type="number"
                                    className="input-field"
                                    onChange={formik.handleChange}
                                    value={formik.values.identifier}
                                    name="identifier"
                                />
                            </Row>
                            <Row>Location Name</Row>
                            <Row className="field-row">
                                <input
                                    type="text"
                                    className="input-field"
                                    onChange={formik.handleChange}
                                    value={formik.values.name}
                                    name="name"
                                />
                            </Row>
                            <Row>Location Description</Row>
                            <Row className="field-row">
                                <input
                                    type="text"
                                    className="input-field"
                                    onChange={formik.handleChange}
                                    value={formik.values.description}
                                    name="description"
                                />
                            </Row>
                            <Row>Tag</Row>
                            <Row className="field-row">
                                <Select
                                    value={formik.values.locationTag}
                                    classNamePrefix="select"
                                    className="form-select"
                                    onChange={e => formik.setFieldValue('locationTag', e)}
                                    options={tagOption}
                                    name="locationTag"
                                />
                            </Row>
                            <Row>Parent Location</Row>
                            <Row className="field-row">
                                <Select
                                    value={formik.values.parentLocation}
                                    classNamePrefix="select"
                                    className="form-select"
                                    onChange={e => formik.setFieldValue('parentLocation', e)}
                                    options={locationOption}
                                    name="parentLocation"
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

LocationForm.defaultProps = defaultLocationProps;
export { LocationForm };
