import React, { useState } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Button, Form, FormGroup, Input, Label, Row, Col, Container } from 'reactstrap';
/** Yup client upload validation schema */
/* eslint-disable @typescript-eslint/camelcase */
const uploadValidationSchema = Yup.object().shape({
    form: Yup.mixed().required(),
    form_identifier: Yup.string().required(),
    form_name: Yup.string().required(),
    form_version: Yup.string().required(),
    module: Yup.string(),
});

const defaultInitialValues = {
    form: null,
    form_identifier: '',
    form_name: '',
    form_version: '',
    module: '',
};

const UploadFile = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedFile, setSelectedFile] = useState<any>(null);

    return (
        <Container>
            <Formik
                initialValues={defaultInitialValues}
                validationSchema={uploadValidationSchema}
                // tslint:disable-next-line: jsx-no-lambda
                onSubmit={(values, { setSubmitting }) => {
                    setSubmitting(false);
                    const data = new FormData();
                    data.append('form', selectedFile);
                }}
            >
                {({ setFieldValue, handleChange, handleSubmit, isSubmitting }) => (
                    <Form onSubmit={handleSubmit} data-enctype="multipart/form-data">
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="form_name">Form Name *</Label>
                                    </div>
                                    {/* <div style={{ display: 'inline-block', width: '90%' }}> */}
                                    <Input type="text" name="form_name" id="form-name-id" onChange={handleChange} />
                                    {/* </div> */}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="form_version">Form version*</Label>
                                    </div>
                                    {/* <div style={{ display: 'inline-block', width: '90%' }}> */}
                                    <Input
                                        type="text"
                                        name="form_version"
                                        id="form-version-id"
                                        onChange={handleChange}
                                    />
                                    {/* </div> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="form_identifier">Form Identifier *</Label>
                                    </div>
                                    {/* <div style={{ display: 'inline-block', width: '90%' }}> */}
                                    <Input
                                        type="text"
                                        name="form_identifier"
                                        id="form-identifier-id"
                                        onChange={handleChange}
                                    />
                                    {/* </div> */}
                                </FormGroup>
                            </Col>
                            <Col md={6}>
                                <FormGroup>
                                    <div>
                                        <Label for="module">Module</Label>
                                    </div>
                                    {/* <div style={{ display: 'inline-block', width: '90%' }}> */}
                                    <Input type="text" name="module" id="module-id" onChange={handleChange} />
                                    {/* </div> */}
                                </FormGroup>
                            </Col>
                        </Row>
                        <FormGroup>
                            <Label for="upload-file">Upload file *</Label>
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

export default UploadFile;
