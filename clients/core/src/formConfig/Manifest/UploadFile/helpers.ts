import * as Yup from 'yup';

/** form fields interface */
export interface InitialValuesTypes {
    form: any; // eslint-disable-line @typescript-eslint/no-explicit-any
    form_identifier: string;
    form_name: string;
    is_json_validator: 'true' | 'false';
    module: string;
}

/** Yup client upload validation schema */
/* eslint-disable @typescript-eslint/camelcase */
export const uploadValidationSchema = Yup.object().shape({
    form: Yup.mixed().required(),
    form_identifier: Yup.string().required('Field Required'),
    form_name: Yup.string().required('Field Required'),
    is_json_validator: Yup.boolean().required('Field Required'),
    module: Yup.string(),
});

/** */
export const defaultInitialValues: InitialValuesTypes = {
    form: null,
    form_identifier: '',
    form_name: '',
    is_json_validator: 'false',
    module: '',
};
