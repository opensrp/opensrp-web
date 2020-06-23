import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, Form, FormGroup, Input, Label, Row, Col } from 'reactstrap';
import { uploadValidationSchema, defaultInitialValues, InitialValuesTypes } from './helpers';
import { Redirect } from 'react-router';
import { FormConfigProps } from '../../helpers/types';
import { Store } from 'redux';
import { connect } from 'react-redux';
import { ManifestFilesTypes, getManifestFilesById } from '../../ducks/manifestFiles';

/** default props interface */
export interface DefaultProps {
    formData: ManifestFilesTypes | null;
    formInitialValues: InitialValuesTypes;
}

/** UploadConfigFile interface */
export interface UploadConfigFileProps extends FormConfigProps {
    draftFilesUrl: string;
    formId: string | null;
    isJsonValidator: boolean;
    validatorsUrl: string;
}

const UploadConfigFile = (props: UploadConfigFileProps & DefaultProps) => {
    const {
        isJsonValidator,
        formId,
        draftFilesUrl,
        formInitialValues,
        endpoint,
        getPayload,
        baseURL,
        growl,
        validatorsUrl,
    } = props;

    const [ifDoneHere, setIfDoneHere] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    const redirectUrl = isJsonValidator ? validatorsUrl : draftFilesUrl;

    useEffect(() => {
        if (formId) {
            setIsEditMode(true);
        }
    }, [formId]);

    /**
     * upload form
     * @param {InitialValuesTypes} data
     */
    const uploadData = async (data: InitialValuesTypes) => {
        const { headers } = getPayload(new AbortController().signal, 'POST');
        const postData = new FormData();
        Object.keys(data).forEach(dt => {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            postData.append(dt, (data as any)[dt]);
        });
        if (isJsonValidator) {
            postData.append('is_json_validator', 'true');
        }
        const response = await fetch(`${baseURL}${endpoint}`, {
            body: postData,
            headers: {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                Authorization: (headers as any).authorization || (headers as any).Authorization,
            },
            method: 'POST',
        });
        if (response) {
            if (response.status == 201 || response.ok) {
                return setIfDoneHere(true);
            } else if (response.status === 400) {
                response.text().then(text => {
                    text.length ? growl && growl(text, { type: 'error' }) : setIfDoneHere(true);
                    return true;
                });
            } else {
                const defaultMessage = `OpenSRPService create on ${endpoint} failed, HTTP status ${response?.status}`;
                growl && growl(defaultMessage, { type: 'error' });
            }
        }
    };

    if (ifDoneHere) {
        return <Redirect to={redirectUrl} />;
    }

    return (
        <Formik
            initialValues={formInitialValues}
            validationSchema={uploadValidationSchema}
            // tslint:disable-next-line: jsx-no-lambda
            onSubmit={values => {
                uploadData(values);
            }}
        >
            {({ values, setFieldValue, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                <Form onSubmit={handleSubmit} data-enctype="multipart/form-data">
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <div>
                                    <Label for="form_name">File Name *</Label>
                                </div>
                                <Input
                                    type="text"
                                    name="form_name"
                                    disabled={isEditMode}
                                    value={values.form_name}
                                    onChange={handleChange}
                                />
                                {errors.form_name && touched.form_name && (
                                    <small className="form-text text-danger jurisdictions-error">
                                        {errors.form_name}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                        <Col md={6}>
                            <FormGroup>
                                <div>
                                    <Label for="module">Module</Label>
                                </div>
                                <Input
                                    type="text"
                                    name="module"
                                    disabled={isEditMode}
                                    value={values.module}
                                    onChange={handleChange}
                                />
                                {errors.module && touched.module && (
                                    <small className="form-text text-danger jurisdictions-error">{errors.module}</small>
                                )}
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <FormGroup>
                                <div>
                                    <Label for="form_relation">Related to</Label>
                                </div>
                                <Input
                                    type="text"
                                    name="form_relation"
                                    disabled={isEditMode}
                                    value={values.form_relation}
                                    onChange={handleChange}
                                />
                                {errors.form_relation && touched.form_relation && (
                                    <small className="form-text text-danger jurisdictions-error">
                                        {errors.form_relation}
                                    </small>
                                )}
                            </FormGroup>
                        </Col>
                        <Col md={6}></Col>
                    </Row>
                    <FormGroup>
                        <Label for="upload-file">Upload file *</Label>
                        <Input
                            type="file"
                            name="form"
                            // tslint:disable-next-line: jsx-no-lambda
                            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                setFieldValue(
                                    'form',
                                    event && event.target && event.target.files && event.target.files[0],
                                );
                            }}
                        />
                        {errors.form && touched.form && (
                            <small className="form-text text-danger jurisdictions-error">{errors.form}</small>
                        )}
                    </FormGroup>
                    <div>
                        <Button
                            type="submit"
                            id="exportform-submit-button"
                            className="btn btn-md btn btn-primary float-right"
                            color="primary"
                            disabled={isSubmitting}
                        >
                            Upload file
                        </Button>
                    </div>
                </Form>
            )}
        </Formik>
    );
};

/**default props */
const defaultProp: DefaultProps = {
    formData: null,
    formInitialValues: defaultInitialValues,
};

UploadConfigFile.defaultProp = defaultProp;
export { UploadConfigFile };

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const mapStateToProps = (state: Partial<Store>, ownProps: UploadConfigFileProps): DefaultProps => {
    const formId = ownProps.formId;
    let formInitialValues: InitialValuesTypes = defaultInitialValues;
    let formData: ManifestFilesTypes | null = null;
    if (formId) {
        formData = getManifestFilesById(state, formId);
    }
    if (formId && formData) {
        /* eslint-disable @typescript-eslint/camelcase */
        formInitialValues = {
            form: null,
            form_name: formData.label,
            form_relation: formData.form_relation || '',
            module: formData.module,
        };
    }
    return {
        formData,
        formInitialValues,
    };
};

/** Connected UploadConfigFile component */
const ConnectedUploadConfigFile = connect(mapStateToProps)(UploadConfigFile);

export default ConnectedUploadConfigFile;