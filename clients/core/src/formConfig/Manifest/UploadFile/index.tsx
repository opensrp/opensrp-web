import React, { useState, useEffect } from 'react';
import { Formik } from 'formik';
import { Button, Form, FormGroup, Input, Label, Row, Col, Container } from 'reactstrap';
import { uploadValidationSchema, defaultInitialValues, InitialValuesTypes } from './helpers';
import { Redirect } from 'react-router';
import { FormConfigProps } from '../../helpers/types';
import { Store } from 'redux';
import { connect } from 'react-redux';

/** default props interface */
export interface DefaultProps {
    formInitialValues: InitialValuesTypes;
}

/** UploadConfigFile interface */
export interface UploadConfigFileProps extends FormConfigProps {
    draftFilesUrl: string;
    formVersion: string | null;
}

const UploadConfigFile = (props: UploadConfigFileProps & DefaultProps) => {
    const { formVersion, draftFilesUrl, formInitialValues } = props;

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFile, setSelectedFile] = useState<any>(null);
    const [ifDoneHere, setIfDoneHere] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);

    useEffect(() => {
        if (formVersion) {
            setIsEditMode(true);
        }
    }, [formVersion]);

    if (ifDoneHere) {
        return <Redirect to={draftFilesUrl} />;
    }

    const setStateIfDone = () => {
        setIfDoneHere(true);
    };

    return (
        <Container>
            <Formik
                initialValues={formInitialValues}
                validationSchema={uploadValidationSchema}
                // tslint:disable-next-line: jsx-no-lambda
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    const data = new FormData();
                    data.append('form', selectedFile);
                    setStateIfDone();
                }}
            >
                {({ values, setFieldValue, handleChange, handleSubmit, errors, touched, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} data-enctype="multipart/form-data">
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="form_name">Form Name</Label>
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
                                        <Label for="is_json_validator">JSON Validator</Label>
                                    </div>
                                    <Input
                                        type="select"
                                        name="is_json_validator"
                                        disabled={isEditMode}
                                        value={values.is_json_validator}
                                        onChange={handleChange}
                                    >
                                        <option>false</option>
                                        <option>true</option>
                                    </Input>
                                    {errors.is_json_validator && touched.is_json_validator && (
                                        <small className="form-text text-danger jurisdictions-error">
                                            {errors.is_json_validator}
                                        </small>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="form_identifier">Form Identifier</Label>
                                    </div>
                                    <Input
                                        type="text"
                                        name="form_identifier"
                                        disabled={isEditMode}
                                        value={values.form_identifier}
                                        onChange={handleChange}
                                    />
                                    {errors.form_identifier && touched.form_identifier && (
                                        <small className="form-text text-danger jurisdictions-error">
                                            {errors.form_identifier}
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
                                        <small className="form-text text-danger jurisdictions-error">
                                            {errors.module}
                                        </small>
                                    )}
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="upload-file">Upload file</Label>
                            <Input
                                type="file"
                                name="form"
                                // tslint:disable-next-line: jsx-no-lambda
                                onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                    setSelectedFile(event.target && event.target.files && event.target.files[0]);
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
        </Container>
    );
};

/**default props */
const defaultProp: DefaultProps = {
    formInitialValues: defaultInitialValues,
};

UploadConfigFile.defaultProp = defaultProp;
export { UploadConfigFile };

/** Map props to state
 * @param {Partial<Store>} -  the  redux store
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unused-vars
const mapStateToProps = (_: Partial<Store>, ownProps: UploadConfigFileProps) => {
    const formVersion = ownProps.formVersion;
    let formInitialValues: InitialValuesTypes = defaultInitialValues;
    if (formVersion) {
        /* eslint-disable @typescript-eslint/camelcase */
        formInitialValues = {
            form: null,
            form_identifier: 'identifier',
            form_name: 'name',
            is_json_validator: 'false',
            module: 'opd',
        };
    }
    return {
        formInitialValues,
    };
};

/** Connected UploadConfigFile component */
const ConnectedUploadConfigFile = connect(mapStateToProps)(UploadConfigFile);

export default ConnectedUploadConfigFile;
